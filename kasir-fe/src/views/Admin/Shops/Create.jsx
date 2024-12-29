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
import BackButton from '../../../components/general/BackButton'

import Select2 from '../../../components/general/ReactSelect2'
import { useMasterData } from '../../../components/general/UseMasterData'

export default function Booking() {
    //token from cookies
    const token = Cookies.get('token')
    //navigata
    const navigate = useNavigate()

    //master data

    const master = useMasterData(['user'])

    //define state for from
    const [errors, setErros] = useState([])
    const [shop_name, setShopName] = useState('')
    const [header_inv, setHeaderInv] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [owner_name, setOwnerName] = useState('')
    const [user_id, setUserId] = useState('')

    //fungsi "storestatus"
    const storeGood = async (e) => {
        e.preventDefault()

        //define formData
        const formData = new FormData()
        //append data to "formData"
        formData.append('header_inv', header_inv)
        formData.append('shop_name', shop_name)
        formData.append('address', address)
        formData.append('phone', phone)
        formData.append('image', image)
        formData.append('owner_name', owner_name)
        formData.append('user_id', user_id.value)
        //sending data

        await Api.post('/admin/shops', formData, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data',
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
                    navigate('/admin/shops')

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
                        <BackButton to="/admin/shops" text="Kembali" />
                        <div className="card mt-3 shadow rounded">
                            <div className="card-header">
                                {' '}
                                <h4 style={{ fontWeight: 'bold' }}>Shops</h4>
                            </div>
                            <div className="car-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Shop Name
                                            </label>
                                            <input type="text" className="form-control" placeholder="Name" value={shop_name} onChange={(e) => setShopName(e.target.value)} />
                                            {errors.name && <div className="alert alert-danger mt-2">{errors.name[0]}</div>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Header Invoice
                                            </label>
                                            <input type="text" className="form-control" placeholder="Header Invoice" value={header_inv} onChange={(e) => setHeaderInv(e.target.value)} />
                                            {errors.header_inv && <div className="alert alert-danger mt-2">{errors.header_inv[0]}</div>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Users
                                            </label>
                                            <Select2 options={master?.user ?? []} selectedOption={user_id} setSelectedOption={setUserId} />
                                            {errors.header_inv && <div className="alert alert-danger mt-2">{errors.header_inv[0]}</div>}
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Phone
                                            </label>
                                            <input type="number" className="form-control" placeholder="Header Invoice" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            {errors.phone && <div className="alert alert-danger mt-2">{errors.phone[0]}</div>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Owner Name
                                            </label>
                                            <input type="text" className="form-control" placeholder="Owner Name" value={owner_name} onChange={(e) => setOwnerName(e.target.value)} />
                                            {errors.owner_name && <div className="alert alert-danger mt-2">{errors.owner_name[0]}</div>}
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Logo
                                            </label>
                                            <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                            {errors.image && <div className="alert alert-danger mt-2">{errors.image[0]}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Address
                                            </label>
                                            <textarea type="text" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            {errors.address && <div className="alert alert-danger mt-2">{errors.address[0]}</div>}
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
