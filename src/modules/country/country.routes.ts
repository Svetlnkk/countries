export default [
  {
    path: '/countries',
    name: 'Countries',
    meta: { title: 'Страны' },
    redirect: '/countries',
    children: [
      {
        path: '',
        name: 'List',
        component: () => import('./view/CountriesView.vue')
      },
      {
        path: ':id',
        name: 'Country',
        component: () => import('./view/CountryDetailView.vue')
      }
    ]
  }
]
