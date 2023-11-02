import { lazy } from 'react'
import EditCourse from '../pages/Mentor/CourseEditForm'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const CreateCourse = lazy(() => import('../pages/Admin/CourseCreateForm'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Courses = lazy(() => import('../pages/Admin/AdminCourses'))
const Mentors = lazy(()  => import('../pages/Admin/MentorsList'))
const MentorsCreateForm = lazy(()  => import('../pages/Admin/MentorCreateForm'))
const MentorsEditForm = lazy(() => import('../pages/Admin/MentorEditForm'))
const AdminCourseEdit = lazy(() => import('../pages/Admin/CourseEditForm'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
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
    path: '/create-course',
    component: CreateCourse,
  },
  {
    path: '/upload-page',
    component:uploadPage,
  },
  {
    path: '/edit-course/:id',
    component: AdminCourseEdit,
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
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/courses-create-form',
    component: Courses,
  },
  {
    path: '/courses',
    component: Courses,
  },
  {
    path: '/mentors',
    component: Mentors,
  },
  {
    path: '/mentors-create-form',
    component: MentorsCreateForm,
  },
  {
    path: '/mentors-edit-form/:id',
    component: MentorsEditForm,
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
