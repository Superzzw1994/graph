import React,{lazy} from 'react'
export default [
	{
		path:'/algorithm',
		exact:false,
		id:'', // 权限id
		check:false, // 是否校验
		children: [
			{
				path:'/algorithm/manage',
				id:'algorithm_manage', // 权限id
				check:true, // 是否校验
				exact:true,
				component: lazy(()=>import("SRC_PAGE/Algorithm/Manage"))
			},
			{
				path:'/algorithm/type',
				id:'algorithm_type', // 权限id
				check:true, // 是否校验
				exact:true,
				component: lazy(()=>import("SRC_PAGE/Algorithm/Type"))
			}
		]
	},
	{
		path:'/model',
		id:'model', // 权限id
		check:false, // 是否校验
		exact:true,
		component: lazy(()=>import("SRC_PAGE/Model"))
	}
]