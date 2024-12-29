import { useEffect, useState } from 'react'
import axios from 'axios'
// import { JsonEncode } from '../utils/utils'
//import js cookie
import Cookies from 'js-cookie'
//import api
import Api from '../../services/Api'

export const useMasterData = (criteria) => {
    const [masterData, setMasterData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const token = Cookies.get('token')
    useEffect(() => {
        const fetchData = async () => {
            const response = Api.get('/admin/masters', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    request: JSON.stringify(criteria),
                },
            }).then((response) => {
                //set data response to satate "permissions"

                setMasterData(response.data.data)
                setLoading(false)
            })
        }

        if (!masterData) {
            fetchData() // Hanya memicu request jika masterData belum ada (pertama kali)
        }
    }, []) // Tidak ada dependency, sehingga hanya dijalankan sekali

    return { ...masterData, loading, error }
}
