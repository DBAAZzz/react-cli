import React, { useEffect } from 'react'
import styles from './style.module.scss'
import { Map } from 'react-amap';
import { key } from '@/config'


const Point = (props) => {

    const map = props.__map__;
    if (!map) {
        console.error('组件必须在Map的子组件中使用')
        return;
    }
    const style = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '100px',
        height: '100px',
        background: 'red',
        padding: '10px'
    }
    console.log('Map', map)
    return <div style={style}>
        <h5>哈哈哈哈</h5>
    </div>
}

const AddAddress = (props) => {

    useEffect(() => {
        console.log('key', key)
    }, [])
    return <div>
        <div className={styles.map}>
            <Map amapkey={key} zoom={12} >
                <Point />
            </Map>
        </div>
    </div>
}

export default AddAddress