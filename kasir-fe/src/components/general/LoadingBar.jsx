import { BarLoader } from 'react-spinner-animated'

import 'react-spinner-animated/dist/index.css'

function LoadingLogin() {
    return <BarLoader text={'Loading...'} center={true} width={'150px'} height={'150px'} />
}
export default LoadingLogin
