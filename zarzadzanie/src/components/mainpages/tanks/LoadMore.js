import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.TanksAPI.page
    const [result] = state.TanksAPI.result

    return (
        <div className="load_more">
            {
                result < page * 30 ? ""
                : <button onClick={() => setPage(page+1)}>Załaduj Więcej</button>
            }
        </div>
    )
}

export default LoadMore
