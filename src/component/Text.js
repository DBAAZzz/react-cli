import React from 'react'
import themeContext from '../context/themeContext';

const Text = () => {
    return (
        <themeContext.Consumer>
            {(color) => 
                <div>
                    <p>我这是text组件{color}</p>
                </div>
            }
        </themeContext.Consumer>
        
    )
}

export default Text;