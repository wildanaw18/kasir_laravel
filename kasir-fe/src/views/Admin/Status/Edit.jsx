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
import { useNavigate, useParams } from 'react-router-dom'

export default function Booking() {
    const { id } = useParams()
    //token from cookies
    const token = Cookies.get('token')
    //navigata
    const navigate = useNavigate()
    //define state for from
    const [errors, setErros] = useState([])
    const [name, setName] = useState('')
    const [flag_status, setFlagStatus] = useState('')

    const fetchData = async () => {
        try {
            const response = await Api.get(`/admin/status/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Pastikan data response ada sebelum mengaksesnya
            if (response.data && response.data.data) {
                console.log(response.data.data)
                setName(response.data.data.name)
                setFlagStatus(response.data.data.flag_status)
            } else {
                console.error('Data response tidak valid')
            }
        } catch (error) {
            console.error('Terjadi kesalahan dalam pemanggilan API', error)
        }
    }

    //useEffect
    useEffect(() => {
        //call method "fetchdata"
        fetchData()
    }, [])

    //fungsi "updatestatus"
    const updateGood = async (e) => {
        e.preventDefault()

        await Api.post(
            `/admin/status/${id}`,
            {
                _method: 'PUT',
                // created_date: date_created,

                name: name,
                flag_status: flag_status,
            },
            {
                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
                    'content-type': 'multipart/form-data',
                },
            }
        )
            .then((response) => {
                console.log(response)
                if (response && response.data) {
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

                    fetchData()

                    // Tutup modal
                    // //redirect
                    navigate('/admin/status')
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
                <form onSubmit={updateGood}>
                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <h1 style={{ color: '#FA2166', fontWeight: 'bold' }}>status</h1>
                                <h5 style={{ fontWeight: 'bold' }}>Air Consignment Note (Surat Muatan Udara)</h5>
                            </div>
                            <div className="col-md-6">
                                <div className="row mt-3">
                                    <div className="d-flex justify-content-end">
                                        <div className="col-md-12">
                                            {/* <label className="form-label fw-bold">Date Created</label> */}
                                            {/* <input type="text" value={date_created} onChange={(e) => setDateCreated(e.target.value)} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" /> */}

                                            {/* <ReactDatepicker selectedDate={date_created} setSelectedDate={setDateCreated} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-2">
                                <div className="bg-skyinfo p-2"></div>
                            </div>
                        </div>
                        <div className="card mt-3">
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
                                            <button className="btn btn-primary rounded-pill me-3" type="sbumit">
                                                <i className="fa-regular fa-floppy-disk"></i> Submit
                                            </button>
                                            <button className="btn btn-navy rounded-pill" type="button" style={{ color: 'white' }}>
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
