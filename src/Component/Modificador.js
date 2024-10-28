import {useState} from "react"

function modificador(nombre, apellido, materia, descripcion) {
    const [name, setName] = useState(nombre);
    const [lastname, setLastname] = useState(apellido);
    const [selectOption, setSelectOption] = useState(materia);
    const [description, setDescription] = useState(descripcion);
    function valueName(e) {
        setName(e.target.value);
    }
    function valueLastname(e) {
        setLastname(e.target.value);
    }
    function optionValue(e) {
        setSelectOption(e.target.value)
    }
    function valueDescription(e) {
        setDescription(e.target.value)
    }

    function changeData() {

    }

    return (
        <div className="form-container modificador">
            <form id="form">
            <label>
                <p className="name">Nombre:</p>
                <input id="name" value={name} onChange={valueName} placeholder="Jhon"></input>
            </label>
            <label>
                <p className="lastname">Apellido:</p>
                <input id="lastname" value={lastname} onChange={valueLastname} placeholder="Doe"></input>
            </label> <br></br>
            <select className="select-form-registro" id="select" value={selectOption} onChange={optionValue}>
                <option select >Materias</option>
                <option>Matematica</option>
                <option>Literatura</option>
                <option>Ingles</option>
                <option>Fisica</option>
            </select> <br></br>
            <label>
                <p className="descripcion" >Descripción:</p>
                <textarea rows="8" value={description} onChange={valueDescription} className="textarea" id="textarea" placeholder="Observaciones"></textarea>
            </label> <br></br>
            <button className="registrar" onClick={changeData}>Registrar</button>
            </form>
        </div>
    )
}


export default modificador