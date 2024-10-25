function Navbar({setButton , buttonValue}) {
  const pContent = buttonValue ? "Registro" : "Estudiantes";
  const buttonContent = buttonValue ? "Estudiantes" : "Registro";
    return (
      <nav>
        <p>{pContent}</p>
        <button onClick={setButton}>{buttonContent}</button>
      </nav>
    )
}

export default Navbar