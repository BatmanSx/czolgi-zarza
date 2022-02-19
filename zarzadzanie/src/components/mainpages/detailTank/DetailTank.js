import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'


function DetailTank() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [tank] = state.TanksAPI.tanks
    const [detailTank, setDetailTank] = useState([])

    useEffect(() =>{
        if(params.id){

            tank.forEach(tank => {
                if(tank._id === params.id) setDetailTank(tank)
            })
        }
    },[params.id, tank])

    if(detailTank.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailTank.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>Tytuł: {detailTank.title}</h2>
                        <h6>ID czołgu: {detailTank.tank_id}</h6>
                    </div>
                    <p>Numer Boczny: {detailTank.side_id}</p>
                    <p>Producent: {detailTank.producer}</p>
                    <p>Modyfikacja: {detailTank.modyfication}</p>
                    <p>Ilość Amunicji: {detailTank.ammo}</p>
                    <p>Grubości pancerza przód/boki/tył w mm: {detailTank.armor}</p>
                    <p>Przebieg: {detailTank.milage}</p>
                    <p>Rocznik: {detailTank.datetank}</p>
                    <p>Data Wprowadzenia Czołgu: {detailTank.datetankc}</p>
                   
                </div>
            </div>
        </>
    )
}

export default DetailTank