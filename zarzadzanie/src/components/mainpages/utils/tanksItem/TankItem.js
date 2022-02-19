import React from 'react'
import BtnRender from './BtnRender'

function TankItem({tank, isAdmin, deleteTank, handleCheck}) {
    return (
        <div className="tank_card" >
            {
                isAdmin && <input type="checkbox" checked={tank.checked}
                onChange={() => handleCheck(tank._id)} />
            }
            <img src={tank.images.url} alt=""/>

            <div className="tank_box">
                <h2 title={tank.title}>{tank.title}</h2>
                    <p>Numer Boczny: {tank.side_id}</p>
                    <p>Producent: {tank.producer}</p>
                    <p>Modyfikacja: {tank.modyfication}</p>
                    <p>Ilość Amunicji: {tank.ammo} sztuk</p>
                    <p>Grubości pancerza przód/boki/tył w mm: {tank.armor} mm</p>
                    <p>Przebieg: {tank.milage} km</p>
                    <p>Rocznik: {tank.datetank}</p>
                    <p>Data Wprowadzenia Czołgu: {tank.datetankc}</p>
            </div>
             
            
            <BtnRender tank={tank} deleteTank={deleteTank} />
        </div>
    )
}

export default TankItem
