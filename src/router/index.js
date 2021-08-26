import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import loadable from '@/utils/loadable'

const Layout = loadable(() => import('@/pages/Layout'))
const Change = loadable(() => import('@/pages/Change'))
const OtherPage = loadable(() => import('@/pages/Other'))

const routes = [
    {
        path: '/home',
        component: Layout
    },
    {
        path: '/recommand',
        component: Layout
    },
    {
        path: '/order',
        component: Layout
    },{
        path: '/my',
        component: Layout
    },
    {
        path: "/change",
        component: Change
    },
    {
        path: "/other",
        component: OtherPage
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