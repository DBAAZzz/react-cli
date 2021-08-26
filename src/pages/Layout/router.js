import loadable from '@/utils/loadable'
/* 首页 */
const Home = loadable(() => import('@/pages/Home'))
/* 推荐页面 */
const Recommand = loadable(() => import('@/pages/Recommand'))
/* 订单页面 */
const Order = loadable(() => import('@/pages/Order'))
/* 我的页面 */
const My = loadable(() => import('@/pages/My'))

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/recommand',
        component: Recommand
    },
    {
        path: '/order',
        component: Order
    },
    {
        path: '/my',
        component: My
    }
]

export default routes