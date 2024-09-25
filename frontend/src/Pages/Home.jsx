import React from "react"
import '../UI/Hero.css'

const Home = ({onClickTry}) =>{
    return(
        <div className="hero">
            <h1>Welcome to RunTo GPT</h1>
            <p>Your AI assistance</p>
            <button className="hero-button" onClick={onClickTry}>Try RunTo GPT</button>
        </div>
    )
}

export default Home