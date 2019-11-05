import store from '@/store'

export default async (to, from, next) => {
  await store.dispatch('auth/handshake')
  next()
}
