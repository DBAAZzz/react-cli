import React from 'react'
import { Link } from 'react-router-dom'
import store from '../../store'
import ButtonComponent from '../../component/Button'
import themeContext from '../../context/themeContext'
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState().countReducer;
        this.cancleSub = () => {};
    }
    render() {
        return (
            <themeContext.Provider value="blue">
                <div>
                    <h1 className="title" >这是home页面</h1>
                    <h2 className="title2">{this.state.count}</h2>
                    <button onClick={() => this.add()}>增加</button>
                    <button onClick={() => this.reduce()}>减少</button>
                    <Link to="/user">user</Link>
                    <ButtonComponent name="按钮" />
                </div>
            </themeContext.Provider>
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