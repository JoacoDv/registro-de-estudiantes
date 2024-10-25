function SearchEngine() {
    return (
        <div className="form-container">
        <form id="form">
          <label>
            <p className="name">Nombre:</p>
            <input id="name" placeholder="Jhon"></input>
          </label>
          <label>
            <p className="lastname">Apellido:</p>
            <input id="lastname" placeholder="Doe"></input>
          </label> <br></br>
          <select className="select-form-registro" id="select">
            <option>Materias</option>
            <option>Matematica</option>
            <option>Literatura</option>
            <option>Ingles</option>
            <option>Fisica</option>
          </select> <br></br>
          <button className="registrar">Buscar</button>
        </form>
      </div>
    )
}

export default SearchEngine