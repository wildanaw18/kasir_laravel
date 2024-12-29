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
import Info from '../../../components/general/Info'

export default function Booking() {
    //token from cookies
    const token = Cookies.get('token')
    //navigata
    const navigate = useNavigate()

    //master data

    const master = useMasterData(['category', 'unit', 'size'])

    //define state for from
    const [errors, setErros] = useState([])
    const [title, setTitle] = useState('')
    const [barcode, setBarcode] = useState('')
    const [stock, setStock] = useState('')
    const [buy_price, setBuyPrice] = useState('')
    const [sell_price, setSellPrice] = useState('')
    const [image, setImage] = useState('')
    const [category_id, setCategoryId] = useState('')
    const [unit_id, setUnitId] = useState('')
    const [size_id, setSizeId] = useState('')

    //fungsi "storestatus"
    const storeGood = async (e) => {
        e.preventDefault()

        //define formData
        const formData = new FormData()
        //append data to "formData"
        formData.append('barcode', barcode)
        formData.append('title', title)
        formData.append('stock', stock)
        formData.append('buy_price', buy_price)
        formData.append('sell_price', sell_price)
        formData.append('image', image)
        formData.append('size_id', size_id.value)
        formData.append('unit_id', unit_id.value)
        formData.append('category_id', category_id.value)
        //sending data

        await Api.post('/admin/products', formData, {
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
                    navigate('/admin/products')

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
                        <BackButton to="/admin/products" text="Kembali" />
                        <div className="card mt-3 shadow rounded">
                            <div className="card-header">
                                {' '}
                                <h4 style={{ fontWeight: 'bold' }}>Product</h4>
                            </div>
                            <div className="car-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Product Name
                                            </label>
                                            <input type="text" className="form-control" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            {errors.title && <div classtitle="alert alert-danger mt-2">{errors.title[0]}</div>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Barcode
                                            </label>
                                            <input type="text" className="form-control" placeholder="Code Barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                                            {errors.barcode && <div className="alert alert-danger mt-2">{errors.barcode[0]}</div>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Stock
                                            </label>
                                            <input type="text" className="form-control" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                                            {errors.stock && <div className="alert alert-danger mt-2">{errors.stock[0]}</div>}
                                        </div>
                                        {/* <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Users
                                            </label>
                                            <Select2 options={master?.user ?? []} selectedOption={category_id} setSelectedOption={setCategoryId} />
                                            {errors.barcode && <div className="alert alert-danger mt-2">{errors.barcode[0]}</div>}
                                        </div> */}
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Buy Price
                                            </label>
                                            <input type="text" className="form-control" placeholder="Buy Price" value={buy_price} onChange={(e) => setBuyPrice(e.target.value)} />
                                            {errors.buy_price && <div classtitle="alert alert-danger mt-2">{errors.buy_price[0]}</div>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Sell Price
                                            </label>
                                            <input type="text" className="form-control" placeholder="Sell Price" value={sell_price} onChange={(e) => setSellPrice(e.target.value)} />
                                            {errors.sell_price && <div className="alert alert-danger mt-2">{errors.sell_price[0]}</div>}
                                        </div>
                                        {/* <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Users
                                            </label>
                                            <Select2 options={master?.user ?? []} selectedOption={category_id} setSelectedOption={setCategoryId} />
                                            {errors.barcode && <div className="alert alert-danger mt-2">{errors.barcode[0]}</div>}
                                        </div> */}
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Image
                                            </label>
                                            <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                            {errors.image && <div className="alert alert-danger mt-2">{errors.image[0]}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Category
                                            </label>
                                            <Select2 options={master?.category ?? []} selectedOption={category_id} setSelectedOption={setCategoryId} />
                                            {errors.category_id && <div className="alert alert-danger mt-2">{errors.category_id[0]}</div>}
                                            <Info />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Size
                                            </label>
                                            <Select2 options={master?.size ?? []} selectedOption={size_id} setSelectedOption={setSizeId} />
                                            {errors.size_id && <div className="alert alert-danger mt-2">{errors.size_id[0]}</div>}
                                            <Info />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Unit
                                            </label>
                                            <Select2 options={master?.unit ?? []} selectedOption={unit_id} setSelectedOption={setUnitId} />
                                            {errors.unit_id && <div className="alert alert-danger mt-2">{errors.unit_id[0]}</div>}
                                            <Info />
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
