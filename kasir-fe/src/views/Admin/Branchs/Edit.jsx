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
import { Link } from 'react-router-dom'
import Select2 from '../../../components/general/ReactSelect2'
import { useMasterData } from '../../../components/general/UseMasterData'

export default function Booking() {
    const { id } = useParams()
    //token from cookies
    const token = Cookies.get('token')
    //navigata
    const navigate = useNavigate()

    const master = useMasterData(['city'])

    //define state for from
    const [errors, setErros] = useState([])
    const [branch_name, setBranchName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCityId] = useState('')

    const fetchData = async () => {
        try {
            const response = await Api.get(`/admin/branchs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Pastikan data response ada sebelum mengaksesnya
            if (response.data && response.data.data) {
                console.log(response.data.data)
                setBranchName(response.data.data.branch_name)
                setCityId
                if (response.data.data && response.data.data.city_id) {
                    setCityId({
                        label: response.data.data.city.city_name,
                        value: response.data.data.city_id,
                    })
                }
                setAddress(response.data.data.address)
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
    const updateBranch = async (e) => {
        e.preventDefault()

        await Api.post(
            `/admin/branchs/${id}`,
            {
                _method: 'PUT',
                // created_date: date_created,

                branch_name: branch_name,
                address: address,
                city_id: city.value,
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
                    navigate('/admin/branchs')
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
                <form onSubmit={updateBranch}>
                    <div className="container-fluid mt-4">
                        <Link to="/admin/branchs" className="btn btn-orange rounded-4 text-white ">
                            Kembali
                        </Link>
                        <div className="card mt-3 shadow rounded">
                            <div className="card-header">
                                {' '}
                                <h4 style={{ fontWeight: 'bold' }}>Branchs</h4>
                            </div>
                            <div className="car-body">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Branch Name
                                            </label>
                                            <input type="text" className="form-control" placeholder="Branch Name" value={branch_name} onChange={(e) => setBranchName(e.target.value)} />
                                            {errors.name && <div className="alert alert-danger mt-2">{errors.name[0]}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                            City
                                        </label>
                                        <Select2 typeSelect="edit" options={master?.city ?? []} selectedOption={city} setSelectedOption={setCityId} />
                                        {errors.city && <div className="alert alert-danger mt-2">{errors.city[0]}</div>}
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Address
                                            </label>
                                            <input type="text" className="form-control" placeholder="Deskripsi" value={address} onChange={(e) => setAddress(e.target.value)} />
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
