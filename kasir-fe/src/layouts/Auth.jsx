//import css bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/admin/css/custom.css'

//import font awesome
import '@fortawesome/fontawesome-free/js/all.js'

export default function auth({ children }) {
    return (
        <div
            style={{
                backgroundColor: 'white',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100vh',
                overflowX: 'hidden',
            }}
        >
            <div>
                <div className="">{children}</div>
            </div>
        </div>
    )
}
