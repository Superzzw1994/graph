import {action, observable} from "mobx";

class RootStore {
	@observable language = 'zh';
	@observable theme = 'light';
	@observable rbac = [];//["report_manage","report_dashboard","algorithm_manage","algorithm_type",];

	@action.bound changeLanguage(language) {
		this.language = language
	}

	@action.bound changeTheme(theme) {
		this.theme = theme
	}

	@action
	changeRbac(data=[]){
		this.rbac = data
		console.log(this.rbac,data,"changeRbac");
	}

	//权限校验
	checkAuth(auth){
		let flag = this.rbac.toJS().indexOf(auth)!=-1
		console.log(auth,flag,"checkAuth-auth-flag")
		return flag;
	}
	//权限校验
	checkMenuAuth(auth){
		let flag = this.rbac.toJS().find(item=>item.startsWith(auth))
		console.log(auth,flag,"checkMenuAuth-auth-flag")
		return flag;
	}
}
export default new RootStore();