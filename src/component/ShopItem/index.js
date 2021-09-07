import React, { memo } from 'react'
import { withRouter } from 'react-router'
import styles from './style.module.scss'

const ShopItem  = (props) => {
    const handleClick = () => {
        props.history.push('/shopinfo')
    }

    return <div className={styles.shop_item} onClick={handleClick}>
        <div className={styles.shop_pic}>
        </div>
        <div className={styles.shop_info}>
            <p className={styles.shop_info_name}>汕头汇集肠粉汕头汕头集肠粉肠粉</p>
            <div className={styles.shop_info_detail}>
                <p><span className={styles.number}>4分</span><span>月售188</span></p>
                <p className={styles.time}><span>40分钟</span><span>144m</span></p>
            </div>
            <div className={styles.shop_info_key}>
                <span>“门店很不错”</span>
            </div>
            <p className={styles.shop_info_price}>
                <span>起送￥10</span>
                <span>免配送费</span>
            </p>
            <div className={styles.shop_info_disc}>
                <div className={styles.info_tag}>
                    <span>神券10元</span>
                </div>
            </div>
        </div>
    </div>
}

export default withRouter(memo(ShopItem))