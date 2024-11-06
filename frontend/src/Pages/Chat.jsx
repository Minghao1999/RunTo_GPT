import React, { useEffect, useRef, useState } from "react";
import '../UI/Chat.css';
import { getMessages, postMessage } from "../API/MessageAPI.js";
import Landing from "../Components/Landing.jsx";
import Message from "../Components/Message.jsx";
import Navbar from "../Components/Navbar.jsx";

const Chat = () => {
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');
    const [landing, setLanding] = useState(false);
    const [historyMessages, setHistoryMessages] = useState([]);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const messageEndRef = useRef(null);

    const sendMessage = async () => {
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
    };

    useEffect(() => {
        const getMessage = async () => {
            setLanding(true);
            try {
                const messagesData = await getMessages();
                setHistoryMessages(messagesData);
            } catch (err) {
                console.error('Failed to fetch messages:', err);
            } finally {
                setLanding(false);
            }
        };
        getMessage();
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    const handleSelectDateMessages = (date, messages) => {
        setMessage(messages);
        console.log('Selected date:', date);
        console.log('Selected messages:', messages);
    };

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div className="chat-container">
            <button className="toggle-btn outside" onClick={toggleSideNav}>
                Open
            </button>
            <Navbar
                historyMessages={historyMessages}
                onDateSelect={handleSelectDateMessages}
                isOpen={isSideNavOpen}
                toggleSideNav={toggleSideNav}
            />
            <div className={`chat-content ${isSideNavOpen ? 'sidenav-open' : ''}`}>
                {message && message.length > 0 ? (
                    <>
                        <Message messages={message} />
                        <div ref={messageEndRef} />
                    </>
                ) : (
                    <Landing />
                )}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message"
                />
                <button onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
