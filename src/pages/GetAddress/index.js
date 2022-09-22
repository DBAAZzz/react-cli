import React, { useEffect } from 'react'
import styles from './style.module.scss'
import { Map } from 'react-amap';
import { key } from '@/config'

import GetAddress from './component/getAddress'


const AddAddress = (props) => {
    useEffect(() => {
        console.log('key', key)
    }, [])
    return <div>
        <div className={styles.map}>
            <Map amapkey={key} zoom={15} >
                <GetAddress />
            </Map>
        </div>
    </div>
}

export default AddAddress