import React from 'react'
import styles from './orderItem.module.scss'

const price = ['20减10', '25减20', '100减1']

const OrderItem = (props) => {
    const { id } = props
    return <div className={styles.order}>
        <div className={styles.shop_info}>
            <img src={require('@/assets/images/goods1.jpg')} className={styles.shop_info_pic} alt="门店图片" />
            <span className={styles.shop_info_name}>顶道阿婆牛杂(床位)</span>
        </div>
        <div className={styles.shop_disc}>
            {price.map((item, index) => {
                return <span key={index} className={styles.shop_disc_item}>{item}</span>
            })}
        </div>
        <div className={styles.order_content}>
            <div className={styles.order_content_goods}>
                {id == 1 ?
                    <div className={styles.goods_one} >
                        <img src={require('@/assets/images/goods2.jpg')} className={styles.goods_one_pic} alt="商品图片" />
                        <div className={styles.goods_one_name}>特价露水露水张张露水张露水张</div>
                    </div> :
                    <div className={styles.goods_more}>
                        <div>
                            <img src={require('@/assets/images/goods3.jpg')} className={styles.goods_more_pic} alt="商品图片" />
                            <span className={styles.goods_more_name}>露水</span>
                        </div>
                        <div>
                            <img src={require('@/assets/images/goods3.jpg')} className={styles.goods_more_pic} alt="商品图片" />
                            <span className={styles.goods_more_name}>露水</span>
                        </div>
                        <div>
                            <img src={require('@/assets/images/goods3.jpg')} className={styles.goods_more_pic} alt="商品图片" />
                            <span className={styles.goods_more_name}>露水</span>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.order_content_price}>
                <p><span>￥</span><span className={styles.price}>129.1</span></p>
                <p className={styles.number}>共1100件</p>
            </div>
        </div>
        <div className={styles.order_opertaion}>
            <div className={`${styles.order_button} ${styles.order_again_button}`}>
                <span>再来一单</span>
            </div>
        </div>
    </div>
}

export default OrderItem