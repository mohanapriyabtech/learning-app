import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const AdminLayout = lazy(() => import('./containers/adminLayout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const AdminLogin = lazy(()=> import('./pages/Admin/AdminLogin'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          <Route path="/app/admin" component={AdminLayout} />
          

          User Dashboard Route
          <Route path="/user/dashboard/login" component={Login} />

          {/* Admin Dashboard Route */}
          <Route path="/admin/dashboard" component={AdminLogin} />

          {/* If you have an index page, you can remove this Redirect */}
          {/* <Redirect exact from="/" to="/login" /> */}
        </Switch>
      </Router>
    </>
  )
}

export default App
