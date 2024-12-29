//import state
import { useState } from 'react'

//import service
import Api from '../../services/Api'

//import layoutAuth
import LayoutAuth from '../../layouts/Auth'

//import Cookie
import Cookies from 'js-cookie'

//import Navigate
import { Navigate, useNavigate } from 'react-router-dom'

//import toast
import toast from 'react-hot-toast'
import LoadingTable from '../../components/general/Loading'
import LoadingLogin from '../../components/general/LoadingBar'
import { SlLogin } from 'react-icons/sl'

export default function Login() {
    //title page
    document.title = 'Login - Admin GSA'
    //navigate
    const navigate = useNavigate()

    //define state
    const [user_name, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    //define state errors
    const [errors, setErrors] = useState([])

    //method login
    const login = async (e) => {
        e.preventDefault()
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 500))
        const response = await Api.post('/login', {
            user_name: user_name,
            password: password,
        })
            .then((response) => {
                //set token to cookies
                Cookies.set('token', response.data.token)

                //set user to cookies
                Cookies.set('user', JSON.stringify(response.data.user))

                //set permissions to cookies
                Cookies.set('permissions', JSON.stringify(response.data.permissions))

                //show toast
                toast.success('Login Successfully!', {
                    position: 'top-right',
                    duration: 1000,
                })

                //redirect dashboard page
                navigate('/admin/dashboard')
            })
            .catch((error) => {
                //set response error to state
                setErrors(error.response.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    //check if cookie already exist
    if (Cookies.get('token')) {
        //redirect dashboard page
        return <Navigate to="/admin/dashboard" replace />
    }

    return (
        <LayoutAuth>
            <div className="row">
                {/* Kolom kiri (putih) */}
                {/* Kolom kanan (biru) */}
                <div className="col-md-7 bg-skyblue" style={{ height: '100vh' }}>
                    <div className="row">
                        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <div style={{ marginTop: 140 }}>
                                <h1 className="text-center">POS</h1>
                                <h4>Multi Shop Cashier System</h4>
                            </div>
                            <div className="d-flex justify-content-center">
                                <img src={'/images/kasir.png'} width={'400'} className="me-2 " />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 bg-white" style={{ marginTop: '70px' }}>
                    <div className="container">
                        <div className="form-left py-3 px-3">
                            {loading && <LoadingLogin />}
                            {errors.message && <div className="alert alert-danger">{errors.message}</div>}

                            <form onSubmit={login}>
                                <h4>
                                    <strong className="text-dark">SIGN IN</strong>
                                </h4>
                                <div className="col-md-12 mt-5">
                                    {/* <label>UserName</label> */}
                                    <div className="input-group">
                                        <div className="input-group-text">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <input type="text" className="form-control" value={user_name} onChange={(e) => setUserName(e.target.value)} placeholder="Enter UserName" style={{ height: '60px' }} />
                                    </div>
                                    {errors.user_name && <div className="alert alert-danger mt-2">{errors.user_name[0]}</div>}
                                    <span>
                                        <i>Username : admin</i>
                                    </span>
                                </div>

                                <div className="col-md-12">
                                    {/* <label>Password</label> */}
                                    <div className="input-group mt-3">
                                        <div className="input-group-text">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" style={{ height: '60px' }} />
                                    </div>
                                    {errors.password && <div className="alert alert-danger mt-2">{errors.password[0]}</div>}
                                    <span>
                                        <i>Password : password</i>
                                    </span>
                                </div>
                                {/* <div className="col-md-12 mt-4" style={{ textAlign: 'right' }}>
                                    <span>Lupa Kata Sandi</span>
                                </div> */}

                                <button type="submit" className="btn btn-primary px-4 rounded-4 mt-4 w-100">
                                    <SlLogin size={17} /> LOGIN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAuth>
    )
}
