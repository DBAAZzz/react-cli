import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import routes from './router.js'
import Footer from './component/footer'
import './style.scss'

const Layout = (props) => {
    let routeList = [
        {
            name: '首页',
            path: '/home'
        },
        {
            name: '推荐',
            path: '/recommand'
        },
        {
            name: '订单',
            path: '/order'
        }, {
            name: '我的',
            path: '/my'
        }
    ]
    return (
        <div className="layout">
            <div className="main">
                <Switch>
                    {routes.map((route) => {
                        return <Route key={route.path} path={route.path} render={props => (
                            <route.component {...props} />
                        )}></Route>
                    })}
                </Switch>
            </div>
            <Footer route={routeList} {...props} ></Footer>
        </div>
    )
}

export default withRouter(Layout)