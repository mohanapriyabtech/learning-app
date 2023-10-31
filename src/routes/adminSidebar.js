/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
    {
      path: '/app/admin/dashboard', // the url
      icon: 'HomeIcon', // the component being exported from icons/index.js
      name: 'Dashboard', // name that appear in Sidebar
    },
    // {
    //   path: '/app/forms',
    //   icon: 'FormsIcon',
    //   name: 'Forms',
    // },
    {
      path: '/app/admin/edit-course:id',
      icon: 'FormsIcon',
      name: 'MentorsEditForm',
    },
  
    {
      path: '/app/admin/courses',
      icon: 'TablesIcon',
      name: 'Courses',
    },
    {
      path: '/app/admin/mentors',
      icon: 'TablesIcon',
      name: 'Mentors',
    },
    
  ]
  
  export default routes
  