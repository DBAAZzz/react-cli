import React from 'react'
import './footer.scss'

export default function Footer(props) {
    console.log('Footer这个组件渲染了多少次')
    
    let { path } = props.match
    let route  = props.route
    function handleClickNav(nav) {
        if(path == nav.path) return ;
        props.history.push(nav.path)
    }
    return (
        <div className="footer">
            {route.map((nav, index) => {
                return (
                    <div className="footer_nav" key={index} onClick={() => handleClickNav(nav)}>
                        <div className="footer_nav_icon"></div>
                        <span className="footer_nav_label">{nav.name}</span>
                    </div>
                )
            })}
        </div>
    )
}