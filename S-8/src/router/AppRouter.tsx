import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "../components/Nav"
import Home from "../components/Home"
import Maps from "../components/Maps"
import Calendar from "../components/Calendar"
import Charts from "../components/Charts"


const AppRouter = () => {
    
    return (
        <>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/maps" element={<Maps/>} />
                <Route path="/calendar" element={<Calendar/>} />
                <Route path="/charts" element={<Charts/>} />
                <Route path="*" element={<h2 className="text-center p-5">404 NOT FOUND</h2>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default AppRouter