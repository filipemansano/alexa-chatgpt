import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SendMessageOptions } from "chatgpt";
import { chatgpt } from "./lib/openai.js";
import { analyzeText, getClient } from "./lib/googleapis.js";

let googleApiClient: any = null;

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {

    let toxicity: number = null;
    const request = JSON.parse(event.body);

    const config: SendMessageOptions = {};

    if (request.parentMessageId) {
        config.parentMessageId = request.parentMessageId;
    }

    const response = await chatgpt.sendMessage(request.message, config);

    if (request.measureToxicity && request.measureToxicity === true) {

        if(!googleApiClient){
            googleApiClient = await getClient();
        }

        try {
            toxicity = await analyzeText(response.text, googleApiClient);
        } catch (e) {
            console.log(e);
        }
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: response.id,
            text: response.text,
            toxicity: toxicity
        })
    }
};