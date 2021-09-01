import React, { useState } from 'react'
import OrderItem from './component/orderItem'
import styles from './style.module.scss'

const navList = [
    {
        id: 1,
        label: '全部'
    }, {
        id: 2,
        label: '待付款'
    }, {
        id: 3,
        label: '待评价'
    }, {
        id: 4,
        label: '退款'
    }
]

const Order = () => {

    const [navId, setNavId] = useState(1)
    function handleNavClick(id) {
        setNavId(id)
    }
    return (
        <div className={styles.order}>
            {/* 导航栏 */}
            <div className={styles.order_nav}>
                {navList.map((navItem, index) => {
                    return <div key={index} onClick={() => handleNavClick(navItem.id)}
                        className={`${styles.order_nav_item} ${navId == navItem.id ? styles.order_nav_active_item : ''}`}
                    >
                        <span>{navItem.label}</span>
                    </div>
                })}
            </div>
            <div className={styles.order_list}>
                <OrderItem id={1}></OrderItem>
                <OrderItem id={2}></OrderItem>
                <OrderItem id={2}></OrderItem>
                <OrderItem id={2}></OrderItem>
                <OrderItem id={2}></OrderItem>
                <OrderItem id={2}></OrderItem>
                <OrderItem id={2}></OrderItem>
            </div>
        </div>
    )
}

export default Order