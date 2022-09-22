import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import styles from './style.module.scss'

const Login = (props) => {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (phone && password && !active) {
            setActive(true)
        } else if ((!phone || !password) && active) {
            setActive(false)
        }
    }, [phone, password])

    const changeValue = (el, key) => {
        let { value } = el.target
        if (key == 'phone') setPhone(value)
        else setPassword(value)
    }

    const submitForm = () => {
        if (!active) return
        localStorage.setItem('login', true)
        let { from } = props.location.state
        props.history.replace({
            pathname: from.pathname,
        })
    }

    return <div className={styles.login}>
        <p className={styles.login_title}>用户登录</p>
        <div className={styles.login_form}>
            <div className={styles.login_form_item}>
                <input className={styles.input} placeholder="请输入手机号码" value={phone} type="tel" maxLength="11"
                    onChange={(el) => changeValue(el, 'phone')} />
            </div>
            <div className={styles.login_form_item}>
                <input className={styles.input} placeholder="请输入密码" value={password} type="password"
                    onChange={(el) => changeValue(el, 'password')} />
            </div>
            <div className={`${styles.login_form_button} ${active ? styles.login_form_active_button : styles.login_form_unact_button}`}
                onClick={submitForm}
            >
                <span>登录</span>
            </div>
        </div>
        <div className={styles.login_agreement}>
            <p>登录即代表已阅读并同意<span>《xxxx无良条款》</span>和<span>《xxxxxxx侵犯隐私协议》</span></p>
        </div>
    </div>
}

export default withRouter(Login)