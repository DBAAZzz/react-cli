import React from 'react'
import styles from './style.module.scss'

const recommandNavList = [
    '我的地址', '我的客服', '签到领现金', '企业订餐', '发票助手',
    '0元抽手机', '品牌会员', '尊享权益', '商务合作',
    '公益3小时', '邀请有礼'
]

const serviceNavList = [
    '帮助与反馈', '客服中心', '垃圾分类'
]


const My = (props) => {
    function navToAddress(index) {
        console.log(index)
        if (index == 0) {
            props.history.push('/addrmanage')
        }

    }

    return (
        <div className={styles.my}>
            {/* 个人信息 */}
            <div className={styles.user}>
                <div className={styles.user_head_pic}>
                </div>
                <p className={styles.user_name}>chen108322</p>
            </div>
            <div className={`${styles.container_body} ${styles.assets}`}>

            </div>
            {/* 常用功能 */}
            <div className={`${styles.container_body} ${styles.common_use}`}>
                <p className={`${styles.container_label}`}>常用功能</p>
                <div className={styles.common_use_main}>
                    <div className={styles.common_use_main_item}>
                        <div className={styles.common_pic}></div>
                        <span className={styles.common_label}>红包卡券</span>
                    </div>
                    <div className={styles.common_use_main_item}>
                        <div className={styles.common_pic}></div>
                        <span className={styles.common_label}>红包卡券</span>
                    </div>
                    <div className={styles.common_use_main_item}>
                        <div className={styles.common_pic}></div>
                        <span className={styles.common_label}>红包卡券</span>
                    </div>
                    <div className={styles.common_use_main_item}>
                        <div className={styles.common_pic}></div>
                        <span className={styles.common_label}>红包卡券</span>
                    </div>
                </div>
            </div>
            {/* 我的服务 */}
            <div className={`${styles.container_body} ${styles.my_serice}`}>
                <p className={`${styles.container_label}`}>我的服务</p>
                <div className={`${styles.more_recommand_list}`}>
                    {serviceNavList.map((navItem, index) => {
                        return <div key={index} className={styles.nav_item}>
                            <div className={styles.nav_item_pic}></div>
                            <span className={styles.nav_item_label}>{navItem}</span>
                        </div>
                    })}
                </div>
            </div>
            {/* 更多推荐 */}
            <div className={`${styles.container_body} ${styles.more_recommand}`}>
                <p className={`${styles.container_label}`}>更多推荐</p>
                <div className={`${styles.more_recommand_list}`}>
                    {recommandNavList.map((navItem, index) => {
                        return <div key={index} className={styles.nav_item} onClick={() => navToAddress(index)} >
                            <div className={styles.nav_item_pic}></div>
                            <span className={styles.nav_item_label}>{navItem}</span>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default My