import store from '@/store'

export default async (to, from, next) => {
  await store.dispatch('config/get')
  next()
}
