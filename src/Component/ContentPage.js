import Form from "./Form-registro"
import SearchEngine from "./SearchEngine"
import Students from "./Students"

function ContentPage({buttonValue}) {
    if (buttonValue) {
      return <Form></Form>
    }
    else {
      return (
        <>
          <SearchEngine></SearchEngine>
          <Students></Students>
        </>
      )
    }
}




  
export default ContentPage