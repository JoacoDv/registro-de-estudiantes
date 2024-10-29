import {useState} from "react"

function SearchEngine({setStudents}) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectOption, setSelectOption] = useState("Materias")
  const nameValue = e => {
    setName(e.target.value);
  }
  const lastnameValue = e => {
    setLastname(e.target.value);
  }
  const optionsValue = e => {
    setSelectOption(e.target.value)
  }
  function search() {
    
    console.log("funciona")
    fetch(`http://localhost:5000/estudiantes/buscador?name=${name}&lastname=${lastname}&materia=${selectOption}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => setStudents(data))
    .catch(error => console.log(error))

    setName("");
    setLastname("");
    setSelectOption("Materia");
  }
    return (
      <div className="search-engine" >
        <div>
          <input placeholder="Jhon" className="name" value={name} onChange={nameValue}></input>
          <input placeholder="Doe" className="lastname" value={lastname} onChange={lastnameValue}></input>
          <select className="materia" value={selectOption} onChange={optionsValue}>
            <option select Value="Materias">Materias</option>
            <option value="M">Matematica</option>
            <option>Literatura</option>
            <option>Ingles</option>
            <option>Fisica</option>
          </select>
        </div>
        <button onClick={search}>Buscar</button>
      </div>
    )
}

export default SearchEngine