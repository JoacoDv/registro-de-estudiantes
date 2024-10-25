import Form from "./Form-registro"
import SearchEngine from "./SearchEngine"

function ContentPage({buttonValue}) {
    if (buttonValue) {
      return <Form></Form>
    }
    else {
      return (
        <>
          <SearchEngine></SearchEngine>
          <Estudents></Estudents>
        </>
      )
    }
}



function Estudents() {

}

  
export default ContentPage