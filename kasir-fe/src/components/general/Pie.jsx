// ./components/PieChart.js
import React from 'react'
import Chart from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

const getRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 256)
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
}

const PieChart = ({ transaction_income, transaction_expend }) => {
    const labels = ['Income', 'Expend']
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Amount',
                backgroundColor: [getRandomColor(), getRandomColor()],
                borderColor: [getRandomColor(), getRandomColor()],
                data: [transaction_income, transaction_expend],
            },
        ],
    }

    return (
        <div>
            <Pie data={data} />
        </div>
    )
}

export default PieChart
