import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('../views/Activity.vue')
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import('../views/Company.vue')
  },
  {
    path: '/item',
    name: 'Item',
    component: () => import('../views/Item.vue')
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: () => import('../views/Invoice.vue')
  },
  {
    path: "/invoice/:id",
    name: "InvoiceDetail",
    props: true,
    component: () =>
      import(
      '../views/InvoiceDetail.vue'
      ),
  },
  {
    path: "/company/:id",
    name: "CompanyDetail",
    props: true,
    component: () =>
      import(
       "../views/CompanyDetail.vue"
      ),
  },
  {
    path: "/item/:id",
    name: "ItemDetail",
    props: true,
    component: () =>
      import(
      "../views/ItemDetail.vue"
      ),
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
