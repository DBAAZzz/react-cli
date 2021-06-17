import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Home from '../views/Home'
import User from '../views/User'
import OtherPage from '../views/Other'

const routes = [
    {
        path: "/home",
        component: Home
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
            <Route path='/' exact render={() => (
                <Redirect to='/home' />
            )} />
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </Router>
);


export default BasicRoute;