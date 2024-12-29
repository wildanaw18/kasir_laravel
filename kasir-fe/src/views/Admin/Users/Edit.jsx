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

    const master = useMasterData(['branch', 'shop'])
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
    const [shop_id, setShopId] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState('')
    const [type_user, setUserType] = useState('')
    //define state "roles"
    const [roles, setRoles] = useState([])
    const userTypes = [
        { value: '1', label: 'Super Admin' },
        { value: '2', label: 'Shop' },
        { value: '2', label: 'Branch' },
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
                setShopId
                if (response.data && response.data.data && response.data.data.shop_id) {
                    setShopId({
                        label: response.data.data.shop.shop_name,
                        value: response.data.data.shop_id,
                    })
                }
                setUserType
                if (response.data && response.data.data && response.data.data.type_user) {
                    setUserType({
                        label: userTypes.label,
                        value: response.data.data.type_user,
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
                shop_id: shop_id.value,
                roles: rolesData,
                type_user: type_user.value,
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
                navigate('/admin/users')
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
                            <Link to="/admin/users" className="btn btn-md btn-primary border-0 shadow-sm mb-3" type="button">
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-user"></i> Edit User
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateUser}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">User Name</label>
                                                    <input type="text" className="form-control" value={user_name} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Full Name" />
                                                </div>
                                                {errors.user_name && <div className="alert alert-danger">{errors.user_name[0]}</div>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Full Name</label>
                                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name" />
                                                </div>
                                                {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Email Address</label>
                                                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" />
                                                </div>
                                                {errors.email && <div className="alert alert-danger">{errors.email[0]}</div>}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Password</label>
                                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                                </div>
                                                {errors.password && <div className="alert alert-danger">{errors.password[0]}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Password Confirmation</label>
                                                    <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Enter Password Confirmation" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                {' '}
                                                <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                    Branch
                                                </label>
                                                <Select2 typeSelect="edit" options={master?.branch ?? []} selectedOption={branch_id} setSelectedOption={setSelectedBranch} />
                                                {errors.branch_id && <div className="alert alert-danger mt-1">{errors.branch_id[0]}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                {' '}
                                                <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                    Shops
                                                </label>
                                                <Select2 typeSelect="edit" options={master?.shop ?? []} selectedOption={shop_id} setSelectedOption={setShopId} />
                                                {errors.shop_id && <div className="alert alert-danger mt-1">{errors.shop_id[0]}</div>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {' '}
                                                <label className="form-label " style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                    Type User
                                                </label>
                                                <Select2 typeSelect="edit" options={userTypes ?? []} selectedOption={type_user} setSelectedOption={setUserType} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mb-3">
                                            <label className="fw-bold">Roles</label>
                                            <br />
                                            {roles.map((role) => (
                                                <div className="form-check form-check-inline" key={Math.random()}>
                                                    <input className="form-check-input" type="checkbox" value={role.name} defaultChecked={rolesData.some((name) => name === role.name ?? true)} onChange={handleCheckboxChange} id={`check-${role.id}`} />
                                                    <label className="form-check-label fw-normal" htmlFor={`check-${role.id}`}>
                                                        {role.name}
                                                    </label>
                                                </div>
                                            ))}

                                            {errors.roles && <div className="alert alert-danger mt-2">{errors.roles[0]}</div>}
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
