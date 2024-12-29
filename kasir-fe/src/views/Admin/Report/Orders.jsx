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

export default function index() {
    //title page
    document.title = 'Report Order - KASIR'

    //define state "orders"
    const [orders, setOrders] = useState([])
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

        await Api.get('/admin/report-orders', {
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
            setOrders(response.data.data.data)
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
                                        <TbStatusChange size={25} className="me-2" /> <h5>Report Orders</h5>
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
                                                <th>Order Date</th>
                                                <th>Invoice</th>
                                                <th>Customer</th>
                                                <th>Kasir</th>
                                                <th>Total</th>
                                                <th>Disc</th>
                                                <th>Cash</th>
                                                <th>Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //cek apakah data ada
                                                orders.length > 0 ? (
                                                    //looping data "orders" dengan "map"
                                                    orders.map((order, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-bold text-center">{++index + (pagination.currentPage - 1) * pagination.perPage}</td>
                                                            <td>{order.created_at}</td>
                                                            <td>{order.invoice}</td>
                                                            <td>{order.customer.customer_name}</td>
                                                            <td>{order.user.name}</td>
                                                            <td>{formatPrice(order.grand_total)}</td>
                                                            <td>{formatPrice(order.disc ?? 0)}</td>
                                                            <td>{formatPrice(order.cash)}</td>
                                                            <td>{formatPrice(order.change)}</td>
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
