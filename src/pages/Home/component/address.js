import React, { memo, useState } from 'react'
import styles from './address.module.scss'
function Address() {
    console.log('我是address组件，我被渲染了')
    return (
        <div className={styles.address_container}>
            <div className={styles.address}>
                <span className={styles.address_name}>扶林鸢</span>
            </div>
        </div>
    )
}

export default memo(Address)