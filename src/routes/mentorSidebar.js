/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
    {
      path: '/app/mentor/dashboard', // the url
      icon: 'HomeIcon', // the component being exported from icons/index.js
      name: 'Dashboard', // name that appear in Sidebar
    },
    // {
    //   path: '/app/forms',
    //   icon: 'FormsIcon',
    //   name: 'Forms',
    // },
    // {
    //   path: '/app/edit-project:id',
    //   icon: 'FormsIcon',
    //   name: 'EditProject',
    // },
 
    {
      path: '/app/mentor/courses',
      icon: 'TablesIcon',
      name: 'Courses',
    }
    
  ]
  
  export default routes
  