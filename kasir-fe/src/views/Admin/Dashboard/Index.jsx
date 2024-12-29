//import hook
import { useState, useEffect } from 'react'

//import layout
import LayoutAdmin from '../../../layouts/Admin'

//import service api
import Api from '../../../services/Api'

//import js cookie
import Cookies from 'js-cookie'

//import Link
import { Link } from 'react-router-dom'
import { formatPrice } from '../../../helper/MyHelper'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import PieChart from '../../../components/general/Pie'
import BarChart from '../../../components/general/Bar'

export default function Dashboard() {
    //title page
    document.title = 'Dashboard - KASIR'

    //init state
    const [data_dashboard, setDataDashboard] = useState(0)
    const [products, setProducts] = useState('')
    const [product_best_sellers, setProductBestSeller] = useState('')
    const [transaction_date, setTransactionDate] = useState([])
    const [income_total, setIncomeTotal] = useState(0)
    const [expense_date, setExpenseDate] = useState([])
    const [expense_total, setExpenseTotal] = useState(0)
    const [transaction_income, setTransactionIncome] = useState(0)
    const [transaction_expend, setTransactionExpend] = useState(0)

    //token from cookies
    const token = Cookies.get('token')

    // //hook useEffect
    useEffect(() => {
        //fetch api
        Api.get('/admin/dashboard', {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data
            setDataDashboard(response.data.data[0])
        })
    }, [])
    //function fetchData
    const fetchData = async (pageNumber = 1, keywords = '') => {
        await Api.get('/admin/product-stock-minus', {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "status"
            setProducts(response.data.data)
        })
    }
    //function bestSeller
    const fetchDataBestSeller = async (pageNumber = 1, keywords = '') => {
        await Api.get('/admin/product-best-seller', {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "status"
            setProductBestSeller(response.data.data)
            console.log(response.data.data)
        })
    }
    const fetchDataBar = async (pageNumber = 1, keywords = '') => {
        await Api.get('/admin/dashboard/bar-chart', {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "status"
            setTransactionDate(response.data.data[0])
            setIncomeTotal(response.data.data[1])
            setTransactionExpend(response.data.data[2])
            setTransactionIncome(response.data.data[3])
            setExpenseDate(response.data.data[4])
            setExpenseTotal(response.data.data[5])
        })
    }

    //useEffect
    useEffect(() => {
        //call method "fetchdata"
        fetchData()
        fetchDataBar()
        fetchDataBestSeller()
    }, [])
    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid px-4 mt-5">
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card mb-2 bg-box-2 border-0 shadow-sm">
                                <div className="card-body text-white" style={{ fontSize: '14px' }}>
                                    <FaMoneyBillTransfer size={20} className="me-1 " />
                                    TODAY SELL AMOUNT
                                    <br />
                                    <h4 className="mt-2 text-warning">{formatPrice(data_dashboard.sell_amount) ?? 0}</h4>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="large text-light  stretched-link" to="#">
                                        View Details
                                    </Link>
                                    <div className="large ">
                                        <i className="fas fa-angle-right text-light"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-box-2  mb-4 border-0 shadow-sm">
                                <div className="card-body text-white" style={{ fontSize: '14px' }}>
                                    <FaMoneyBillTransfer size={20} className="me-1 " />
                                    SALES
                                    <br />
                                    <h4 className="mt-2 text-warning">{formatPrice(data_dashboard.grand_total) ?? 0}</h4>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="large text-light  stretched-link" to="#">
                                        View Details
                                    </Link>
                                    <div className="large ">
                                        <i className="fas fa-angle-right text-light"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card  bg-box-2 mb-4 border-0 shadow-sm">
                                <div className="card-body text-white" style={{ fontSize: '14px' }}>
                                    <FaMoneyBillTransfer size={20} className="me-1 " />
                                    INCOME
                                    <br />
                                    <h4 className="mt-2 text-warning">{formatPrice(data_dashboard.income) ?? 0}</h4>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="large text-light stretched-link" to="#">
                                        View Details
                                    </Link>
                                    <div className="large ">
                                        <i className="fas fa-angle-right text-light"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-box-2 mb-4 border-0 shadow-sm">
                                <div className="card-body text-white" style={{ fontSize: '14px' }}>
                                    <FaMoneyBillTransfer size={20} className="me-1 " />
                                    EXPENSE
                                    <br />
                                    <h4 className="mt-2 text-warning">{formatPrice(data_dashboard.expense) ?? 0}</h4>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link className="large text-light stretched-link" to="#">
                                        View Details
                                    </Link>
                                    <div className="large ">
                                        <i className="fas fa-angle-right text-light"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-4 mt-3">
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="card shadow-3 rounded-3">
                                <div className="card-header">
                                    <p>
                                        <h5>Sales</h5>
                                    </p>
                                </div>
                                <div className="card-body card">
                                    <BarChart labels={transaction_date} income_total={income_total} label_name={'Sales'} bg_color={'green'} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card shadow-3 rounded-3">
                                <div className="card-header">
                                    <p>
                                        <h5>Expenditure</h5>
                                    </p>
                                </div>
                                <div className="card-body card">
                                    <BarChart labels={expense_date} income_total={expense_total} label_name={'Expenditure'} bg_color={'navy'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid px-4 mt-3">
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div className="card shadow-3  rounded-3">
                                <div className="card-header">
                                    <h5>Sales VS Expenditure</h5>
                                </div>
                                <div className="card-body">
                                    <PieChart transaction_income={transaction_income} transaction_expend={transaction_expend} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card border-0 rounded shadow border-top-success">
                                <div className="card-header">
                                    <h5>Out Of Stock</h5>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordeless">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //cek apakah data ada
                                                products.length > 0 ? (
                                                    //looping data "products" dengan "map"
                                                    products.map((product, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-bold text-center">{++index}</td>
                                                            <td>{product.title}</td>
                                                            <td>{formatPrice(product.stock)}</td>
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
                <div className="container-fluid px-4 mt-3">
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow border-top-success">
                                <div className="card-header">
                                    <h5>Best Seller Product</h5>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordeless">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //cek apakah data ada
                                                product_best_sellers.length > 0 ? (
                                                    //looping data "products" dengan "map"
                                                    product_best_sellers.map((bs_product, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-bold text-center">{++index}</td>
                                                            <td>{bs_product.product.title}</td>
                                                            <td>{formatPrice(bs_product.total)}</td>
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
