const light = require("./light");
const dark = require("./dark");
const common = require("./common")
let theme = {
    light,
    dark,
};
process.env["REACT_APP_theme"] = Object.keys(theme).join(";");

module.exports = theme;
