// Info.js
import React from 'react'
import { Link } from 'react-router-dom'
import { IoCaretBackCircleOutline } from 'react-icons/io5'

const Info = ({ to, text }) => {
    return (
        <i>
            <span style={{ fontSize: 10 }}>(Jika Tidak ada pilihan size silahkan tambahkan di menu master -> Size )</span>
        </i>
    )
}

export default Info
