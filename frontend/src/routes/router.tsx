import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/home"
// import Pool from "../pages/pool"

const Router: FC = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      {/* <Route path="/pool" element={<Pool />}/> */}
    </Routes>
  </BrowserRouter>
}

export default Router