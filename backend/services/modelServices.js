const { Pinecone } = require('@pinecone-database/pinecone')
const openai = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const getPineconeContext = async (queryText) => {
    const index = pinecone.Index('runto');
    const queryEmbedding = await getEmbeddings(queryText);

    const queryResponse = await index.namespace('test').query({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
    });

    const contexts = queryResponse.matches.map(match => match.metadata.content);
    return contexts.join('\n');
};

const getEmbeddings = async (text) => {
    try {
        const response = await openai.post('https://api.openai.com/v1/embeddings', {
            input: text,
            model: 'text-embedding-ada-002'
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        return response.data.data[0].embedding;
    } catch (err) {
        console.error('Error generating embeddings:', err);
        return [];
    }
};

const getBotResponse = async (contextMessages) => {
    try {
        const userQuestion = contextMessages.find(msg => msg.role === 'user').content;

        const retrievedContext = await getPineconeContext(userQuestion);

        contextMessages.push({ role: 'system', content: `Relevant information: ${retrievedContext}` });

        const response = await openai.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: contextMessages
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const botReply = response.data.choices[0].message.content.trim();
        return botReply;
    } catch (err) {
        console.error('Error calling OpenAI API:', err);
        return 'Sorry, I could not process your request.';
    }
};

module.exports = {
    getBotResponse
}
