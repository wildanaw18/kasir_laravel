//import layout
import LayoutAdmin from '../../../layouts/Admin'
import React, { useState, useEffect } from 'react'
//import api
import Api from '../../../services/Api'
//import js cookie
import Cookies from 'js-cookie'
//import toast
import toast from 'react-hot-toast'
//import react router dom
import { useNavigate } from 'react-router-dom'
//import Link from react router dom
import { Link } from 'react-router-dom'

export default function Booking() {
    //token from cookies
    const token = Cookies.get('token')
    //navigata
    const navigate = useNavigate()
    //define state for from
    const [errors, setErros] = useState([])
    const [name, setName] = useState('')
    const [flag_status, setFlagStatus] = useState('')

    //fungsi "storestatus"
    const storeGood = async (e) => {
        e.preventDefault()

        //define formData
        const formData = new FormData()
        //append data to "formData"
        formData.append('flag_status', flag_status)
        formData.append('name', name)
        //sending data

        await Api.post('/admin/status', formData, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        })

            .then((response) => {
                if (response && response.data) {
                    console.log(response.data.success)

                    if (response.data.success === false) {
                        toast.error(response.data.message, {
                            position: 'top-right',
                            duration: 4000,
                        })
                    } else {
                        //show toast
                        toast.success(response.data.message, {
                            position: 'top-right',
                            duration: 4000,
                        })
                    }
                    navigate('/admin/status')

                    // Tutup modal
                    // //redirect
                    // navigate('/admin/posts')
                } else {
                    // Tangani kasus di mana response atau data tidak ada
                    console.error('Respon atau data tidak ada')
                }
            })
            .catch((error) => {
                // Tangani kesalahan dalam permintaan
                setErros(error.response.data)
            })

        // console.log(date_createds, shipper_account_id)
    }
    return (
        <LayoutAdmin>
            <main>
                <form onSubmit={storeGood}>
                    <div className="container-fluid mt-4">
                        <Link to="/admin/status" className="btn btn-orange rounded-4 text-white ">
                            Kembali
                        </Link>
                        <div className="card mt-3">
                            <div className="card-header">
                                {' '}
                                <h4 style={{ fontWeight: 'bold' }}>Status</h4>
                            </div>
                            <div className="car-body">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Name
                                            </label>
                                            <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                            {errors.name && <div className="alert alert-danger mt-2">{errors.name[0]}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Flag Status
                                            </label>
                                            <input type="text" className="form-control" placeholder="Flag Status" value={flag_status} onChange={(e) => setFlagStatus(e.target.value)} />
                                            {errors.flag_status && <div className="alert alert-danger mt-2">{errors.flag_status[0]}</div>}
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="d-flex justify-content-start">
                                            <button className="btn btn-primary rounded-4 me-3" type="sbumit">
                                                <i className="fa-regular fa-floppy-disk"></i> Submit
                                            </button>
                                            <button className="btn btn-navy rounded-4" type="button" style={{ color: 'white' }}>
                                                <i className="fa-solid fa-rectangle-xmark"></i> Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </LayoutAdmin>
    )
}
