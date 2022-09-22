import React from 'react'
import styles from './goods.module.scss'

const Goods = () => {
    return <div className={styles.goods}>
        <img className={styles.goods_pic} src={require('@/assets/images/goods1.jpg')} />
        <div className={styles.goods_info}>
            <p className={styles.goods_info_name}>必点!糯米鸡</p>
            <p className={styles.goods_info_desc}>对于石材我们选用良好的对于石材我们选用良好的</p>
            <p className={styles.goods_info_sales}>
                <span>月售1000</span><span>好评率89%</span>
            </p>
            <div className={styles.goods_info_price}>
                <span>¥</span><span>10</span>
                <div className={styles.goods_add_button}></div>
            </div> 
        </div>
    </div>
}

export default Goods