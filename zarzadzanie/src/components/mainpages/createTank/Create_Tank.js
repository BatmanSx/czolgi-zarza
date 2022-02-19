import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    tank_id:'' ,
    side_id:'' ,
    title:'' ,
    producer:'' ,
    modyfication:'' ,
    ammo:'' ,
    armor:'' ,
    milage:'' ,
    images:'' ,
    category:'' ,
    _id: '',
    datetank:'' ,
    datetankc:''
     
}

function CreateTank() {
    const state = useContext(GlobalState)
    const [tank, setTank] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    
    const history = useHistory ()
    const param = useParams()

    const [tanks] = state.TanksAPI.tanks
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.TanksAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            tanks.forEach(tank => {
                if(tank._id === param.id) {
                    setTank(tank)
                    setImages(tank.images)
                }
            })
        }else{
            setOnEdit(false)
            setTank(initialState)
            setImages(false)
        }
    }, [param.id, tanks])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Nie jesteś zalogowany")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Za duży rozmiar!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("Nie jesteś zalogowany")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setTank({...tank, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Nie jesteś zalogowany")
            if(!images) return alert("Brak zdjęcia")

            if(onEdit){
                await axios.put(`/api/tanks/${tank._id}`, {...tank, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/tanks', {...tank, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_tank">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="tank_id">Tank ID</label>
                    <input type="text" name="tank_id" id="tank_id" required
                    value={tank.tank_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>
                <div className="row">
                    <label htmlFor="side_id">Numer Boczny</label>
                    <input type="text" name="side_id" id="side_id" required
                    value={tank.side_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>
                <div className="row">
                    <label htmlFor="title">Model Czołgu</label>
                    <input type="text" name="title" id="title" required
                    value={tank.title} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="producer">Producent</label>
                    <input type="text" name="producer" id="producer" required
                    value={tank.producer} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="modyfication">Modyfikacja</label>
                    <input type="text" name="modyfication" id="modyfication" required
                    value={tank.modyfication} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="ammo">Liczba Amunicja</label>
                    <input type="number" name="ammo" id="ammo" required
                    value={tank.ammo} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="armor">Grubości pancerza przód/boki/tył w mm</label>
                    <input type="text" name="armor" id="armor" required
                    value={tank.armor} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="milage">Przebieg w km</label>
                    <input type="number" name="milage" id="milage" required
                    value={tank.milage} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="datetank">Rocznik</label>
                    <input type="date" name="datetank" id="datetank" min="1900-01-01" required
                    value={tank.datetank} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="datetankc">Data Wprowadzenia Czołgu</label>
                    <input type="date" name="datetankc" id="datetankc" min="1970-01-01" required
                    value={tank.datetankc} onChange={handleChangeInput} />
                </div>



                <div className="row">
                    <label htmlFor="categories">Nazwisko Prezydenta: </label>
                    <select name="category" value={tank.category} onChange={handleChangeInput} >
                        <option value="">Proszę o wybranie nazwiska</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Edytuj" : "Utwórz"}</button>
            </form>
        </div>
    )
}

export default CreateTank
