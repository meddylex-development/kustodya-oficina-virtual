import { NbMenuItem } from '@nebular/theme';

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
    icon: 'home-outline',
    link: '/pages/home',
  },
  {
    title: 'Estados',
    icon: 'home-outline',
    link: '/pages/state',
  },
  {
    title: 'Perfiles',
    icon: 'home-outline',
    link: '/pages/profile',
  },
  {
    title: 'Tipos de documento',
    icon: 'home-outline',
    link: '/pages/document-type',
  },
  {
    title: 'Paises',
    icon: 'home-outline',
    link: '/pages/country',
  },
  {
    title: 'Ciudades',
    icon: 'home-outline',
    link: '/pages/city',
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
