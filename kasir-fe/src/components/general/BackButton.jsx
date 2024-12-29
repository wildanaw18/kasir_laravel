// BackButton.js
import React from 'react'
import { Link } from 'react-router-dom'
import { IoCaretBackCircleOutline } from 'react-icons/io5'

const BackButton = ({ to, text }) => {
    return (
        <Link to={to} className="btn btn-orange rounded-4 text-white">
            <IoCaretBackCircleOutline size={25} /> {text}
        </Link>
    )
}

export default BackButton
