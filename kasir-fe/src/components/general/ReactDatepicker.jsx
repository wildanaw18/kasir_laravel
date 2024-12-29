import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

function ReactDatepicker({ selectedDate, setSelectedDate }) {
    const handleDateChange = (date) => {
        // date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
        // console.log(date)
        setSelectedDate(date)
    }
    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: 100, // Sesuaikan dengan lebar yang Anda inginkan
        }),
    }
    return (
        <div className="input-group" style={customStyles}>
            <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" placeholderText="Select a date" className="form-control" minDate={new Date()} style={{ width: '75%' }} />
            {/* <div className="input-group-append">
                <span className="input-group-text">
                    <i className="fa fa-calendar fa-xl"></i>
                </span>
            </div> */}
        </div>
    )
}

export default ReactDatepicker
