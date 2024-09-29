import React, {useEffect, useRef, useState} from "react";
import '../UI/Chat.css'
import {getMessages, postMessage} from "../API/MessageAPI.js";

const Chat = ()=>{
    const [message, setMessage] = useState([])
    const [input, setInput] = useState('')
    const messageEndRef = useRef(null)

    const sendMessage = async ()=>{
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user' };
            setMessage((prev) => [...prev, userMessage]);
            setInput('');

            try {
                const botResponse = await postMessage(userMessage);
                setMessage((prev) => [...prev, botResponse]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }

    useEffect(() => {
        const getMessage = async ()=>{
            try{
                const messagesData = await getMessages()
                setMessage(messagesData)
            }catch (err){
                console.error('Failed to fetch messages:',err)
            }
        }
        getMessage()
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior:'smooth'})
    }, [message]);

    return(
        <div className="chat-container">
            <div className="chat-message">
                {message.map((message, index)=>(
                    <div key={index} className={`chat-message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
                <div ref={messageEndRef}/>
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