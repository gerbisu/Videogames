import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {getAllGames, getByName} from "../../redux/actions/index"
import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import "./home.style.css";

function Home() {

    const dispatch = useDispatch()
    //Todos los videogames
    //const allGames = useSelector((state)=>state.allGames)
    const allGamescopy = useSelector((state)=>state.allGamescopy)
    const [searchString, setSearchString] = useState("")//creo estado que sera igual al nombre buscado
    function handleChange(event){
        //Creo una funcion que me setea el state de searchString a la palabra que tenga en el input
        event.preventDefault()//no se resetea la pagina
        setSearchString(event.target.value)//remplazo valor
    }
    //FILTRO CON EL BACK
    function handleSubmit(event){
        event.preventDefault()//no se resetea la pagina
        dispatch(getByName(searchString))
    }
    //FILTRO CON EL BACK



/*  FILTRO SOBRE EL ESTADO
    //Funcionalidades de la barra de busqueda
    const [filtered, setFiltered] = useState(allGamescopy)//creo estado local que toma los games 
    const [searchString, setSearchString] = useState("")//creo estado que sera igual al nombre buscado
    
    //al darle al boton -->
    function handleSubmit(event){
        event.preventDefault()//no se resetea la pagina
        const filtered = allGamescopy.filter(game=>game.name.includes(searchString));//filtro los games por nombre queesta dentro del otro estado
        setFiltered(filtered)//cambio el estado de todos por solo el que coincide con el nombre
    }
*/
    useEffect(()=>{
        dispatch(getAllGames())

    }, [dispatch])

    return (
        <div className="Home">
            <h2 className="Home-title">Este es el HOME</h2>
            <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
            <Cards allGames = {allGamescopy}/>
        </div>
    );
}

export default Home;