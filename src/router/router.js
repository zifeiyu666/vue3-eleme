
const Home = () => import('@/pages/home')
const City = () => import('@/pages/city')
const Msite = () => import('@/pages/msite')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/msite',
    component: Msite
  }
]
export default routes