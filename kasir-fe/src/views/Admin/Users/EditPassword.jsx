//import react
import { useState, useEffect } from 'react'

//import react router dom
import { Link, useNavigate, useParams } from 'react-router-dom'

//import layout
import LayoutAdmin from '../../../layouts/Admin'

//import api
import Api from '../../../services/Api'

//import js cookie
import Cookies from 'js-cookie'

//import toast
import toast from 'react-hot-toast'
import { useMasterData } from '../../../components/general/UseMasterData'
import Select2 from '../../../components/general/ReactSelect2'

export default function UsersEdit() {
    //title page
    document.title = 'Edit User - KASIR'

    //navigata
    const navigate = useNavigate()

    const master = useMasterData(['branch', 'customer', 'status_user'])
    //get ID from parameter URL
    const { id } = useParams()

    //define state for form
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user_name, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [rolesData, setRolesData] = useState([])
    const [errors, setErros] = useState([])
    const [branch_id, setSelectedBranch] = useState('')
    const [tlcValueDestination, setTlcValueDestination] = useState('')
    const [shipper_account_id, setShipperAccountId] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState('')
    const [user_type, setUserType] = useState('')
    //define state "roles"
    const [roles, setRoles] = useState([])
    const userTypes = [
        { value: '1', label: 'User' },
        { value: '2', label: 'Customer' },
    ]
    //token from cookies
    const token = Cookies.get('token')

    //function "fetchDataRoles"
    const fetchDataRoles = async () => {
        await Api.get('/admin/roles/all', {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state "roles"
            setRoles(response.data.data)
        })
    }

    //function "fetchDataUser"
    const fetchDataUser = async () => {
        await Api.get(`/admin/users/${id}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state
            if (response.data && response.data.data) {
                setName(response.data.data.name)
                setEmail(response.data.data.email)
                setUserName(response.data.data.user_name)

                setSelectedBranch
                if (response.data && response.data.data && response.data.data.branch_id) {
                    setSelectedBranch({
                        label: response.data.data.branch.branch_name,
                        value: response.data.data.branch_id,
                    })
                }
                setShipperAccountId
                if (response.data && response.data.data && response.data.data.customer_id) {
                    setShipperAccountId({
                        label: response.data.data.customer.company_name,
                        value: response.data.data.customer_id,
                    })
                }
                setUserType
                if (response.data && response.data.data && response.data.data.user_type) {
                    setUserType({
                        label: response.data.data.status_user.name,
                        value: response.data.data.user_type,
                    })
                }
                setRolesData(response.data.data.roles.map((obj) => obj.name))
            }
            setButtonDisabled(!response.data || !response.data.data)
        })
    }

    //useEffect
    useEffect(() => {
        //call function "fetchDataRoles"
        fetchDataRoles()

        //call function "fetchDataUser"
        fetchDataUser()
    }, [])

    //define function "handleCheckboxChange"
    const handleCheckboxChange = (e) => {
        //define data
        let data = rolesData

        //check item already exists, if so, remove with filter
        if (data.some((name) => name === e.target.value)) {
            data = data.filter((name) => name !== e.target.value)
        } else {
            //push new item to array
            data.push(e.target.value)
        }

        //set data to state
        setRolesData(data)
    }

    //function "updateUser"
    const updateUser = async (e) => {
        e.preventDefault()

        //sending data
        await Api.post(
            `/admin/users/${id}`,
            {
                //data
                name: name,
                user_name: user_name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                branch_id: branch_id.value,
                shipper_account_id: shipper_account_id.value,
                roles: rolesData,
                user_type: user_type.value,
                _method: 'PUT',
            },
            {
                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                //show toast
                toast.success(response.data.message, {
                    position: 'top-right',
                    duration: 4000,
                })

                //redirect
                navigate('/admin/dashboard')
            })
            .catch((error) => {
                //set error message to state "errors"
                setErros(error.response.data)
            })
    }

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/admin/dashboard" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-user"></i> Edit Password
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateUser}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Password</label>
                                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter New Password" />
                                                </div>
                                                {errors.password && <div className="alert alert-danger">{errors.password[0]}</div>}
                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit" disabled={buttonDisabled} className="btn btn-md btn-primary me-2">
                                                <i className="fa fa-save"></i> Update
                                            </button>
                                            {/* <button type="reset" className="btn btn-md btn-warning">
                                                <i className="fa fa-redo"></i> Reset
                                            </button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    )
}
