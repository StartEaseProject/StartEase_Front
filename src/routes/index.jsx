import { Route } from 'react-router-dom'
import Auth from '../middlewares/Auth'
import Guest from '../middlewares/Guest'
import Student from '../middlewares/Student'
import HasProject from '../middlewares/HasProject'
import CanSubmit from '../middlewares/CanSubmit'
import ManageProjects from '../middlewares/ManageProjects'
import Layout from '../layouts'
import { Fragment, Suspense, lazy } from 'react'
import MiddlewareWrapper from '../utils/MiddlewareWrapper'
import { LoadingAnimation } from '../components/Globals'
import HasPermission from '../middlewares/HasPermission'

export const renderRoutes = (routes) => (
  <>
    {Object.values(routes).map((route) => {
      const middlewares = route.middlewares || []
      const Layout = route.layout || Fragment
      const Element = route.element

      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <MiddlewareWrapper empty={false} middlewares={middlewares}>
              <Layout>
                <Suspense
                  fallback={<LoadingAnimation className='scale-[0.4] ' />}
                >
                  <Element />
                </Suspense>
              </Layout>
            </MiddlewareWrapper>
          }
        />
      )
    })}
  </>
)

export const routes = {
  /* GUESSED ROUTES */
  LANDING_PAGE: {
    path: '/',
    middlewares: [],
    element: lazy(() => import('../pages/Home/HomePage')),
  },
  LANDING_PAGE_Annoucements: {
    path: '/:id',
    middlewares: [],
    element: lazy(() => import('../pages/Home/AnoucementPage')),
  },
  LOGIN: {
    path: '/login',
    middlewares: [Guest],
    element: lazy(() => import('../pages/Auth/Login')),
  },
  REGISTER: {
    path: '/register',
    middlewares: [Guest],
    element: lazy(() => import('../pages/Auth/Register')),
  },
  REGISTER_TEACHER: {
    path: '/register/complete/:id',
    middlewares: [Guest],
    element: lazy(() => import('../pages/Auth/SelectCompleteRegisterPage')),
  },

  RESET: {
    path: '/reset',
    middlewares: [Guest],
    element: lazy(() => import('../pages/Auth/ResetPassword')),
  },

  /* AUTH MAIN MENU ROUTES */
  HOME: {
    path: '/main-menu',
    breadcrumbs: <>Main Menu</>,
    layout: Layout,
    middlewares: [Auth],
    element: lazy(() => import('../pages/DashBoard/Home')),
    navbar: 'Dashboard',
    icon: 'home',
  },
  MY_PROJECT: {
    path: '/main-menu/my-project',
    breadcrumbs: <>My project</>,
    layout: Layout,
    middlewares: [Auth, HasProject],
    element: lazy(() => import('../pages/Project management/MyProject')),
    navbar: 'My Project',
    icon: 'item',
  },
  SUBMIT_PROJECT: {
    path: '/main-menu/submit-project',
    breadcrumbs: <>Submit project</>,
    layout: Layout,
    middlewares: [Auth, CanSubmit],
    element: lazy(() => import('../pages/Project management/SubmitProject')),
    navbar: 'Submit Project',
    icon: 'item',
  },
  UPDATE_MY_PROJECT: {
    path: '/main-menu/my-project/update-project',
    breadcrumbs: <>Update project</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'update-project' }),
    ],
    element: lazy(() => import('../pages/Project management/UpdateProject')),
  },
  UPDATE_PROJECT: {
    path: '/main-menu/project_management/:id/update-project',
    breadcrumbs: <>Update project</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'update-project' }),
    ],
    element: lazy(() => import('../pages/Project management/UpdateProject')),
  },

  MY_REMARKS: {
    path: '/main-menu/my-project/remarks/:id',
    breadcrumbs: <>Remarks</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-remark' }),
    ],
    element: lazy(() => import('../pages/Project management/AddRemarks')),
  },
  MY_COMMENTS: {
    path: '/main-menu/my-project/comments/:id',
    breadcrumbs: <>Comments</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-comment' }),
    ],
    element: lazy(() => import('../pages/Comments/AddComments')),
  },
  PROJECT_COMMENTS: {
    path: '/main-menu/project_management/:id/comments',
    breadcrumbs: <>Comments</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-comment' }),
    ],
    element: lazy(() => import('../pages/Comments/AddComments')),
  },
  PROJECT_REMARKS: {
    path: '/main-menu/project_management/:id/remarks',
    breadcrumbs: <>Remarks</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-remark' }),
    ],
    element: lazy(() => import('../pages/Project management/AddRemarks')),
  },
  PROJECT_OBSERVATIONS: {
    path: '/main-menu/project_management/:id/observations',
    breadcrumbs: <>Observations</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({
          children,
          empty,
          permission: 'read-project-observation',
        }),
    ],
    element: lazy(() => import('../pages/Observations/Observations')),
  },
  CREATE_SOUTENANCE: {
    path: '/main-menu/project_management/:id/defence',
    breadcrumbs: <>Create Defence</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'create-defence' }),
    ],
    element: lazy(() => import('../pages/Soutenance/CreateSoutenace')),
  },
  UPDATE_ADVANCEMENT: {
    path: '/main-menu/project_management/:id/update-advancement',
    breadcrumbs: <>Update project progress</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({
          children,
          empty,
          permission: 'update-progress-project',
        }),
    ],
    element: lazy(() => import('../pages/Observations/UpdateAdvancement')),
  },
  MY_PROJECT_OBSERVATIONS: {
    path: '/main-menu/my-project/observations/:id',
    breadcrumbs: <>Observations</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({
          children,
          empty,
          permission: 'read-project-observation',
        }),
    ],
    element: lazy(() => import('../pages/Observations/Observations')),
  },

  MY_PROJECT_DETAILS: {
    path: '/main-menu/my-project/details',
    breadcrumbs: <>Details</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-project' }),
    ],
    element: lazy(() => import('../pages/Project management/ProjectDetails')),
  },
  PROJECT_DETAILS: {
    path: '/main-menu/project_management/:id/details',
    breadcrumbs: <>Details</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-project' }),
    ],
    element: lazy(() => import('../pages/Project management/ProjectDetails')),
  },

  SOUTENANCE_MANAGEMENT: {
    path: '/main-menu/thesis-management',
    breadcrumbs: <>Defences Management</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-defence' }),
    ],
    element: lazy(() => import('../pages/Soutenance/SoutenanceTable')),
    navbar: 'Defences Management',
    icon: 'item',
  },
  VIEW_SOUTENANCE: {
    path: '/main-menu/thesis-management/:id',
    breadcrumbs: <>View Defence</>,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-defence' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/Soutenance/ViewSoutenance')),
  },
  VIEW_MY_SOUTENANCE: {
    path: '/main-menu/my-project/defence/:id',
    breadcrumbs: <>My defence</>,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-defence' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/Soutenance/ViewSoutenance')),
  },
  MY_SOUTENANCE_DETAILS: {
    path: '/main-menu/my-project/defence/:id/details',
    breadcrumbs: <>Details</>,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-defence' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/Soutenance/SoutenanceDetails')),
  },
  UPDATE_SOUTENANCE: {
    path: '/main-menu/thesis-management/:id/update-thesis',
    breadcrumbs: <>Update Defence</>,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'update-defence' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/Soutenance/UpdateSoutenance')),
  },
  SOUTENANCE_DETAILS: {
    path: '/main-menu/thesis-management/:id/details',
    breadcrumbs: <>Details</>,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-defence' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/Soutenance/SoutenanceDetails')),
  },

  PROJECTS: {
    path: '/main-menu/project_management',
    breadcrumbs: <>Projects Management</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-project' }),
    ],
    element: lazy(() => import('../pages/Project management/ProjectTable')),
    navbar: 'Projects Management',
    icon: 'project',
  },
  VIEW_PROJECT: {
    path: '/main-menu/project_management/:id',
    breadcrumbs: <>Project</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-project' }),
    ],
    element: lazy(() => import('../pages/Project management/ViewProject')),
  },

  PROJECT_TASKS: {
    path: '/main-menu/project_management/:id/tasks',
    breadcrumbs: <>Tasks</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/FollowingTasks')),
  },
  MY_PROJECT_TASKS: {
    path: '/main-menu/my-project/:id/tasks',
    breadcrumbs: <>Tasks</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/MyTasks')),
  },
  ADD_TASKS: {
    path: '/main-menu/project_management/:id/tasks/add-task',
    breadcrumbs: <>Add task</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'create-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/AddTask')),
  },
  EDIT_TASK: {
    path: '/main-menu/project_management/:id/tasks/:task_id/edit',
    breadcrumbs: <>Update task</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'update-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/EditTask')),
  },
  TASK_DETAILS: {
    path: '/main-menu/project_management/:id/tasks/:task_id',
    breadcrumbs: <>Details</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/TaskDetails')),
  },
  MY_TASK_DETAILS: {
    path: '/main-menu/my-project/:id/tasks/:task_id',
    breadcrumbs: <>Details</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/TaskDetails')),
  },
  VIEW_TASK_SUBMISSION: {
    path: '/main-menu/project_management/:id/tasks/:task_id/submission',
    breadcrumbs: <>Submission</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/ViewTask')),
  },
  VIEW_MY_TASK_SUBMISSION: {
    path: '/main-menu/my-project/:id/tasks/:task_id/submission',
    breadcrumbs: <>Submission</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/ViewMySubmission')),
  },
  TASK_SUBMIT: {
    path: '/main-menu/my-project/:projectId/tasks/:id/submit',
    breadcrumbs: <>Submit</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'submit-task' }),
    ],
    element: lazy(() => import('../pages/Tasks/SubmitTask')),
  },

  ADD_ANNOUNCEMENT: {
    path: '/main-menu/announcements/create',
    breadcrumbs: <>Create Announcement</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'create-announcement' }),
    ],
    element: lazy(() => import('../pages/Announcements/AddAnnouncement')),
  },
  UPDATE_ANNOUNCEMENT: {
    path: '/main-menu/announcements/:id/edit',
    breadcrumbs: <>Update Announcement</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'update-announcement' }),
    ],
    element: lazy(() => import('../pages/Announcements/UpdateAnnouncement')),
  },
  VIEW_ANNOUNCEMENT: {
    path: '/main-menu/announcements/:id/view',
    breadcrumbs: <>Details</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-announcement' }),
    ],
    element: lazy(() => import('../pages/Announcements/ViewAnnouncement')),
  },
  ANNOUNCEMENTS: {
    path: '/main-menu/announcements',
    breadcrumbs: <>Announcements</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-announcement' }),
    ],
    element: lazy(() => import('../pages/Announcements/MyAnnouncements')),
    navbar: 'Announcements',
    icon: 'monitor',
  },
  /*   ANNOUNCEMENTS_MANAGEMENT: {
    path: '/main-menu/announcement-management',
    breadcrumbs: <>Announcement Management</>,
    layout: Layout,
    middlewares: [],

    element: lazy(() => import('../pages/Announcements/AnnoucementManagement')),
  }, */
  ADD_DELIBERATION: {
    path: '/main-menu/thesis-management/:id/add-deliberation',
    breadcrumbs: <>Add Deliberation</>,
    layout: Layout,
    middlewares: [Auth],
    element: lazy(() => import('../pages/Deliberation/AddDeliberation')),
  },

  VIEW_DELIBERATION: {
    path: '/main-menu/thesis-management/:id/deliberation',
    breadcrumbs: <>View Deliberation</>,
    layout: Layout,
    middlewares: [
      Auth,
      ManageProjects,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-deliberation' }),
    ],
    element: lazy(() => import('../pages/Deliberation/ViewDeliberation')),
  },
  VIEW_MY_DELIBERATION: {
    path: '/main-menu/my-project/defence/:id/deliberation',
    breadcrumbs: <>My Deliberation</>,
    layout: Layout,
    middlewares: [
      Auth,
      Student,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-deliberation' }),
    ],
    element: lazy(() => import('../pages/Deliberation/ViewDeliberation')),
  },
  /* SUPER ADMIN ROUTES */

  PERIODS: {
    path: '/main-menu/periods-management',
    breadcrumbs: <>Periods Management</>,
    layout: Layout,
    icon: 'period',
    navbar: 'Periods management',
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'update-period' }),
    ],
    element: lazy(() => import('../pages/Project management/Periods')),
  },

  USERS_MANAGEMENT: {
    path: '/main-menu/users',
    breadcrumbs: <>Users Management</>,
    layout: Layout,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-user' }),
    ],
    element: lazy(() => import('../pages/UsersManagement/Home')),
    navbar: 'Users Management',
    icon: 'profile',
  },
  USERS: {
    path: '/main-menu/users/all',
    breadcrumbs: <>Users Table</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-user' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/UsersManagement/UsersPage')),
  },
  USER: {
    path: '/main-menu/users/all/:id',
    breadcrumbs: <>Users Management</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-user' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/UsersManagement/UserPage')),
  },
  USER_INFO: {
    path: '/main-menu/users/all/:id/informations',
    breadcrumbs: <>User info</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-user' }),
    ],
    layout: Layout,
    element: lazy(() =>
      import('../pages/UsersManagement/UserInformationsPage')
    ),
  },
  USER_ROLES: {
    path: '/main-menu/users/all/:id/roles',
    breadcrumbs: <>User Roles</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-user' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/UsersManagement/UserRolesPage')),
  },
  CREATE_USER: {
    path: '/main-menu/users/create',
    breadcrumbs: <>New User</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'create-user' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/UsersManagement/CreateUserPage')),
  },
  ROLES_MANAGEMENT: {
    path: '/main-menu/roles',
    breadcrumbs: <>Roles Management</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-role' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/RolesManagement/Home')),
    navbar: 'Roles Management',
    icon: 'shield',
  },
  ROLES: {
    path: '/main-menu/roles/all',
    breadcrumbs: <>Roles</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-role' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/RolesManagement/RolesPage')),
  },
  ROLE: {
    path: '/main-menu/roles/all/:id',
    breadcrumbs: <>Role Permissions</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-role' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/RolesManagement/EditRolePage')),
  },
  CREATE_ROLE: {
    path: '/main-menu/roles/create',
    breadcrumbs: <>New Role</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'create-role' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/RolesManagement/CreateRolePage')),
  },
  PERMISSIONS: {
    path: '/main-menu/roles/permissions',
    breadcrumbs: <>Permissions Management</>,
    middlewares: [
      Auth,
      ({ children, empty }) =>
        HasPermission({ children, empty, permission: 'read-permission' }),
    ],
    layout: Layout,
    element: lazy(() => import('../pages/RolesManagement/PermissionsPage')),
  },

  /* AUTH SETTINGS ROUTES */
  SETTINGS: {
    path: '/settings',
    breadcrumbs: <>Settings</>,
    middlewares: [Auth],
    layout: Layout,
    element: lazy(() => import('../pages/Settings')),
    navbar: 'Settings',
    icon: 'settings',
  },
  PROFILE: {
    path: '/settings/profile',
    breadcrumbs: <>Profile</>,
    middlewares: [Auth],
    layout: Layout,
    element: lazy(() => import('../pages/Profile/Home')),
    navbar: 'Profile',
    icon: 'profile',
  },
  PROFILE_INFO: {
    path: '/settings/profile/informations',
    breadcrumbs: <>Informations</>,
    middlewares: [], //Auth
    layout: Layout,
    element: lazy(() => import('../pages/Profile/InformationsPage')),
  },
  PROFILE_ROLES: {
    path: '/settings/profile/roles',
    breadcrumbs: <>Roles</>,
    middlewares: [Auth],
    layout: Layout,
    element: lazy(() => import('../pages/Profile/AuthRolesPage')),
  },
  PROFILE_PERMISSIONS: {
    path: '/settings/profile/permissions',
    breadcrumbs: <>Permissions</>,
    middlewares: [Auth],
    layout: Layout,
    element: lazy(() => import('../pages/Profile/AuthPermissionsPage')),
  },
  PROFILE_PASSWORD: {
    path: '/settings/profile/password',
    breadcrumbs: <>Update Password</>,
    middlewares: [Auth],
    layout: Layout,
    element: lazy(() => import('../pages/Profile/UpdatePswrdPage')),
  },

  NOTFOUND: {
    path: '*',
    element: lazy(() => import('../pages/NotFound')),
  },
}
