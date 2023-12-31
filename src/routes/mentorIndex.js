import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Courses = lazy(() => import('../pages/Mentor/MentorCourses'))
const CoursesCreateForm = lazy(() => import('../pages/Mentor/CourseCreateForm'));
const CoursesEditForm = lazy(() => import('../pages/Mentor/CourseEditForm'));
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const EditProject = lazy(()=> import('../pages/EditProject'))
const uploadPage = lazy(()=> import('../pages/uploadPage'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/upload-page',
    component:uploadPage,
  },
  {
    path: '/edit-course/:id',
    component: CoursesEditForm,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/create-course',
    component: CoursesCreateForm,
  },
  {
    path: '/edit-course',
    component: CoursesEditForm,
  },
  {
    path: '/courses',
    component: Courses,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
