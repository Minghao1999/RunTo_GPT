const { Pinecone } = require('@pinecone-database/pinecone')
const openai = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const getPineconeContext = async (queryText) => {
    const index = pinecone.Index('minghao');
    const queryEmbedding = await getEmbeddings(queryText);

    const queryResponse = await index.namespace('pet').query({
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

        const systemContext = [
            { role: 'system', content: `
                Your name is RunTo.
                You are an assistant whose knowledge is limited to the information provided in the vector database and general knowledge about cats and dogs.
                You must prioritize using the retrieved context from the database to answer the user's question.
                
                Rules:
                - If the answer can be found in the retrieved context, respond using that context.
                - If the question is about cats or dogs and the answer is not available in the context, you may use your general knowledge about cats or dogs to answer.
                - For questions unrelated to cats or dogs, and if no relevant information is found in the context, respond with "I'm sorry, I don't have that information."
               
            `}
        ]

        contextMessages.push({ role: 'system', content: `Relevant information: ${retrievedContext}` });

        const finalMessages = [...systemContext, ...contextMessages];

        const response = await openai.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: finalMessages
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
