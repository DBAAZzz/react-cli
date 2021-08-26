import React, { Component } from 'react'
import ButtonComponent from '../../component/Button'

export default class OtherPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>我这是Other页面</h1>
                <ButtonComponent name="按钮" />
            </div>
        )
    }
}