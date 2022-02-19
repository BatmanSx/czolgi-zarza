import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({tank, deleteTank}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteTank(tank._id, tank.images.public_id)}>
                        Usuń
                    </Link>
                    <Link id="btn_view" to={`/edit_tank/${tank._id}`}>
                        Edytuj
                    </Link>
                </>
                : <>
                    <Link id="btn_view" to={`/detail/${tank._id}`}>
                        Zobacz
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
