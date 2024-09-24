import Navbar from "./Components/landingPage/Navbar.jsx"
import Hero from "./Components/landingPage/Hero.jsx"
import Chat from "./Components/chatPage/Chat.jsx"
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom"
function Home(){
    const navigate = useNavigate()

    return(
        <div>
            <Navbar/>
            <Hero onClickTry = {()=>navigate('/chat')}/>
        </div>
    )
}

function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/chat' element={<Chat/>}/>
            </Routes>
        </Router>
    )
}

export default App