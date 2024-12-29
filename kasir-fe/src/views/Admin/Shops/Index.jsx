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
//import react-loading
import ReactLoading from 'react-loading'
import { GrSearch } from 'react-icons/gr'

export default function index() {
    //title page
    document.title = 'shops - KASIR'

    //define state "permissions"
    const [shops, setShops] = useState([])

    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    })
    // const columns = [
    //     {
    //         name: 'ID',
    //         selector: 'id',
    //
    //     },
    //     {
    //         name: 'Name',
    //         selector: 'name',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Age',
    //         selector: 'age',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Action',
    //         selector: 'age',
    //         sortable: true,
    //     },
    // ]

    const columns = [
        {
            name: 'No',
            selector: (row) => row.no, // Use a selector function

            sortField: 'director',
        },
        {
            name: 'Shop Name',
            selector: (row) => row.shop_name, // Use a selector function

            sortField: 'director',
        },
        {
            name: 'Logo',
            selector: (row) => (
                <img
                    src={row.image} // Gantilah dengan path atau URL yang benar sesuai dengan struktur data Anda
                    alt="Logo"
                    style={{ maxWidth: '100%', maxHeight: '100px' }} // Sesuaikan dengan kebutuhan Anda
                />
            ),
            sortField: 'director',
        },
        {
            name: 'Address',
            selector: (row) => row.address, // Use a selector function

            sortField: 'director',
        },
        {
            name: 'Phone',
            selector: (row) => row.phone, // Use a selector function

            sortField: 'director',
        },
        {
            name: 'Owner',
            selector: (row) => row.owner_name, // Use a selector function

            sortField: 'director',
        },
        {
            name: 'Users',
            selector: (row) => row.user.name, // Use a selector function

            sortField: 'director',
        },
        {
            name: 'Header Inv',
            selector: (row) => row.header_inv, // Use a selector function

            sortField: 'director',
        },

        {
            name: 'Actions',
            cell: (row) => (
                // <div>
                //     <Link to={`/admin/status/edit/${row.id}`} className="btn btn-primary btn-sm me-2">
                //         <i className="fa fa-pencil-alt"></i> Edit
                //     </Link>
                // </div>

                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Action
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to={`/admin/shops/edit/${row.id}`} className=" dropdown-item">
                                <i className="fa fa-pencil-alt"></i> Edit
                            </Link>
                        </li>
                        {/* <li>
                            <Link to={`/admin/customer-rates/${row.account_no}`} className=" dropdown-item">
                                <i className="fa fa-view-alt"></i> View Rates
                            </Link>
                        </li> */}
                    </ul>
                </div>
            ),
        },
    ]

    //define state "keywords"
    const [keywords, setKeywords] = useState('')

    //token from cookies
    const token = Cookies.get('token')

    //function fetchData
    const fetchData = async (pageNumber = 1, keywords = '') => {
        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage

        await Api.get(`/admin/shops?search=${keywords}&page=${page}`, {
            //header
            headers: {
                //header bearer + token
                Authorization: `Bearer ${token},`,
            },
        }).then((response) => {
            //set data response to satate "status"
            setShops(response.data.data.data)

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
                                        <TbStatusChange size={25} className="me-2" /> <h5>Shops</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow border-top-success">
                                <div className="row">
                                    <div className="col-md-8 ">
                                        {' '}
                                        <div className="container-fluid">
                                            <Link to="/admin/shops/create" className="btn btn-md btn-primary border-0 shadow-sm rounded-4 mt-3" type="button">
                                                {' '}
                                                <i className="fa-solid fa-circle-plus"></i> <span className="fw-bold">New Shop</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="input-group mb-3 container-fluid mt-3 ">
                                            <input type="text" className="form-control border-0 shadow-sm" onChange={(e) => searchData(e)} placeholder="Search Here.." aria-describedby="basic-addon1" />
                                            <span className="input-group-text " id="basic-addon1">
                                                <GrSearch />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div style={{ borderRadius: '10px', overflow: 'hidden', fontSize: 14 }}>
                                            <MyDataTable url={'/admin/shops'} columns={columns} searchData={keywords} />
                                        </div>
                                    </div>
                                    {/* <Pagination currentPage={pagination.currentPage} perPage={pagination.perPage} total={pagination.total} onChange={(pageNumber) => fetchData(pageNumber, keywords)} position="end" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    )
}