import { useState } from "react"

function Form() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectOption, setSelectOption] = useState("Materias")
  const [description, setDescription] = useState("");
  const valueName = e => {
    setName(e.target.value)
  }
  const valueLastname = e => {
    setLastname(e.target.value)
  }
  const optionValue = e => {
    setSelectOption(e.target.value)
  }
  const valueDescription = e => {
    setDescription(e.target.value)
  }
  function newStudent(e) {
    e.preventDefault()
    const newStudent = {nombre: name, apellido: lastname, materia: selectOption, descripcion: description};
    console.log(newStudent);


    fetch('http://localhost:5000/estudiantes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, lastname, selectOption, description })
  })
  .then(response => response.json())
  .then(data => {
      console.log("Datos guardados:", data);
      // Puedes actualizar el estado o mostrar una notificación de éxito aquí
  })
  .catch(error => console.error("Error al enviar los datos:", error));


    setName("");
    setLastname("");
    setDescription("");
    setSelectOption("Todas");
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
          <select className="select-form-registro" id="select" value={selectOption} onChange={optionValue}>
            <option select >Todas</option>
            <option>Matematica</option>
            <option>Literatura</option>
            <option>Ingles</option>
            <option>Fisica</option>
          </select> <br></br>
          <label>
            <p className="descripcion" >Descripción:</p>
            <textarea rows="8" value={description} onChange={valueDescription} className="textarea" id="textarea" placeholder="Observaciones"></textarea>
          </label> <br></br>
          <button className="registrar" onClick={newStudent}>Registrar</button>
        </form>
      </div>
    )
}

export default Form