import React from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const BarChart = ({ labels, income_total, expend_total, label_name, bg_color }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: label_name,
                backgroundColor: bg_color,
                borderColor: 'rgb(255, 99, 132)',
                data: income_total,
            },
        ],
    }
    return (
        <div>
            <Bar data={data} />
        </div>
    )
}

export default BarChart
