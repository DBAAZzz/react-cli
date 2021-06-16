import React from 'react'
import { Link } from 'react-router-dom'
import store from '../../store'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState().countReducer;
        this.cancleSub = () => {};
    }
    render() {
        return (
            <div>
                <h1>这是home页面</h1>
                <h2>{this.state.count}</h2>
                <button onClick={() => this.add()}>增加</button>
                <button onClick={() => this.reduce()}>减少</button>
                <Link to="/user">user</Link>
            </div>
        )
    }
    componentDidMount() {
        this.cancleSub = store.subscribe(()=>{
            this.setState( store.getState().countReducer) 
        })
    }
    componentWillUnmount() {
        this.cancleSub();
    }
    reduce() {
        store.dispatch({
            type: 'REDUCE'
        })
    }
    add() {
        store.dispatch({
            type: 'ADD'
        })
    }
}