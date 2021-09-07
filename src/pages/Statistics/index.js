import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import styles from './style.module.scss'

const Recommand = () => {
    const [chartData, setChartData] = useState({})
    const chart = () => {
        setChartData({
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            datasets: [
                {
                    label: '金额',
                    data: [16, 20, 8, 26, 8, 20, 80],
                    fill: true,
                    backgroundColor: 'rgba(299, 11, 103, 0.1)',
                    borderWidth: 1,
                    borderColor: 'rgb(75, 192, 192, 1)',
                    tension: 0.4
                }
            ],
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                },
            }
        })
    }
    useEffect(() => {
        chart()
    }, [])
    return (
        <div>
            <div className={styles.text}>
                <Line data={chartData} options={{
                    reponsive: true
                }}></Line>
            </div>
        </div>
    )
}

export default Recommand