import React, { memo, useEffect, useRef, useState } from 'react'
import { addEvent, removeEvent, isBottom } from '@/utils'
import styles from './point.module.scss'

const Point = (props) => {
    console.log('被渲染了')
    const [up, setUp] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [searching, setSearching] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [pointList, setPointList] = useState([])
    const [showPoint, setShowPoint] = useState(false)
    const [listTotal, setListTotal] = useState(0)
    const [listIndex, setListIndex] = useState(1)
    const pointListRef = useRef(null)
    let map = props.__map__

    // 初始化Point的相关参数
    const init = () => {
        if (!map) {
            console.error('组件必须在Map的子组件中使用')
            return;
        }
        // 异步加载高德地图插件
        map.plugin(['AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.CitySearch'], function () {
            // 用于坐标与地址的转换
            map.Geocoder = new AMap.Geocoder({
                batch: true, //是否批量查询
            });
            // 用于地点搜索服务
            map.PlaceSearch = new AMap.PlaceSearch({
                citylimit: true,  // 限制在设置的城市内搜索
                extensions: 'all',  // 返回基本+基本信息
                pageSize: 15,
                pageIndex: listIndex
            })
            var citySearch = new AMap.CitySearch()
            citySearch.getLocalCity((status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    let { city } = result
                    map.PlaceSearch.setCity(city)
                    setCity(city)
                }
            })
        });
        map.on('movestart', () => {
            setUp(true)
        })
        map.on('moveend', () => {
            setUp(false)
            let { lat, lng } = map.getCenter()
            getAddress(lng, lat)
        })
    }
    // 逆向地理编码获取经纬度的详细地址
    const getAddress = (lng, lat) => {
        map.Geocoder && map.Geocoder.getAddress([lng, lat], (status, result) => {
            if (status === 'complete' && result.info == 'OK') {
                setAddress(result.regeocode.formattedAddress)
                console.log(result.regeocode.formattedAddress)
            } else {
                throw new Error('根据经纬度查询地址失败')
            }
        })
    }

    // 根据wordkey搜索相关地点
    const getPointList = (wordkey) => {
        return new Promise((resolve, reject) => {
            map.PlaceSearch && map.PlaceSearch.search(wordkey, (status, result) => {
                console.log('result', result)
                if (status === 'complete' && result.info === 'OK') {
                    let { count, pois } = result.poiList
                    let resultList = pois.map((poiItem) => {
                        return {
                            name: poiItem.name,
                            address: `${poiItem.pname}${poiItem.cityname}${poiItem.adname}${poiItem.address}`,
                            location: poiItem.location
                        }
                    })
                    resolve({ count, list: resultList })
                } else {
                    reject(result)
                }
            })
        })

    }

    const getValue = (el) => {
        let { value } = el.target
        setSearchValue(value)
        return
    }

    const handleSearch = async () => {
        setListIndex(1)
        setPointList([])
        if (!showPoint) {
            setShowPoint(true) 
        }
        let { count, list } = await getPointList(searchValue)
        let resultList = list
        setListTotal(count)
        setPointList(resultList)  
    }

    // 监听地点列表滚动
    const pointListScroll = async (el) => {
        // 滚动到了底部
        if (isBottom(el.target) && pointList.length < listTotal) {
            setListIndex(listIndex+1)
            map.PlaceSearch.setPageIndex(listIndex)
            let { list } = await getPointList(searchValue)
            setPointList(pointList.concat(list))
        }
    }

    const focusing = (value) => {
        if (value || searchValue) {
            setSearching(true)
        } else {
            setSearching(false)
            setShowPoint(false)
            pointListRef.current && removeEvent(pointListRef.current, 'scroll')
        }
    }

    useEffect(() => {
        init()
        return () => {
            console.log('Point组件销毁')
        }
    }, [])

    return <div className={styles.tools}>
        {/* 中心点的地图坐标icon */}
        <div className={`${styles.point}`}>
            <img className={`${styles.map_icon} ${up ? styles.map_up : ''}`} src={require('@/assets/images/map.png')} alt="map" />
            <span className={`${styles.dot} ${up ? styles.dot_up : ''}`}></span>
        </div>
        {/* 搜索栏 */}
        <div className={styles.search} id="search" >
            <span className={styles.search_city}>{city}</span>
            <input placeholder="请输入您的收货地址" className={`${styles.search_input} ${searching ? styles.width400 : styles.width500}`}
                value={searchValue} onChange={getValue} onFocus={() => focusing(true)} onBlur={() => focusing(false)}
            />
            {searching ? <div className={styles.search_button} onClick={handleSearch}>{searchValue ? '搜索' : '取消'}</div> : ''}
        </div>
        {/* 地点列表 */}
        {
            searching ?
                <div className={styles.wrap}>
                    {showPoint ? <div className={styles.poi_list} ref={pointListRef} onScroll={pointListScroll}>
                        {pointList.map((poiItem, poiIndex) => {
                            return <div key={poiIndex} className={styles.poi_item}>
                                <p className={styles.poi_item_name}>{poiItem.name}</p>
                                <p className={styles.poi_item_address}>{poiItem.address}</p>
                            </div>
                        })}
                        {pointList.length == 0 ? <div className={styles.result_null}>
                            <span className={styles.result_null_text}>暂无结果</span>
                        </div> : ''}
                    </div> : ''
                    }
                </div> : ''
        }
    </div>

}

export default memo(Point)