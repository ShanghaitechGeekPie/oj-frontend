import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Home/Index'
import course from '../components/Course/Index'
import score from '../components/ScoreBoard/Index'
import submission from '../components/Submission/Index'
import pageNotFound from '../../public/PageNotFound'
import profile from '../../public/Profile'
import instructorProfile from '../../public/InstructorProfile'
import unAuth from '../../public/Unauthorized'
import store from '../store'
import forbidden from '../../public/Forbidden'
import changePro from '../../public/ChangeProfile'
import unInit from '../../public/NoRole'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'indexStudent',
      component: index
    },
    {
      path: '/home/course/:id/scoreboard/:ids',
      name: 'score',
      component: score,
      meta: { requiresAuth: true }
    },
    {
      path: '/home/course/:id/submission/:ids',
      name: 'submissionHistory',
      component: submission,
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'homeStudent',
      component: index
    },
    {
      path: '/home/course/:id',
      name: 'course',
      component: course,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/instrProfile',
      name: 'instrProfile',
      component: instructorProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/changeProfile',
      name: 'changeProfile',
      component: changePro,
      meta: { requiresAuth: true }
    },
    {
      path: '/error',
      name: 'forbidden',
      component: forbidden
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: unAuth
    },
    {
      path: '/uninitialized',
      name: 'uninitialized',
      component: unInit
    },
    {
      path: '*',
      name: 'notFound',
      component: pageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = store.state.isAuthorized
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
