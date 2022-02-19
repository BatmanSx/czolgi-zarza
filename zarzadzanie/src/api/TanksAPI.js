import {useState, useEffect} from 'react'
import axios from 'axios'


function TanksAPI() {
    const [tanks, setTanks] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getTanks = async () => {
            const res = await axios.get(`/api/tanks?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setTanks(res.data.tanks)
            setResult(res.data.result)
        }
        getTanks()
    },[callback, category, sort, search, page])
    
    return {
        tanks: [tanks, setTanks],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default TanksAPI
