function replace(source) {
  const theme = this.query.theme;
  let isBody = false;
  let content = source;
  let loader = this.query.loader;
  // 判断less里有没有引用主题的变量
  // Object.keys(theme).forEach(item => {
  //   Object.keys(theme[item]).forEach(item => {
  //     if (~source.indexOf(item)) {
  //       isBody = true;
  //     }
  //   });
  // });

  // less里有引用主题的变量进行主题配置
  // if (isBody) {
    if (~loader.indexOf("less")) {
      content = createThemeLessVar(theme, source, loader);
    } else if (~loader.indexOf("sass")) {
      content = createThemeSassVar(theme, source, loader);
    }
  // }

  return content;
}

function createThemeSassVar(theme, source, loader) {
  let prefix = "$";
  let reg = /(@import[^\n]*)/g;
  let importCss = source.match(reg) || "";
  if (importCss) {
    importCss = importCss.join("\n");
  }
  let newSource = source.replace(reg, "");
  let content = `${importCss}`;
  Object.keys(theme).forEach(item => {
    let allVar =
      Object.entries(theme[item])
        .map(item => {
          return prefix + item[0] + ":" + item[1];
        })
        .join(";") + ";";

    content += `
      body[data-theme="${item}"]{
        ${allVar}
        ${newSource}
      }
    `;
  });
  return content;
}

function createThemeLessVar(theme, source, loader) {
  let prefix = "@";
  let reg = /(@import[^\n]*)/g;
  let importCss = source.match(reg) || "";
  if (importCss) {
    importCss = importCss.join("\n");
  }
  let newSource = source.replace(reg, "");
  let content = `${importCss}`;

  Object.keys(theme).forEach(item => {
    let allVar =
      Object.entries(theme[item])
        .map(item => {
          return prefix + item[0] + ":" + item[1];
        })
        .join(";") + ";";
    let cssFn = `
      .${item}(){
        ${allVar}
        ${newSource}
      }
    `;

    content += `
      ${cssFn}
      body[data-theme="${item}"]{
        .${item}();
      }
    `;
  });
  return content;
}

module.exports = function(content) {
  // if (this.query.isAdd) {
  //   return replace.call(this, content);
  // } else {
  //   return content;
  // }
  const exclude = this.query.exclude;
  if (this.query.isAdd) {
    if (exclude && exclude.test(this.resourcePath)) {
      return content;
    }
    return replace.call(this, content);
  } else {
    return content;
  }
};
