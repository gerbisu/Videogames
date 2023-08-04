import "./create.style.css";
import { useState } from "react";
import axios from "axios";
import {validation} from "../../utils/validation"

function Create() {
    const [input, setInput] = useState({
        name:"",
        description:"",
        platforms:"",
        image:"",
        released:"",
        rating:"",
        genre:""
    });
    const [errors, setErrors] = useState({
        name:"inserte nombre",
        description:"descripcion...",
        platforms:"plataforma...",
        image:"url...",
        released:"DD/MM/AA...",
        rating:"rating..",
        genre:""
    });

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInput({...input, [name]: value});//almaceno el nombre y la informacion de el mismo ej: plataforms(name): PS4(value)
        validate({...input, [name]:value});
    };

    const validate = (input) => {
        const errors = validation(input);
        setErrors(errors);
      };

    const handlerSubmit =(event)=>{
        event.preventDefault()
        axios
        .post("http://localhost:3001/videogames",input)
        .then(res=>{alert(res);
             setInput({
              name: "",
              description: "",
              platforms: "",
              image: "",
              released: "",
              rating: "",
              genre: "",
            });
            setErrors({
              name: "inserte nombre",
              description: "descripcion...",
              platforms: "plataforma...",
              image: "url...",
              released: "DD/MM/AA...",
              rating: "rating..",
              genre: "",
            });
          })
        .catch(err=>alert(err));
      };

    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label>Nombre</label>
                    <input name="name" value={input.name} onChange={handleChange}/>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label>Imagen</label>
                    <input name="image" value={input.image} onChange={handleChange}/>
                    {errors.image && <span>{errors.image}</span>}
                </div>
                <div>
                    <label>Descripción</label>
                    <input name="description" value={input.description} onChange={handleChange}/>
                    {errors.description && <span>{errors.description}</span>}
                </div>
                <div>
                    <label>Plataformas</label>
                    <input name="platforms" value={input.platforms} onChange={handleChange}/>
                    {errors.platforms && <span>{errors.platforms}</span>}
                </div>
                <div>
                    <label>Fecha de lanzamiento</label>
                    <input name="released" value={input.released} onChange={handleChange}/>
                    {errors.released && <span>{errors.released}</span>}
                </div>
                <div>
                    <label>Rating</label>
                    <select name="rating" value={input.rating} onChange={handleChange}>
                        <option value="">Seleccionar Raiting</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>
                </div>
                <div>
                    <label>Genre</label>
                    <select name="genre" value={input.genre} onChange={handleChange}>
                    <option value="">Seleccionar género...</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Indie</option>
                    <option value="RPG">Indie</option>
                    </select>
                    {errors.genre && <span>{errors.genre}</span>}
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default Create;