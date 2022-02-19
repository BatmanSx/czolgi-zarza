import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.TanksAPI.category
    const [sort, setSort] = state.TanksAPI.sort
    const [search, setSearch] = state.TanksAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filtruj: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>Wszystkie czołgi</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Wyszukaj czołg"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span>Sortuj po: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Nowo Dodane</option>
                    <option value='sort=oldest'>Najstarsze dodane</option>
                    <option value='sort=-sold'>Najlepsze Czołgi</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
