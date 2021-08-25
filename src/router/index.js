import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import loadable from '@/utils/loadable'

const Change = loadable(() => import('@/views/Change'))
const User = loadable(() => import('@/views/User'))
const OtherPage = loadable(() => import('@/views/Other'))

const routes = [
    {
        path: "/change",
        component: Change
    },
    {
        path: "/user",
        component: User
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
            <Route exact path='/' render={() => (
                <Redirect to='/change' />
            )} />
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </Router>
);


export default BasicRoute;