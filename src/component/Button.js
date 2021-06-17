import React, { useState, useEffect } from 'react'
import themeContext from '../context/themeContext'
import Text from '../component/Text'

let ButtonComponent = (props) => {
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (
        <themeContext.Consumer>
            {
                (color) => 
                    <div>
                        <p style={{color: color}}>这是button组件</p>
                        <Text></Text>  
                    </div>                          
            }
        </themeContext.Consumer>
    )
}



export default ButtonComponent