import React from 'react'
import styles from './style.module.scss'
import Goods from './component/goods'

const tabList = ['点餐', '评价', '商家']

const category_tab = new Array(12).fill(0).map((item, index) => index + 1)
const category_content = new Array(30).fill(0).map((item, index) => index + 1)

const ShopInfo = () => {
    return <div className={styles.shop}>
        {/* 门店介绍 */}
        <div className={styles.shop_intro}>
            <div className={styles.shop_intro_pic}></div>
            <div className={styles.shop_intro_info}>
                <div className={styles.info_shop_pic}></div>
                <div className={styles.info_shop_name}>汕头汇集仓汕头汇集仓汕头汇集仓汕头汇集仓</div>
                <div className={styles.info_shop_time}>跨送约10分钟 * 月售1000</div>
                <div className={styles.info_message}>
                    <span>公告:useMemo 做复杂推导时必用，简单计算用了也不会错我觉得 能不使用就不使用。应用性能真不至于太差。</span>
                </div>
                <div className={styles.info_disc}>
                    <span className={styles.info_disc_item}>0元优惠</span>
                    <span className={styles.info_disc_item}>满100减1</span>
                </div>
            </div>
        </div>
        {/* tab栏 */}
        <div className={styles.tab}>
            {tabList.map((tabItem, index) => {
                return <div className={`${styles.tab_item} ${index == 0 ? styles.tab_active_item : ''}`}>
                    {tabItem}
                </div>
            })}
        </div>
        {/* 点餐 */}
        <div className={styles.category_view}>
            <div className={styles.category_tab}>
                <ul >
                    {category_tab.map((tabItem) => {
                        return <li className={styles.cur}>
                            <span>下单须知{tabItem}</span>
                        </li>
                    })}
                </ul>
            </div>
            <div className={styles.category_content}>
                {category_content.map((goodsItem) => {
                    return <Goods></Goods>
                })}
            </div>
        </div>
    </div>
}

export default ShopInfo