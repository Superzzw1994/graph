import React,{lazy} from 'react'
import algorithm from './algorithm'
const PATH_PREFIX = window.DATACENTERAPP.PATH_PREFIX;
const defaultRoute = window.DATACENTERAPP.defaultRoute;
export default [
	{
		path:'/login',
		id:'', // 权限id
		check:false, // 是否校验
		exact:true,
		component: lazy(()=>import("SRC_PAGE/Login")),
	},
	{
		path:'/404',
		id:'', // 权限id
		check:false, // 是否校验
		exact:true,
		component: lazy(()=>import("SRC_PAGE/Error")),
	},
	{
		path:'/noauth',
		id:'', // 权限id
		check:false, // 是否校验
		component: lazy(()=>import("SRC_PAGE/NoAuth")),
	},

	{
		path:'/',
		id:'', // 权限id
		check:false, // 是否校验
		// exact:true,
		// redirect:defaultRoute,
		// component: lazy(()=>import("SRC_PAGE/Error")),
		layout:true,
		children:[
			{
				path:'/111',
				id:'', // 权限id
				check:false, // 是否校验
				exact:true,
				component: lazy(()=>import("SRC_PAGE/Error")),
			},
			{
				path:'/222',
				id:'', // 权限id
				check:false, // 是否校验
				exact:true,
				component: lazy(()=>import("SRC_PAGE/Error")),
			},
			...algorithm,
		]
	},

	{
		id:'', // 权限id
		check:false, // 是否校验
		// redirect:'/noauth', // 错误路由拦截去noauth
		exact:true,
		redirect:defaultRoute,
		component: lazy(()=>import("SRC_PAGE/NoAuth")),
	},
	{
		exact:false,
		id:'', // 权限id
		check:false, // 是否校验
		redirect:'/404', // 错误路由拦截去404
		component: lazy(()=>import("SRC_PAGE/Error")),
	},
]
