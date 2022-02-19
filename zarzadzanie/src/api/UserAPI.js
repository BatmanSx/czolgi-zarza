import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [profile, setProfile] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)


                } catch (err) {
                    alert("Admin mode")
                }
            }

            getUser()
            
        }
    },[token])

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        profile: [profile, setProfile]
    }
}

export default UserAPI
 