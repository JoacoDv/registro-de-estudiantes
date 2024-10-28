import {useState, useEffect} from "react"

function Students() {
    const [students, setStudents] = useState([]);

    function eliminarEstudiante(id) {
        console.log(id)
        fetch("http://localhost:5000/estudiantes", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("No se a podido eliminar al estudiante", error))
    }

    useEffect(() => {
        fetch("http://localhost:5000/estudiantes")
        .then(response => response.json())
        .then(data => setStudents(data))
        .catch(error => console.error("Error al obtener los estudiantes: ", error))
    }, [eliminarEstudiante])
    
    return students.map(({id, nombre, apellido, materia, descripcion}) => {
        return <div className="student-container">
            <h2 className="nombre texto" id={id}>Nombre: {nombre}</h2>
            <h2 className="apellido texto" >Apellido: {apellido}</h2>
            <h3 className="materia texto">Materia: {materia}</h3>
            <p className="descripcion texto">Descripcion: {descripcion}</p>
            <div>
                <button className="registrar" onClick={() => eliminarEstudiante(id)}>Borrar</button>
                <button className="registrar">Modificar</button>
            </div>
        </div>
    })
}
    
export default Students