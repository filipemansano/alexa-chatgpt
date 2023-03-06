import { chatgpt } from "./lib/openai.js";
export const lambdaHandler = async (event, context) => {
    const request = JSON.parse(event.body);
    const config = {};
    if (request.parentMessageId) {
        config.parentMessageId = request.parentMessageId;
    }
    const response = await chatgpt.sendMessage(request.message, config);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: response.id,
            text: response.text
        })
    };
};
