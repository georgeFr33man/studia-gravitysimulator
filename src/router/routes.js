const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {name: 'home', path: '', component: _ => import('pages/Index.vue')},
      {
        name: 'simulator',
        path: '/simulator/:simulationType',
        props: (route) => ({...route.params}),
        component: _ => import('pages/Simulation.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
