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

    const master = useMasterData(['category_expenses'])

    //define state for from
    const [errors, setErros] = useState([])
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    const [category_id, setCategoryId] = useState('')
    const [expense_date, setExpenseDate] = useState('')

    const fetchData = async () => {
        try {
            const response = await Api.get(`/admin/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Pastikan data response ada sebelum mengaksesnya
            if (response.data && response.data.data) {
                console.log(response.data.data)
                setAmount(response.data.data.amount)
                setDesc(response.data.data.desc)
                setExpenseDate(response.data.data.expense_date)
                setCategoryId
                if (response.data.data && response.data.data.category_id) {
                    setCategoryId({
                        label: response.data.data.category.name,
                        value: response.data.data.category_id,
                    })
                }
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
    const updateExpense = async (e) => {
        e.preventDefault()

        await Api.post(
            `/admin/expenses/${id}`,
            {
                _method: 'PUT',
                // created_date: date_created,

                amount: amount,
                desc: desc,
                category_id: category_id.value,
                expense_date: expense_date,
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
                    navigate('/admin/expenses')
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
                <form onSubmit={updateExpense}>
                    <div className="container-fluid mt-4">
                        <Link to="/admin/expenses" className="btn btn-orange rounded-4 text-white ">
                            Kembali
                        </Link>
                        <div className="card mt-3 shadow rounded">
                            <div className="card-header">
                                {' '}
                                <h4 style={{ fontWeight: 'bold' }}>Expenses</h4>
                            </div>
                            <div className="car-body">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Description
                                            </label>
                                            <input type="text" className="form-control" placeholder="Deskripsi" value={desc} onChange={(e) => setDesc(e.target.value)} />
                                            {errors.desc && <div className="alert alert-danger mt-2">{errors.desc[0]}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Expense Date
                                            </label>
                                            <input type="date" className="form-control" placeholder="Deskripsi" value={expense_date} onChange={(e) => setExpenseDate(e.target.value)} />
                                            {errors.expense_date && <div className="alert alert-danger mt-2">{errors.expense_date[0]}</div>}
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                            Category
                                        </label>
                                        <Select2 options={master?.category_expenses ?? []} typeSelect="edit" selectedOption={category_id} setSelectedOption={setCategoryId} />
                                        {errors.category_id && <div className="alert alert-danger mt-2">{errors.category_id[0]}</div>}
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-12">
                                            <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Amount
                                            </label>
                                            <input type="text" className="form-control" placeholder="Name" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                            {errors.amount && <div className="alert alert-danger mt-2">{errors.amount[0]}</div>}
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
