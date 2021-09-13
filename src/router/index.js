import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import loadable from '@/utils/loadable'

const Layout = loadable(() => import(/* webpackChunkName: 'layout' */ '@/pages/Layout'))
const ShopInfo = loadable(() => import(/* webpackChunkName: 'shopinfo' */ '@/pages/ShopInfo'))
const AddrManage = loadable(() => import(/* webpackChunkName: 'addrmanage' */ '@/pages/AddrManage'))
const GetAddress = loadable(() => import(/* webpackChunkName: 'getAddress' */ '@/pages/GetAddress'))
const AddAddress = loadable(() => import(/* webpackChunkName: 'addAddress' */ '@/pages/AddAddress'))

const routes = [
    {
        path: '/home',
        component: Layout
    },
    {
        path: '/statistics',
        component: Layout
    },
    {
        path: '/order',
        component: Layout
    },
    {
        path: '/my',
        component: Layout
    },
    {
        path: '/shopinfo',
        component: ShopInfo
    },
    {
        path: '/addrmanage', 
        component: AddrManage
    },
    {
        path: '/addAddress',
        component: AddAddress
    },
    {
        path: '/getAddress',
        component: GetAddress
    }
];

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/home"></Redirect>
            )} />
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </Router>
);


export default BasicRoute;