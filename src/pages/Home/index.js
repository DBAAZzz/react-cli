import React, { useState } from 'react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './style.module.scss'

export default function Home() {
    const [name, setName] = useState('DBAA')
    function changeName() {
        setName(`DBAA${+new Date()}`)
    }
    function swiper() {
        let carouselOption = {
            showArrows: false,
            showThumbs: false,
            showStatus: false
        }
        return (
            <Carousel {...carouselOption} >
                <div className="swiperItem">
                    <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-13.jpg" />
                </div>
                <div className="swiperItem">
                    <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-14.jpg" />
                </div>
            </Carousel>
        )
    }
    return (
        <div>
            <p>{name}</p>
            {swiper()}
            <p>this is Home page</p>
            <button onClick={changeName}>change</button>
        </div>
    )
}