import React from 'react'
import store from '../../store'
import './style.scss'

function incrementAsync() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'realPush',
            })
        }, 1000);
    }
}

export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState().todoListReducer;
        this.cancleSub = () => { };
    }
    render() {
        return (
            <div>
                <h1>这是User页面</h1>
                <p>现在state的值为：{this.state.list.join('-')}</p>
                <button onClick={this.push.bind(this)}>push</button>
            </div>
        )
    }
    push() {
        store.dispatch(incrementAsync())
    }
    componentDidMount() {
        this.cancleSub = store.subscribe(() => {
            this.setState(store.getState().todoListReducer);
        })
    }
    componentWillUnmount() {
        this.cancleSub();
    }
}