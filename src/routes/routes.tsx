export const routes = [
  {
    path: '*',
    element: <>Not found</>,
    name: 'Not found',
  },
  {
    path: '/profile',
    element: <>Profile</>,
    protected: true,
    name: 'Profile',
  },
  {
    path: '/auth',
    element: <></>,
    children: [
      {
        path: 'login',
        element: <>Login</>,
        name: 'Login',
      },
      {
        path: 'register',
        element: <>Register</>,
        name: 'Register',
      },
    ],
    name: 'Auth',
  },
];
