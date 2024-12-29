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
import Select2 from '../../../components/general/ReactSelect2'
import { useMasterData } from '../../../components/general/UseMasterData'

export default function Booking() {
    //token from cookies
    const token = Cookies.get('token')
    //navigata
    const navigate = useNavigate()

    //master data

    const master = useMasterData(['group'])

    //define state for from
    const [errors, setErros] = useState([])
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [group_id, setGroupId] = useState('')

    //fungsi "storestatus"
    const storeGood = async (e) => {
        e.preventDefault()

        //define formData
        const formData = new FormData()
        //append data to "formData"
        formData.append('name', name)
        formData.append('desc', desc)
        formData.append('group_id', group_id.value)
        //sending data

        await Api.post('/admin/categories', formData, {
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
                    navigate('/admin/categories')

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
                        <Link to="/admin/categories" className="btn btn-orange rounded-4 text-white ">
                            Kembali
                        </Link>
                        <div className="card mt-3 shadow rounded">
                            <div className="card-header">
                                {' '}
                                <h4 style={{ fontWeight: 'bold' }}>Categories</h4>
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
                                        <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                            Group
                                        </label>
                                        <Select2 options={master?.group ?? []} selectedOption={group_id} setSelectedOption={setGroupId} />
                                        {errors.group_id && <div className="alert alert-danger mt-2">{errors.group_id[0]}</div>}
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                desc
                                            </label>
                                            <input type="text" className="form-control" placeholder="Deskripsi" value={desc} onChange={(e) => setDesc(e.target.value)} />
                                            {errors.desc && <div className="alert alert-danger mt-2">{errors.desc[0]}</div>}
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
