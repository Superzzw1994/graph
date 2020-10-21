import React from 'react';
import iconOverview from '../components/iconOverview';
import iconWorkspace from '../components/iconWorkspace';

const PATH_PREFIX = window.DATACENTERAPP.PATH_PREFIX;
export const menuConfig = [
  {
    title: '数据计算',
    iconActive: iconOverview('domm', true),
    icon: iconOverview('domm'),
    key: `${PATH_PREFIX}/data`,
    id: 'data', // 权限id
    check: true, // 是否校验
    children: [
      {
        title: '计算任务',
        key: `${PATH_PREFIX}/data/task`,
        id: 'task', // 权限id
        check: true, // 是否校验
      },
      {
        title: '计算作业',
        key: `${PATH_PREFIX}/data/operation`,
        id: 'operation', // 权限id
        check: true, // 是否校验
      },
      {
        title: '自定义算子',
        key: `${PATH_PREFIX}/data/customOperator`,
        id: 'customOperator', // 权限id
        check: true, // 是否校验
      },
    ],
  },
  {
    title: '系统管理',
    iconActive: iconOverview('domm', true),
    icon: iconOverview('domm'),
    key: `${PATH_PREFIX}/settings`,
    id: 'settings', // 权限id
    check: true, // 是否校验
    children: [
      {
        title: '告警源',
        key: `${PATH_PREFIX}/settings/alertSource`,
        id: 'alertSource', // 权限id
        check: true, // 是否校验
      }
    ],
  },
];
