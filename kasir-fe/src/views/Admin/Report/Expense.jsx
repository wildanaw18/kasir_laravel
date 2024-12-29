//import useState and useEffect
import { useState, useEffect } from 'react'
//import Link from react router dom
import { Link } from 'react-router-dom'
//import api
import Api from '../../../services/Api'

//import js cookie
import Cookies from 'js-cookie'

//import layout
import LayoutAdmin from '../../../layouts/Admin'

//import pagination component
import Pagination from '../../../components/general/Pagination'

//import pagination component
import MyDataTable from '../../../components/general/ExDataTables'
import { TbStatusChange } from 'react-icons/tb'
import { formatPrice } from '../../../helper/MyHelper'
//import react-loading
import ReactLoading from 'react-loading'
import { GrSearch } from 'react-icons/gr'

export default function index() {
    //title page
    document.title = 'Sizes - KASIR'

    //define state "expenses"
    const [expenses, setExpense] = useState([])
    const [start_date, startDate] = useState([])
    const [end_date, endDate] = useState([])

    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    })

    //define state "keywords"
    const [keywords, setKeywords] = useState('')

    //token from cookies
    const token = Cookies.get('token')

    //function fetchData
    const fetchData = async (e) => {
        //define variable "page"

        await Api.get('/admin/report-expenses', {
            //header
            params: {
                start_date: start_date,
                end_date: end_date,
            },
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "status"
            setExpense(response.data.data.data)
            console.log(response.data.data.data)

            //set data pagination tos state "pagination"
            setPagination(() => ({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            }))
        })
    }

    //useEffect
    useEffect(() => {
        //call method "fetchdata"
        fetchData()
    }, [])

    //function "searchData"
    const searchData = async (e) => {
        //set value to state "keywords"
        setKeywords(e.target.value)

        //call method "fetchdata"
        fetchData(1, e.target.value)
    }
    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mt-3">
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-9 col-12 mb-2">
                                    <div className="input-group">
                                        <TbStatusChange size={25} className="me-2" /> <h5>Report Expenses</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-md-3">
                            <div className="card border-0 rounded shadow border-top-success">
                                <input type="date" className="form-control border-0 shadow-sm" value={start_date} onChange={(e) => startDate(e.target.value)} placeholder="Search Here.." />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-0 rounded shadow border-top-success">
                                <input type="date" className="form-control border-0 shadow-sm" value={end_date} onChange={(e) => endDate(e.target.value)} placeholder="Search Here.." />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-0 rounded shadow border-top-success">
                                <button className="btn btn-navy text-white" type="submit" onClick={fetchData}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow border-top-success">
                                <div className="card-body">
                                    <table className="table table-bordeless">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Expense Date</th>
                                                <th>Description</th>
                                                <th>Category</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //cek apakah data ada
                                                expenses.length > 0 ? (
                                                    //looping data "expenses" dengan "map"
                                                    expenses.map((expense, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-bold text-center">{++index + (pagination.currentPage - 1) * pagination.perPage}</td>
                                                            <td>{expense.expense_date}</td>
                                                            <td>{expense.desc}</td>
                                                            <td>{expense.category.name}</td>
                                                            <td>{formatPrice(expense.amount)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    //tampilkan pesan data belum tersedia
                                                    <tr>
                                                        <td colSpan={5}>
                                                            <center>
                                                                <p className="mt-4 text-danger">Data Not Found</p>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    )
}
