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
            sender,
            timestamp: new Date()
        })
        const savedMessage = await newMessage.save()
        response.status(201).json(savedMessage)
    }catch (err){
        console.log('Error saving message:', err)
        response.status(500).json({error:'Failed to save message'})
    }
})

module.exports = router()