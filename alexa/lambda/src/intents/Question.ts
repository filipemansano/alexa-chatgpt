import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../utilities/helpers';
import { ChatGPT } from '../utilities/ChatGPT';
import { IntentTypes, Strings } from '../utilities/constants';
import i18n from 'i18next';
import { RequestAttributes } from '../interfaces';

export const Question: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return IsIntent(handlerInput, IntentTypes.Question);
    },
    async handle(handlerInput: HandlerInput) {

        const speechText = i18n.t(Strings.QUESTION_MSG);

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const attributes = handlerInput.attributesManager.getRequestAttributes()  as RequestAttributes;;

        let responseText = null;

        console.log(`user input: ${attributes.slots.question.value}`);

        try{
            let userInput = attributes.slots.question.value;

            if(!sessionAttributes.parentMessageId){
                userInput = `${i18n.t(Strings.DISCLAIMER)}\n\n ${userInput}`
            }

            const response = await ChatGPT.sendMessage(
                attributes.slots.question.value, 
                sessionAttributes.parentMessageId,
                false
            );

            if(!response.text){
                responseText = i18n.t(Strings.CHATGPT_GENERAL_ERROR);
                console.log(response);
            }else{
                sessionAttributes.parentMessageId = response.id;
        
                /*responseText = (response.toxicity === null || response.toxicity > 0.6)
                    ? i18n.t(Strings.FILTERED_ANSWER) 
                    : response.text;*/
                
                responseText = response.text;
            }

        }catch(e){
            responseText = i18n.t(Strings.CHATGPT_GENERAL_ERROR);
            console.log(e);
        }

        console.log(`alexa response: ${responseText}`);

        return handlerInput.responseBuilder
            .speak(responseText)
            .reprompt(speechText)
            .getResponse();
    },
};