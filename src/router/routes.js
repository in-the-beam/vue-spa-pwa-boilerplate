function page (path) {
  return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

// import { seo } from '@/utils'

export default [
  // MAIN PAGE
  { path: '/', name: 'index', component: page('index.vue') },
  //
  // SYSTEM PAGES
  // { path: '/signin', name: 'signin', component: page('auth/signin.vue'), props: true },
  // { path: '/signup', name: 'signup', component: page('auth/signup.vue'), props: true },
  // { path: '/password/reset', name: 'password.request', component: page('auth/password/email.vue') },
  // { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },
  // { path: '/email/verify/:id', name: 'verification.verify', component: page('auth/verification/verify.vue') },
  // { path: '/email/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },

  // FALLBACK
  { path: '*', component: page('errors/404.vue') }
]
