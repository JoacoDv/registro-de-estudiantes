import { useState } from "react"

function Form() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");
  const select = document.getElementById("select")
  const valueName = e => {
    setName(e.target.value)
  }
  const valueLastname = e => {
    setLastname(e.target.value)
  }
  const valueDescription = e => {
    setDescription(e.target.value)
  }
  function newStudent(e) {
    e.preventDefault()
    const newStudent = { id: Math.random() ,nombre: name, apellido: lastname, materia: select.value, descripcion: description};
    console.log(newStudent);
    setName("");
    setLastname("");
    setDescription("");
    select.value = select[1];
  }
    return (
      <div className="form-container">
        <form id="form">
          <label>
            <p className="name">Nombre:</p>
            <input id="name" value={name} onChange={valueName} placeholder="Jhon"></input>
          </label>
          <label>
            <p className="lastname">Apellido:</p>
            <input id="lastname" value={lastname} onChange={valueLastname} placeholder="Doe"></input>
          </label> <br></br>
          <select className="select-form-registro" id="select">
            <option select >Materias</option>
            <option>Matematica</option>
            <option>Literatura</option>
            <option>Ingles</option>
            <option>Fisica</option>
          </select> <br></br>
          <label>
            <p className="descripcion" value={description} onChange={valueDescription}>Descripción:</p>
            <textarea rows="8" className="textarea" id="textarea" placeholder="Observaciones"></textarea>
          </label> <br></br>
          <button className="registrar" onClick={newStudent}>Registrar</button>
        </form>
      </div>
    )
}

export default Form