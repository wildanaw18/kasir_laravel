//import useState and useEffect
import { useState, useEffect } from 'react'

//import api
import Api from '../../../services/Api'
import { useLocation } from 'react-router-dom'
//import js cookie
import Cookies from 'js-cookie'

import '../../../../public/TransactionPrint.css'
import { formatPrice } from '../../../helper/MyHelper'

export default function index() {
    //title page
    document.title = 'Permissions - KASIR'

    //define state "permissions"
    const [invoice, setInvoice] = useState([])
    const [created_at, setCreatedAt] = useState([])
    const [shop, setShop] = useState([])
    const [user_name, setUser] = useState([])
    const [customer, setCustomer] = useState([])
    const [disc, setDisc] = useState([])
    const [cash, setCash] = useState([])
    const [grand_total, setGrandTotal] = useState([])
    const [change, setChange] = useState([])
    const [sum_price, setSumPrice] = useState([])
    const [phone, setPhone] = useState([])
    const [address, setAddress] = useState([])
    const [transactions, setTransactions] = useState([])

    //token from cookies
    const token = Cookies.get('token')

    // Function to parse the query string
    const parseQueryString = (queryString) => {
        const params = new URLSearchParams(queryString)
        const successParam = params.get('success')

        if (successParam) {
            try {
                // Parse the JSON-encoded string into a JavaScript object
                return JSON.parse(decodeURIComponent(successParam))
            } catch (error) {
                console.error('Error parsing success data:', error)
                return null
            }
        }

        return null
    }

    // Extract and parse the success parameter from the URL
    const successData = parseQueryString(location.search)
    //function fetchData
    const fetchData = async () => {
        await Api.get(`/admin/transaction-print/${successData}`, {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "permissions"
            setInvoice(response.data.data.invoice)
            setCreatedAt(response.data.data.created_at)
            setShop(response.data.data.shop.shop_name)
            setUser(response.data.data.user.name)
            setCustomer(response.data.data.customer.customer_name)
            setGrandTotal(response.data.data.grand_total)
            setDisc(response.data.data.disc)
            setCash(response.data.data.cash)
            setChange(response.data.data.change)
            setSumPrice(response.data.data.sub_total)
            setAddress(response.data.data.shop.address)
            setPhone(response.data.data.shop.phone)
        })
    }
    const fetchDataDetail = async () => {
        await Api.get(`/admin/transaction-print-detail/${successData}`, {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "permissions"
            console.log(response.data.data)
            setTransactions(response.data.data)
        })
    }

    //useEffect
    useEffect(() => {
        //call method "fetchdata"
        fetchData()
        fetchDataDetail()
    }, [])

    return (
        <main>
            <body>
                <div class="content">
                    <div class="title" style={{ paddingBottom: '13px' }}>
                        <div style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '15px' }}>{shop}</div>
                        <div style={{ textAlign: 'center' }}>Alamat: {address}</div>
                        <div style={{ textAlign: 'center' }}>Telp: {phone}</div>
                    </div>

                    <div class="separate-line" style={{ borderTop: '1px dashed #000', height: '1px', marginBottom: '5px' }}></div>
                    <table class="transaction-table" cellspacing="0" cellpadding="0">
                        <tr>
                            <td>TANGGAL</td>
                            <td>:</td>
                            <td>{created_at}</td>
                        </tr>
                        <tr>
                            <td>FAKTUR</td>
                            <td>:</td>
                            <td>{invoice}</td>
                        </tr>
                        <tr>
                            <td>KASIR</td>
                            <td>:</td>
                            <td>{user_name}</td>
                        </tr>
                        <tr>
                            <td>PEMBELI</td>
                            <td>:</td>
                            <td>{customer}</td>
                        </tr>
                    </table>

                    <div class="transaction">
                        <table class="transaction-table" cellspacing="0" cellpadding="0">
                            <tr class="price-tr">
                                <td colspan="3">
                                    <div class="separate-line" style={{ borderTop: '1px dashed #000' }}></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line" style={{ borderTop: '1px dashed #000' }}></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line" style={{ borderTop: '1px dashed #000' }}></div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>PRODUK</td>
                                <td style={{ textAlign: 'center' }}>QTY</td>
                                <td style={{ textAlign: 'right' }} colspan="5">
                                    HARGA
                                </td>
                            </tr>
                            <tr class="price-tr">
                                <td colspan="3">
                                    <div class="separate-line" style={{ borderTop: '1px dashed #000' }}></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line" style={{ borderTop: '1px dashed #000' }}></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line" style={{ borderTop: '1px dashed #000' }}></div>
                                </td>
                            </tr>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td class="name">{transaction.product.title}</td>
                                    <td class="qty" style={{ textAlign: 'center' }}>
                                        {transaction.qty}
                                    </td>
                                    <td class="final-price" style={{ textAlign: 'right' }} colspan="5">
                                        {formatPrice(transaction.price)}
                                    </td>
                                </tr>
                            ))}
                            <tr class="price-tr">
                                <td colspan="3">
                                    <div class="separate-line"></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line"></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" class="final-price">
                                    SUB TOTAL
                                </td>
                                <td colspan="3" class="final-price">
                                    :
                                </td>
                                <td class="final-price">{formatPrice(sum_price)}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="final-price">
                                    DISKON
                                </td>
                                <td colspan="3" class="final-price">
                                    :
                                </td>
                                <td class="final-price">{disc}</td>
                            </tr>

                            <tr class="discount-tr">
                                <td colspan="3">
                                    <div class="separate-line"></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line"></div>
                                </td>
                                <td colspan="3">
                                    <div class="separate-line"></div>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="3" class="final-price">
                                    TUNAI
                                </td>
                                <td colspan="3" class="final-price">
                                    :
                                </td>
                                <td class="final-price">{formatPrice(cash)}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="final-price">
                                    KEMBALI
                                </td>
                                <td colspan="3" class="final-price">
                                    :
                                </td>
                                <td class="final-price">{formatPrice(change)}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="thanks">=====================================</div>
                    <div class="azost" style={{ marginTop: '5px' }}>
                        TERIMA KASIH
                        <br />
                        ATAS KUNJUNGAN ANDA
                    </div>
                </div>
            </body>
        </main>
    )
}
