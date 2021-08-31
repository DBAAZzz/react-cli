import React, { useEffect, useRef, useState } from 'react'
import { addEvent, removeEvent } from '@/utils'

import Goods from './component/goods'
import styles from './style.module.scss'

const tabList = ['点餐', '评价', '商家']

const category_tab = new Array(12).fill(0).map((item, index) => index + 1)
const category_content = new Array(30).fill(0).map((item, index) => index + 1)

const ShopInfo = () => {
    const [isFixed, setIsFixed] = useState(false)
    const pageRef = useRef(null)
    let fixed = false
    // 监听页面滚动
    function pageScroll(el) {
        const { scrollTop } = el.target
        const FixedHeight = 300; // 当滚动像素大于140时就出现吸附效果
        if (scrollTop * window.pxRatio >= FixedHeight && !fixed) {
            setIsFixed(true)
            fixed = true
        } else if (scrollTop * window.pxRatio < FixedHeight && fixed) {
            setIsFixed(false)
            fixed = false
        }
    }

    useEffect(() => {
        addEvent(pageRef.current, 'scroll', pageScroll)
        return () => { }
    }, [])

    return <div className={styles.shop} ref={pageRef} >
        {/* 门店介绍 */}
        <div className={styles.shop_intro}>
            <div className={styles.shop_intro_opeartion}></div>
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
        <div className={styles.tab_fill}>
            <div className={`${styles.tab} ${isFixed ? styles.tab_fixed : ''}`} >
                {tabList.map((tabItem, index) => {
                    return <div key={index} className={`${styles.tab_item} ${index == 0 ? styles.tab_active_item : ''}`}>
                        {tabItem}
                    </div>
                })}
            </div>
        </div>
        {/* 点餐 */}
        <div className={`${styles.category_view} ${isFixed ? styles.category_view_height : ''}`}>
            <div
                style={isFixed ? { overflow: 'auto', overflowX: 'hidden' } : { overflow: 'hidden' }}
                className={`${styles.category_tab} `}
            >
                <ul >
                    {category_tab.map((tabItem, index) => {
                        return <li className={styles.cur} key={index} >
                            <span>下单须知{tabItem}</span>
                        </li>
                    })}
                </ul>
            </div>
            {console.log(isFixed)}
            <div style={isFixed ? { overflow: 'auto', overflowX: 'hidden' } : { overflow: 'hidden' }}
                className={`${styles.category_content} `}
            >
                {category_content.map((goodsItem, index) => {
                    return <Goods key={index}></Goods>
                })}
            </div>
        </div>
        {/* 购物车 */}
        <div className={styles.cart}>

        </div>
    </div >
}

export default ShopInfo