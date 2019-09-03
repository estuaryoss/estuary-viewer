import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Welcome from 'src/pages/Welcome.vue'
import Deployer from "../components/Estuary/Deployer";
import TestRunner from "../components/Estuary/TestRunner";


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/welcome'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/welcome',
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: 'estuary-deployer',
        name: 'Estuary Deployer',
        component: Deployer
      },
      {
        path: 'estuary-testrunner',
        name: 'Estuary TestRunner',
        component: TestRunner
      }
      // ,
      // {
      //   path: 'user',
      //   name: 'User',
      //   component: UserProfile
      // },
      // {
      //   path: 'table-list',
      //   name: 'Table List',
      //   component: TableList
      // },
      // {
      //   path: 'typography',
      //   name: 'Typography',
      //   component: Typography
      // },
      // {
      //   path: 'icons',
      //   name: 'Icons',
      //   component: Icons
      // },
      // {
      //   path: 'notifications',
      //   name: 'Notifications',
      //   component: Notifications
      // }
      // ,
      // {
      //   path: 'upgrade',
      //   name: 'Upgrade to PRO',
      //   component: Upgrade
      // }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
