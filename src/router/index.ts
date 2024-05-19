import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from)=> {
  if (!localStorage.access && to.name !== 'Login') {
    return { name: 'Login' }
  } else if (localStorage.access && to.name === 'Login') {
    return { name: 'MainDashboard' }
  }
}) 

export default router
