import React, {useContext} from 'react'
import { Route,Switch } from 'react-router-dom'
import Tanks from './tanks/Tanks'
import DetailTank from './detailTank/DetailTank'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateTank from './createTank/Create_Tank'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
            <Switch>
            <Route path="/" exact component={Tanks} />
            <Route path="/detail/:id" exact component={DetailTank} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_tank" exact component={isAdmin ? CreateTank : NotFound} />
            <Route path="/edit_tank/:id" exact component={isAdmin ? CreateTank : NotFound} />

            <Route path="*" exact component={NotFound} />
            </Switch>

    )
}

export default Pages
