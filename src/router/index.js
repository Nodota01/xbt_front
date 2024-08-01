import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import Home from '@/components/HomePage';
import UserList from '@/components/UserList';
import RoleList from '@/components/RoleList';
import PermissionList from '@/components/PermissionList';
import MenuList from '@/components/MenuList';


const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'users',
        name: 'UserList',
        component: UserList
      },
      {
        path: 'roles',
        name: 'RoleList',
        component: RoleList
      },
      {
        path: 'permissions',
        name: 'PermissionList',
        component: PermissionList
      },
      {
        path: 'menus',
        name: 'MenuList',
        component: MenuList
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/run-one/'),  // 注意基路径
  routes,
});

export default router;