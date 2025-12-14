import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';
import { PublicationPage } from '../pages/publication-page';
import { CreatePostPage } from '../pages/create-post-pages/create-post-page';
import { AboutPage } from '../pages/about-page';
import { TeamPage } from '../pages/team-page/team-page';

export const routes = [
  {
    path: '*',
    element: <>Not found</>,
    name: 'Not found',
  },
  {
    path: '/about',
    element: <AboutPage />,
    name: 'About',
  },
  {
    path: '/team',
    element: <TeamPage />,
    name: 'Team',
  },
  {
    path: '/publication/:id',
    element: <PublicationPage />,
    protected: true,
    name: 'Publication',
  },
  {
    path: '/profile',
    element: <>Profile</>,
    protected: true,
    name: 'Profile',
  },
  {
    path: '/auth',
    element: <LoginPage />,
    name: 'Login',
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
    name: 'Login',
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
    name: 'Register',
  },
  {
    path: '/create-post',
    element: <CreatePostPage />,
    // protected: true,
    name: 'Create Post',
  },
];
