import loadable from '@/utils/loadable'
/* 首页 */
const Home = loadable(() => import(/* webpackChunkName: 'home' */ '@/pages/Home'))
/* 推荐页面 */
const Recommand = loadable(() => import(/* webpackChunkName: 'recommand' */ '@/pages/Recommand'))
/* 订单页面 */
const Order = loadable(() => import(/* webpackChunkName: 'order' */ '@/pages/Order'))
/* 我的页面 */
const My = loadable(() => import(/* webpackChunkName: 'my' */ '@/pages/My'))

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