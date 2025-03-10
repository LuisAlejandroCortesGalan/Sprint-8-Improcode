import { Link } from "react-router-dom"
import "../App.css"

const Nav = () => {
    return (
        <nav className="mainNav ">
            <div className="containerNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/maps">Map</Link>
                </li>
                <li>
                    <Link to="/calendar">FullCalendar</Link>
                </li>
                <li>
                    <Link to="/charts">Gràfics (Chartjs)</Link>
                </li>
            </ul>
            </div>

        </nav>
    )
}

export default Nav


