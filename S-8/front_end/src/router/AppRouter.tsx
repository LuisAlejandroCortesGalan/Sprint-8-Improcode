import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "../ui/Nav"
import Home from "../ui/Home"
import Maps from "../features/maps/components/Maps"
import Calendar from "../features/calendars/components/Calendar"
import Charts from "../features/charts/components/Charts"


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