import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import routes from './router.js'
import Footer from './component/footer'
import styles from './style.module.scss'

const Layout = (props) => {
    console.log('子组件变化会重新渲染吗')
    let routeList = [
        {
            name: '首页',
            path: '/home'
        },
        {
            name: '统计',
            path: '/statistics'
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
        <div className={styles.layout}>
            <div className={styles.main}>
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