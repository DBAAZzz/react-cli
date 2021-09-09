import React, { useEffect } from 'react'
import styles from './style.module.scss'
import { Map } from 'react-amap';
import { key } from '@/config'

import Point from './component/Point'


const AddAddress = (props) => {
    console.log('address开始渲染了')
    useEffect(() => {
        console.log('key', key)
    }, [])
    return <div>
        <div className={styles.map}>
            <Map amapkey={key} zoom={15} >
                {console.log('map组件被渲染了')}
                <Point />
            </Map>
        </div>
    </div>
}

export default AddAddress