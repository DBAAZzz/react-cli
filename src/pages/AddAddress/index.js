import React, { useState } from 'react'
import styles from './style.module.scss'

const AddAddress = () => {

    console.log('渲染了')

    const [addressForm, setAddressForm] = useState({})
    const [tag, setTag] = useState('')

    const form = [
        {
            lable: '地址',
            component: 'input',
            type: 'text',
            key: 'address',
            placeholder: '选择收获地址',
            required: true
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
            tag: ['家', '公司', '学校'],
            component: 'tag',
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
            required: true
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

    const saveAddress = () => {
        for (let i = 0; i < form.length; i++) {
            if (form[i].required && !addressForm[form[i].key]) {
                console.log(`${form[i].lable}的内容不能为空`)
                return ;
            }
        }
        console.log('成功提交')
    }

    // tag组件
    const tagcomponent = (formItem) => {
        return <div className={styles.tag_container}>
            {formItem.tag.map((tagItem, tagIndex) => {
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
                        tagcomponent(formItem)
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