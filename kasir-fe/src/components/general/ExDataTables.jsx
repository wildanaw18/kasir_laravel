import React, { useState, useEffect } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
//import js cookie
import Cookies from 'js-cookie'
//import api
import Api from '../../services/Api'
//import react-loading
import ClipLoader from 'react-spinners/ClipLoader'
import LoadingTable from './Loading'

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
}

function MyDataTable(props) {
    // console.log(props.searchData)
    let [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    let [color, setColor] = useState('#ffffff')
    const [isLoading, setIsLoading] = useState(true)

    const { auth, onSelected, className, selectedRow, filter, onRowClick } = props

    const [data, setData] = useState({ data: [], total: 0 })
    const [colom, setColom] = useState(props.columns)
    // const [search, setSearch] = useState(props.searchData)
    const [page, setPage] = useState(1)
    const countPerPage = 5
    const token = Cookies.get('token')
    const params = {
        start_date: props.start_date,
        end_date: props.end_date,
        pay_type_id: props.pay_type_id ? props.pay_type_id.value : '',
        shipper_account_number: props.shipper_account_id ? props.shipper_account_id.value : '',
        airport_departure_id: props.airport_departure_id ? props.airport_departure_id.value : '',
    }

    const getList = async () => {
        const response = Api.get(`${props.url}?page=${page}&per_page=${countPerPage}&delay=1&search=${props.searchData ?? ''}`, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            // console.log(response)
            //set data response to satate "permissions"

            setData(response.data.data)
        })
    }

    const setPages = () => {
        const seter_page = props.pages ?? 1
        setPage(seter_page)
    }
    useEffect(() => {
        setLoaded(true)
    }, [])
    useEffect(() => {
        fetchDataFromServer().then((result) => {
            setTimeout(() => {
                loaded && getList()
                setIsLoading(false) // Set isLoading ke false setelah data diambil
                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 500)
        })
    }, [loaded, page, props.searchData, props.refresh, props.start_date, props.end_date, props.pay_type_id?.value, props.shipper_account_id?.value, props.airport_departure_id?.value])

    const fetchDataFromServer = async () => {
        // Simulasikan pengambilan data dari server
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    /* data dari server */
                ])
            }, 10) // Simulasi 2 detik untuk pengambilan data
        })
    }

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#0f172a', // Ganti warna latar belakang sesuai kebutuhan Anda
                color: 'white', // Ganti warna teks jika diperlukan
            },
        },
        rows: {
            style: {
                textAlign: 'center', // override the row height
            },
        },
    }

    createTheme('custom', {
        background: {
            default: 'transparent',
        },
    })

    return (
        <>
            {isLoading ? (
                <div>
                    <LoadingTable />
                </div>
            ) : (
                <DataTable columns={props.columns} data={data.data} customStyles={customStyles} noHeader pagination paginationServer paginationTotalRows={data.total} paginationPerPage={countPerPage} onRowClicked={onRowClick} highlightOnHover pointerOnHover onChangePage={(rows) => setPage(rows)} />
            )}{' '}
            {/* <DataTable
        //     title=""
        //     columns={columns}
        //     data={data}
        //     theme="custom" // Gunakan tema yang telah Anda buat
        //     customStyles={customStyles}
        //     pagination
        //     highlightOnHover
        // /> */}
        </>
    )
}
export default MyDataTable
