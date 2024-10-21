const express = require('express')
const router = express.Router()
const Message = require('../models/Message')
const {getBotResponse} = require('../services/modelServices')

router.get('', async (request,response)=>{
    try{
        const messages = await Message.find().sort({timestamp: 1})
        response.json(messages)
    }catch (err){
        response.status(500).json({error: 'Failed to fetch messages'})
    }
})

router.post('', async (request,response)=>{
    const {text, sender} = request.body

    try{
        const newMessage = new Message({
            text,
            sender
        })
        await newMessage.save()

        if (sender === 'user'){
            const history = await Message.find().sort({timestamp: 1})

            const contextMessages = history.map(message =>({
                role: message.sender === 'user' ? 'user' : 'assistant',
                content: message.text
            }))

            contextMessages.push({role: 'user', content: text})

            const botResponse = await getBotResponse(contextMessages)
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

module.exports = router