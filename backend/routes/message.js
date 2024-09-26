const express = require('express')
const router = express.Router()
const Message = require('../models/Message')
const axios = require('axios')
const {response} = require("express")

router.get('/', async (request,response)=>{
    try{
        const messages = await Message.find().sort({timestamp: 1})
        response.json(messages)
    }catch (err){
        response.status(500).json({error: 'Failed to fetch messages'})
    }
})

router.post('/', async (request,response)=>{
    const {text, sender} = request.body

    try{
        const newMessage = new Message({
            text,
            sender
        })
        await newMessage.save()

        if (sender === 'user'){
            const botResponse = await getBotResponse(text)
            const botMessage = new Message({text: botResponse, sender: 'bot'})
            await botMessage.save()
            response.json(botMessage)
        }else {
            response.json(newMessage)
        }
    }catch (err){
        response.status(500).json({error: 'Failed to send message'})
    }
})

const getBotResponse = async (userInput) =>{
    try{
        const response = await axios.post('https://api.openai.com/v1/chat/completions',{
            models: 'ft:gpt-4o-mini-2024-07-18:personal::ABYV0zxI',
            message: [{role: 'user', content: userInput}]
        },{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        })
        const botReply = response.data.choices[0].message.content.trim()
        return botReply
    }catch ()
}

module.exports = router