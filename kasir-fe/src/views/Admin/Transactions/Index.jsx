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
import { formatPrice } from '../../../helper/MyHelper'
import { TbStatusChange } from 'react-icons/tb'
import { useMasterData } from '../../../components/general/UseMasterData'
//import react-loading
import ReactLoading from 'react-loading'
import { GrSearch } from 'react-icons/gr'
import Info from '../../../components/general/Info'
import Select2 from '../../../components/general/ReactSelect2'
import { MdPayment } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
//import toast
import toast from 'react-hot-toast'
export default function index() {
    //title page
    document.title = 'Units - KASIR'

    const master = useMasterData(['customers', 'category', 'cart_sum'])
    //disable button
    const [isButtonDisabled, setIsButtonDisabled] = useState()

    //define state "keywords"
    const [keywords, setKeywords] = useState('')
    const [errors, setErros] = useState([])

    const [units, setUnits] = useState([])
    const [customer_id, setCustomerId] = useState('')
    const [category_id, setCategoryId] = useState([])
    //define state "products"
    const [products, setProducts] = useState([])
    const [carts, setCarts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)

    //cart temp
    const [qty, setQty] = useState(1)
    const [product_id, setProductId] = useState([])
    const [sell_price, setSellPrice] = useState([])
    const [sum_price, setSumPrice] = useState()
    const [disc, setDisc] = useState(0)
    const [ppn, setPpn] = useState(0)
    const [sum_all, setSumAll] = useState()
    const [changes, setChange] = useState(0)
    const [cash, setCash] = useState(0)
    const [data_success, setDataSuccess] = useState(0)

    //token from cookies
    const token = Cookies.get('token')

    const [show, setShow] = useState(false)

    const handleShow = (product) => {
        setSelectedProduct(product)
        setProductId(product.id)
        setSellPrice(product.sell_price)
        setShow(true)
    }

    const handleClose = () => {
        setSelectedProduct(null)
        setShow(false)
    }

    const handleSelectChange = (selectedOption) => {
        setCategoryId(selectedOption.value)
    }

    //function "searchData"
    const searchData = async (e) => {
        //set value to state "keywords"
        setKeywords(e.target.value)
    }
    //useEffect

    useEffect(() => {
        console.log(keywords)
        setCategoryId(category_id)
        fetchData(1, category_id, keywords)
        fetchDataCartSum()
        fetchDataCart()
    }, [category_id, keywords])

    //function fetchData
    const fetchData = async (pageNumber = 1, category_id = '', keywords = '') => {
        // Define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage

        await Api.get(`/admin/products?search=${category_id}&page=${page}&keywords=${keywords}`, {
            // Header
            headers: {
                // Header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            // Set data response to state "products"
            setProducts(response.data.data.data)
            console.log(response.data.data.data)
            // Set data pagination to state "pagination"
            setPagination(() => ({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            }))
        })
    }

    //function fetchData
    const fetchDataCart = async () => {
        //define variable "page"

        await Api.get('/admin/carts', {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "products"

            setCarts(response.data.data)
        })
    }
    const fetchDataCartSum = async () => {
        //define variable "page"

        await Api.get('/admin/cart-sums', {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "products"

            setSumPrice(response.data.data)
        })
    }

    //delete cart
    const deleteCustRate = async (id) => {
        await Api.delete(`/admin/carts/${id}`, {
            headers: {
                //header Bearer + token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //show toast
            toast.success(response.data.message, {
                position: 'top-right',
                duration: 4000,
            })

            //call function "fetchData"
            fetchDataCart()
            fetchDataCartSum()
        })
    }
    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    })

    //fungsi "storestatus"
    const handleSubmitCart = async (e) => {
        e.preventDefault()

        //define formData
        const formData = new FormData()
        //append data to "formData"
        formData.append('qty', qty)
        formData.append('product_id', product_id)
        formData.append('sell_price', sell_price)
        //sending data

        await Api.post('/admin/carts', formData, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        })

            .then((response) => {
                if (response && response.data) {
                    console.log(response.data)

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
                        setQty(1)
                        setShow(false)
                        fetchDataCart()
                        fetchDataCartSum()
                    }

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
    //print
    const openPrintPopup = (successValue) => {
        // Buka popup window print di sini
        window.open(`/admin/transaction/print?success=${successValue}`, 'Print Window', 'width=300,height=400')
    }
    //fungsi "Store transaction"
    const handleSubmitTransaction = async (e) => {
        e.preventDefault()

        //define formData
        const formData = new FormData()
        //append data to "formData"
        formData.append('disc', disc)
        formData.append('ppn', ppn)
        formData.append('sum_price', sum_price)
        formData.append('sum_all', sum_all)
        formData.append('customer_id', customer_id.value)
        formData.append('cash', cash)
        formData.append('change', changes)
        //sending data

        await Api.post('/admin/transactions', formData, {
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
                        setQty(1)
                        setShow(false)
                        fetchDataCart()
                        fetchDataCartSum()
                        const successValueString = JSON.stringify(response.data.data.invoice)
                        openPrintPopup(successValueString)
                        setCash(0)
                    }

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
    //useEffect

    useEffect(() => {
        //call method "fetchdata"

        const sum_prices = parseInt(sum_price) - parseInt(disc) + parseInt(ppn)

        if (cash == 0) {
            const change = 0
            setChange(change)
        } else {
            const change = parseInt(sum_prices) - parseInt(cash)
            setChange(change)
        }

        if (parseInt(cash) >= parseInt(sum_price)) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }

        setSumAll(sum_prices)
    }, [ppn, disc, sum_price, cash])

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-3 col-12 ">
                                    <div className="input-group mt-1">
                                        <TbStatusChange size={25} className="me-2" /> <h5>Point of Sale</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 col-12 ">
                                    <div className="input-group mt-1">
                                        <input type="text" className="form-control border-0 shadow-sm" onChange={(e) => searchData(e)} placeholder="Search Here.." />
                                    </div>
                                </div>
                                <div className="col-md-3 mt-1">
                                    <div className="col-md-12">
                                        <Select2 placeholder="Pilih Category" options={[{ value: '', label: 'All' }, ...(master?.category ?? [])]} selectedOption={category_id} setSelectedOption={handleSelectChange} />
                                    </div>
                                </div>
                                <div className="col-md-3 mt-1">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                                Total Bayar : <MdPayment size={20} /> {sum_all}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row mt-1">
                                {products.map((product, index) => (
                                    <div className={`col-md-3 col-12 mt-1 ${product.stock === 0 ? 'disabled' : ''}`} key={index}>
                                        <span onClick={() => (product.stock > 0 ? handleShow(product) : setShow(false))}>
                                            <div className="card" style={{ width: '100%', maxWidth: '20rem', position: 'relative' }}>
                                                <span style={{ position: 'absolute', top: '5px', right: '5px', padding: '5px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}>{product.size.name}</span>
                                                <img src={product.image} className="card-img-top p-2 rounded-4" alt="..." style={{ height: '150px' }} />
                                                <div className="card-body">
                                                    <p className="card-text text-center" style={{ fontSize: 14 }}>
                                                        <strong>
                                                            {product.title}
                                                            <br /> <span className={`badge  p-1 ${product.stock === 0 ? 'bg-danger' : 'bg-warning'}`}>{product.stock}</span>
                                                            <br />
                                                            <span>{formatPrice(product.sell_price)}</span>
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Pagination currentPage={pagination.currentPage} perPage={pagination.perPage} total={pagination.total} onChange={(pageNumber) => fetchData(pageNumber, keywords)} position="center" />
                        </div>

                        <div className="col-md-3">
                            <div className="mt-2">
                                <div className="card  card-bordered shadow-1">
                                    <div className="card-body">
                                        <table className="table table-sm table-borderless">
                                            <tbody style={{ fontSize: 13 }}>
                                                {carts.length > 0 ? (
                                                    //looping data "carts" dengan "map"
                                                    carts.map((cart, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <span
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        deleteCustRate(cart.id)
                                                                    }}
                                                                >
                                                                    <i className="fa fa-x text-danger me-1"></i>
                                                                </span>
                                                                {''}
                                                                {cart.product.title}
                                                            </td>
                                                            <td>x{cart.qty}</td>
                                                            <td>{formatPrice(cart.price)}K</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    //tampilkan pesan data belum tersedia
                                                    <tr>
                                                        <td colSpan={3}>
                                                            <center>
                                                                <p className="text-danger">Data Not Found</p>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            <tr>
                                                <td colSpan="3">
                                                    {/* Menggunakan colSpan untuk membuat satu sel yang memenuhi dua kolom */}
                                                    <hr style={{ borderTop: '1px solid #000000' }} /> {/* Menambahkan garis horizontal menggunakan border CSS */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Sub Total</strong>
                                                </td>
                                                <td></td>
                                                <td style={{ fontWeight: 'bold', fontSize: 13 }}>{formatPrice(sum_price)}K</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="card card-bordered shadow-1">
                                    <div className="card-body">
                                        <table className="table table-sm table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <strong>Disc</strong>
                                                    </td>
                                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                                        <input type="text" className="form-control form-control-sm" value={disc} onChange={(e) => setDisc(e.target.value)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Ppn</strong>
                                                    </td>
                                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                                        {' '}
                                                        <input type="text" className="form-control form-control-sm text-right" value={ppn} onChange={(e) => setPpn(e.target.value)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">
                                                        {/* Menggunakan colSpan untuk membuat satu sel yang memenuhi dua kolom */}
                                                        <hr style={{ borderTop: '1px solid #000000' }} /> {/* Menambahkan garis horizontal menggunakan border CSS */}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Customer</strong>
                                                    </td>
                                                    <td>
                                                        <Select2 placeholder="Pilih Customers" options={master?.customers ?? []} selectedOption={customer_id} setSelectedOption={setCustomerId} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Bayar</strong>
                                                    </td>
                                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                                        <input type="number" className="form-control form-control-sm" value={cash} onChange={(e) => setCash(e.target.value)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Kembalian</strong>
                                                    </td>
                                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                                        <button className="btn btn-navy btn-md text-white" style={{ width: '100%' }}>
                                                            <MdPayment size={20} /> {formatPrice(changes)}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-outline-secondary btn-md" style={{ width: '45%' }}>
                                        Clear Item
                                    </button>
                                    <button className="btn btn-primary btn-md" style={{ width: '45%' }} onClick={handleSubmitTransaction} disabled={isButtonDisabled}>
                                        <MdPayment size={20} /> Bayar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>{selectedProduct && <Modal.Title> {selectedProduct.title} </Modal.Title>}</Modal.Header>
                <Modal.Body>
                    {/* Use selectedProduct to display details */}
                    {selectedProduct && (
                        <div className="form-group">
                            <label htmlFor="">Qty</label>
                            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} className="form-control mt-2" placeholder="qty" />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCart}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </LayoutAdmin>
    )
}
