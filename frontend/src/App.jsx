import Chat from "./Pages/Chat.jsx"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Chat/>}/>
            </Routes>
        </Router>
    )
}

export default App