import React, { useState, useEffect } from 'react'
import store from '@/store'
import styles from './style.module.scss'

const AddAddress = (props) => {

    const [addressForm, setAddressForm] = useState({})
    const [tag, setTag] = useState('')

    const form = [
        {
            lable: '地址',
            component: 'Selectcomponent',
            type: 'text',
            key: 'address',
            placeholder: '选择收获地址',
            required: true,
        },
        {
            lable: '门牌号',
            component: 'input',
            type: 'text',
            key: 'houseNumber',
            placeholder: '请填写详细地址',
            required: true
        },
        {
            lable: '标签',
            tagList: ['家', '公司', '学校'],
            component: 'Tagcomponent',
            key: 'tag',
            required: false
        },
        {
            lable: '联系人',
            component: 'input',
            type: 'text',
            key: 'contacts',
            placeholder: '收货人姓名',
            required: true
        },
        {
            lable: '手机号',
            component: 'input',
            type: 'number',
            key: 'phone',
            placeholder: '收货人手机号码',
            required: true,
            reg: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入正确的手机号码'
        }
    ]

    // 获取输入框的内容
    const getValue = (el, formItem) => {
        const { value } = el.target
        const { key } = formItem
        addressForm[key] = value
        setAddressForm(addressForm)

    }

    const handleClickTag = (tag) => {
        addressForm['key'] = tag
        setTag(tag)
        setAddressForm(addressForm)
        console.log('addressForm', addressForm)
    }

    const getAddress = () => {
        props.history.push('/getAddress')
    }

    const saveAddress = () => {
        for (let i = 0; i < form.length; i++) {
            if (form[i].required && !addressForm[form[i].key]) {
                alert(`${form[i].lable}的内容不能为空`)
                return
            }
            if(form[i].reg && !form[i].reg.test(addressForm[form[i].key])) {
                alert(form[i].message)
                return 
            }
        }
    }

    // 选择地址组件
    const Selectcomponent = (props) => {
        const { addressReducer } = store.getState()
        addressForm['address'] = addressReducer.address
        setAddressForm(addressForm)
        return <div className={styles.select_container} onClick={getAddress}>
            {addressReducer.address ?
                <span className={styles.address_value}>{addressReducer.address}</span> :
                <span className={styles.address_placeholder}>选择收获地址</span>
            }
        </div>
    }

    // tag组件
    const Tagcomponent = (props) => {
        let { tagList } = props
        return <div className={styles.tag_container}>
            {tagList.map((tagItem, tagIndex) => {
                return <div key={tagIndex} onClick={() => handleClickTag(tagItem)}
                    className={`${styles.tag_item} ${tagItem === tag ? styles.tag_item_active : styles.tag_item_normal}`}>
                    <span>{tagItem}</span>
                </div>
            })}
        </div>
    }

    return <div className={styles.addaddress}>
        <div className={styles.addaddress_form}>
            {form.map((formItem, formIndex) => {
                return <div key={formIndex} className={styles.addaddress_form_item}>
                    <span className={styles.lable}>{formItem.lable}</span>
                    {formItem.component == 'input' ?
                        <input className={styles.input} placeholder={formItem.placeholder} value={addressForm[formItem.key]}
                            type={formItem.type} onChange={(el) => getValue(el, formItem)}
                        /> :
                        formItem.component == 'Selectcomponent' ? <Selectcomponent></Selectcomponent> :
                            <Tagcomponent {...formItem}></Tagcomponent>
                    }
                </div>
            })}
            <div className={styles.addaddress_form_submit} onClick={saveAddress}>
                <span className={styles.addaddress_form_submit_text} >保存</span>
            </div>
        </div>
    </div>
}

export default AddAddress