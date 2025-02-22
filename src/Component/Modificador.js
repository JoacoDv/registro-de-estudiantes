import {useState, nombre, apellido, materia, descripcion} from "react"

function Modificador({ id, nombre, apellido, materia, descripcion, setNombre, setApellido, setMateria, setDescripcion, setModificar, valorModificar}) {
    let clases = valorModificar ? "form-container modificador" : "form-container modificador hide";
    function valueName(e) {
        setNombre(e.target.value);
    }
    function valueLastname(e) {
        setApellido(e.target.value);
    }
    function optionValue(e) {
        setMateria(e.target.value)
    }
    function valueDescription(e) {
        setDescripcion(e.target.value)
    }

    function changeData(e) {
        e.preventDefault();
        
        fetch("http://localhost:5000/estudiantes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nombre, apellido, descripcion, materia, id})
        })

        setModificar(false);
    }

    return (
        <div className={clases}>
            <form id="form">
            <label>
                <p className="name">Nombre:</p>
                <input id="name" value={nombre} onChange={valueName} placeholder="Jhon"></input>
            </label>
            <label>
                <p className="lastname">Apellido:</p>
                <input id="lastname" value={apellido} onChange={valueLastname} placeholder="Doe"></input>
            </label> <br></br>
            <select className="select-form-registro" id="select" value={materia} onChange={optionValue}>
                <option select >Materias</option>
                <option>Matematica</option>
                <option>Literatura</option>
                <option>Ingles</option>
                <option>Fisica</option>
            </select> <br></br>
            <label>
                <p className="descripcion" >Descripción:</p>
                <textarea rows="8" value={descripcion} onChange={valueDescription} className="textarea" id="textarea" placeholder="Observaciones"></textarea>
            </label> <br></br>
            <button className="registrar" onClick={changeData}>Registrar</button>
            <button className="registrar" onClick={(e) => {
                e.preventDefault()
                setModificar(false)}}>Cancelar</button>
            </form>
        </div>
    )
}


export default Modificador