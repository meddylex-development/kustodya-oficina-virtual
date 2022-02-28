import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_1: NbMenuItem[] = [];
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Home',
    icon: { icon: 'user', pack: 'fas' },
    link: '/pages/home',
  },
  {
    title: 'Estados',
    icon: { icon: 'user', pack: 'fas' },
    link: '/pages/state',
  },
  {
    title: 'Perfiles',
    icon: { icon: 'user', pack: 'fas' },
    link: '/pages/profile',
  },
  {
    title: 'Tipos de documento',
    icon: { icon: 'user', pack: 'fas' },
    link: '/pages/document-type',
  },
  {
    title: 'Paises',
    icon: { icon: 'user', pack: 'fas' },
    link: '/pages/country',
  },
  {
    title: 'Ciudades',
    icon: { icon: 'user', pack: 'fas' },
    link: '/pages/city',
  },
  {
    title: 'Menús',
    icon: { icon: 'user', pack: 'fas' },
    link: '/pages/menu',
  },

  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
