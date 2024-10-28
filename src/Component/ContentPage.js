import {useState, useEffect} from "react"
import Form from "./Form-registro"
import Modificador from "./Modificador"
import SearchEngine from "./SearchEngine"
import Students from "./Students"


function ContentPage({buttonValue}) {
  const [modificar, setModificar] = useState(false);
  const [nombre , setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [materia, setMateria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/estudiantes")
    .then(response => response.json())
    .then(data => setStudents(data))
    .catch(error => console.error("Error al obtener los estudiantes: ", error))
}, [ setModificar, students]) 
  
  if (buttonValue) {
      return <Form></Form>
    }
    else {
      return (
        <>
          <SearchEngine></SearchEngine>
          <Students students={students} setStudents={setStudents} setId={setId} modificarActivado={setModificar} setNombre={setNombre} setApellido={setApellido} setMateria={setMateria} setDescripcion={setDescripcion}></Students>
{         <Modificador id={id} setModificar={setModificar} setNombre={setNombre} setApellido={setApellido} setMateria={setMateria} setDescripcion={setDescripcion}
          valorModificar={modificar} nombre={nombre} apellido={apellido} materia={materia} descripcion={descripcion}></Modificador>
}        </>
      )
    }
}




  
export default ContentPage