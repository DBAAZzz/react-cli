import React, { memo, useEffect, useState } from 'react'
import styles from './point.module.scss'

const Point = (props) => {
    const [up, setUp] = useState(false)
    const [address, setAddress] = useState('')
    let map = null

    // 初始化Point的相关参数
    const init = () => {
        map = props.__map__;
        if (!map) {
            console.error('组件必须在Map的子组件中使用')
            return;
        }
        // 异步加载高德地图Geocoder插件，用于地址描述与坐标之间的转换
        map.plugin('AMap.Geocoder', function () {
            map.Geocoder = new AMap.Geocoder({
                batch: true, //是否批量查询
            });
        });
        map.on('movestart', () => {
            setUp(true)
        })
        map.on('moveend', () => {
            setUp(false)
            setAddress('')
            let { lat, lng } = map.getCenter()
            getAddress(lng, lat)
        })
    }

    // 逆向地理编码获取经纬度的详细地址
    const getAddress = (lng, lat) => {
        map.Geocoder.getAddress([lng, lat], (status, result) => {
            if (status === 'complete' && result.info == 'OK') {
                console.log('解析完成', result)
                setAddress(result.regeocode.formattedAddress)
            } else {
                throw new Error('根据经纬度查询地址失败')
            }
        })
    }

    useEffect(() => {
        console.log('props', props)
        init()
        return () => {
            console.log('Point组件销毁')
        }
    }, [])

    return <div className={`${styles.point} `}>
        {/* {
            !up&&address ? 
            <div className={styles.address} >
                <span>{address}</span>
            </div> 
            : <div></div>
        } */}
        {/* <div className={styles.address} >
            <span>{address}</span>
        </div> */}
        <img className={`${styles.map_icon} ${up ? styles.map_up : ''}`} src={require('@/assets/images/map.png')} alt="map" />
        <span className={`${styles.dot} ${up ? styles.dot_up : ''}`}></span>
    </div>
}

export default memo(Point)