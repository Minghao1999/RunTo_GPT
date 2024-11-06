import React, { useEffect, useRef } from "react";
import '../UI/Chat.css';

const Message = ({ messages }) => {
    const messageEndRef = useRef(null);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-messages">
            {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.sender}`}>
                    {message.text}
                </div>
            ))}
            {/* Ref applied to an empty div at the end of the message list */}
            <div ref={messageEndRef} />
        </div>
    );
};

export default Message;
