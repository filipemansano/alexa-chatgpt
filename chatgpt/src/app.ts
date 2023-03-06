import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SendMessageOptions } from "chatgpt";
import { chatgpt } from "./lib/openai.js";

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {

    const request = JSON.parse(event.body);

    const config: SendMessageOptions = {};

    if(request.parentMessageId){
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
    }
};