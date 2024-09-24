import React, {useState} from "react";
import '../UI/Chat.css'

const Chat = ()=>{
    const [message, setMessage] = useState([
        {text: 'Hello! How can I help you today?', sender: 'bot'}
    ])
    const [input, setInput] = useState('')

    const sendMessage =()=>{
        if(input.trim()){
            setMessage([...message, {text:input, sender: 'user'}])
            setInput('')
            setTimeout(()=>{
                setMessage((prev)=>[...prev, {text: 'This is a GPT response. ', sender: 'bot'}])
            }, 1000)
        }
    }

    return(
        <div className="chat-container">
            <div className="chat-message">
                {message.map((message, index)=>(
                    <div key={index} className={`chat-message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    onKeyPress = {(e)=>e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
export default Chat