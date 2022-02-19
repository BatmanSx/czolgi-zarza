import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        president_id:'', namefirst:'',namelast:'', email:'', password: '',country:'', atom:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Rejestracja</h2>
                
                <input type="text" name="president_id" required
                placeholder="ID" value={user.president_id} onChange={onChangeInput} />
                
                <input type="text" name="namefirst" required
                placeholder="Imię" value={user.namefirst} onChange={onChangeInput} />

                 <input type="text" name="namelast" required
                placeholder="Nazwisko" value={user.namelast} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Hasło" value={user.password} onChange={onChangeInput} />

                <input type="country" name="country" required
                placeholder="Kraj" value={user.country} onChange={onChangeInput} />     

                <input type="atom" name="atom" required
                placeholder="Przycisk Atomowy" value={user.atom} onChange={onChangeInput} />   

                <div className="row">
                    <button type="submit">Zarejestruj</button>
                    <Link to="/login">Zaloguj</Link>
                </div>
            </form>
        </div>
    )
}

export default Register