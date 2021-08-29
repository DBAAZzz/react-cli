import React, { useState, useEffect } from 'react'

import Address from './component/address'
import styles from './style.module.scss'
import ShopItem from '@/component/ShopItem'

const tableList = [
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    },
    {
        name: '美食'
    }
]

let selectOption = [
    {
        name: '天天神券',
        id: 1
    },
    {
        name: '会员商家',
        id: 2
    },
    {
        name: '减配送费',
        id: 3
    },
    {
        name: '点评高分',
        id: 4
    }
]

let shopNum = new Array(10).fill(0).map((item,index) => index + 1)

const Home = () =>  {
    console.log('Home渲染了')
    const [activeSelect, setActiveSelect] = useState([])

    
    function handleClickOption(id) {
        let index = activeSelect.indexOf(id)
        if (index != -1) {
            activeSelect.splice(index, 1)
            setActiveSelect([...activeSelect])
        } else {
            setActiveSelect([...activeSelect, id])
        }
    }
    return (
        <div className={styles.home}>
            <Address></Address>
            {/* 顶部的菜单栏 */}
            <div className={styles.floor}>
                {console.log('我是home里面的floor也被渲染了')}
                <div className={styles.search}>
                    <span className={`${styles.search_icon} iconfont icon-maobao`} />
                    <div className={styles.search_input}>
                        <span>九尾狐狸辣椒肉 满100减1</span>
                    </div>
                    <div className={styles.search_button}><span className={styles.search_button_text}>搜索</span></div>
                </div>
                <div className={styles.tab}>
                    {tableList.map((tabItem, index) => {
                        return <div className={`${styles.tab_item} ${index < 5 ? styles.tab_main_item : ''}`} key={index}>
                            <div className={`${index < 5 ? styles.tab_big_img : styles.tab_small_img}`}></div>
                            <span className={styles.tab_label}>{tabItem.name}</span>
                        </div>
                    })}
                </div>
            </div>
            {/* 筛选项 */}
            <div className={styles.like_text}><span>猜你喜欢</span></div>
            <div className={styles.select}>
                {selectOption.map((option) => {
                    return <div key={option.id} onClick={() => handleClickOption(option.id)}
                        className={`${styles.select_item} ${activeSelect.includes(option.id) ? styles.select_active_item : ''}`}>
                        <span>{option.name}</span>
                    </div>
                })}
            </div>
            {shopNum.map((shopItem, index) => {
                return <ShopItem key={index}></ShopItem>
            })}
        </div>
    )
}

export default Home