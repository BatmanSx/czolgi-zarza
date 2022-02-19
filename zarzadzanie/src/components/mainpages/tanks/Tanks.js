import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import TankItem from '../utils/tanksItem/TankItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Tanks() {
    const state = useContext(GlobalState)
    const [tanks, setTanks] = state.TanksAPI.tanks
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.TanksAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        tanks.forEach(tank => {
            if(tank._id === id) tank.checked = !tank.checked
        })
        setTanks([...tanks])
    }

    const deleteTank = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteTank = axios.delete(`/api/tanks/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteTank
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        tanks.forEach(tank => {
            tank.checked = !isCheck
        })
        setTanks([...tanks])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        tanks.forEach(tank => {
            if(tank.checked) deleteTank(tank._id, tank.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Wybierz wszystkie</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Usuń wszystkie</button>
            </div>
        }

        <div className="tanks">
            {
                tanks.map(tank => {
                    return <TankItem key={tank._id} tank={tank}
                    isAdmin={isAdmin} deleteTank={deleteTank} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {tanks.length === 0 && <Loading />}
        </>
    )
}

export default Tanks
