import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
 

const Layout = lazy(() => import('./containers/Layout'))
const AdminLayout = lazy(() => import('./containers/AdminLayout'))
const MentorLayout = lazy(() => import('./containers/MentorLayout'))
const Login = lazy(() => import('./pages/Login'))
const MentorLogin = lazy(() => import('./pages/Mentor/MentorLogin'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const MentorCreateAccount = lazy(() => import('./pages/Mentor/MentorSignup'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const AdminLogin = lazy(()=> import('./pages/Admin/AdminLogin'))
const MentorSignup = lazy(()=> import('./pages/Mentor/MentorSignup'))
 require('dotenv').config();

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
       
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/admin/create-account" component={CreateAccount} />
          <Route path="/mentor/create-account" component={MentorCreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <Route path="/app/mentor/signup" component={MentorSignup} />
          {/* Place new routes over this */}
          {/* <Route path="/app" component={Layout} /> */}
          <Route path="/app/admin" component={AdminLayout} />
          <Route path="/app/mentor" component={MentorLayout} />
          {/* User Dashboard Route */}
          {/* <Route path="/user/dashboard/login" component={Login} /> */}

          <Route path="/mentor/dashboard/login" component={MentorLogin} />

          {/* Admin Dashboard Route */}
          <Route path="/admin/dashboard/login" component={AdminLogin} />

          {/* If you have an index page, you can remove this Redirect */}
          <Redirect exact from="/" to="/admin/dashboard/login" />
        
        </Switch>
      </Router>
    </>
  )
}

export default App
