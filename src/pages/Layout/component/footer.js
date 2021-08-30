import React from 'react'
import styles from './footer.module.scss'

export default function Footer(props) {
    console.log('Footer这个组件渲染了多少次')
    
    let { path } = props.match
    let route  = props.route
    function handleClickNav(nav) {
        if(path == nav.path) return ;
        props.history.replace(nav.path)
    }
    return (
        <div className={styles.footer}>
            {route.map((nav, index) => {
                return (
                    <div className={styles.footer_nav} key={index} onClick={() => handleClickNav(nav)}>
                        <div className={styles.footer_nav_icon}></div>
                        <span className={styles.footer_nav_label}>{nav.name}</span>
                    </div>
                )
            })}
        </div>
    )
}