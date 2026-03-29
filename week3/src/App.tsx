import { AppleBasket } from "./components/AppleBasket"
import { AppleButton } from "./components/AppleButton"
import { MovieList } from "./components/MovieList"

function App() {

  return (
    <>
    <h1 className="text-black text-xl">Welcome</h1>
    <AppleButton/>
    <AppleBasket/>
    <MovieList/>
    </>
  )
}

export default App
