import Navbar from "./Components/Navbar.jsx"
import Home from "./Pages/Home.jsx"
import Chat from "./Pages/Chat.jsx"
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom"
function Hero(){
    const navigate = useNavigate()

    return(
        <div>
            <Home onClickTry = {()=>navigate('/chat')}/>
        </div>
    )
}

function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Hero/>}/>
                <Route path='/chat' element={<Chat/>}/>
            </Routes>
        </Router>
    )
}

export default App