import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../utilities/helpers';
import { ChatGPT } from '../utilities/ChatGPT';
import { IntentTypes, Strings } from '../utilities/constants';
import i18n from 'i18next';
import { RequestAttributes } from '../interfaces';

export const Conversation: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return IsIntent(handlerInput, IntentTypes.Conversation);
    },
    async handle(handlerInput: HandlerInput) {

        const speechText = i18n.t(Strings.CONVERSATION_MSG);
        const speechEmptyText = i18n.t(Strings.CONVERSATION_EMPTY_MSG);

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        if (!sessionAttributes.talking) {
            sessionAttributes.talking = true;
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechEmptyText)
                .getResponse();
        }


        const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
        const userInput = attributes.slots.sentence.value;

        const speechErrorText = i18n.t(Strings.CONVERSATION_ERROR_MSG);
        const speechQuestionText = i18n.t(Strings.CONVERSATION_QUESTION_MSG);

        if (!userInput) {
            return handlerInput.responseBuilder
                .speak(speechErrorText)
                .reprompt(speechQuestionText)
                .getResponse();
        }

        const speechMoreText = i18n.t(Strings.CONVERSATION_SPEAK_MORE_MSG);
        let responseText = null;

        try{
            const response = await ChatGPT.sendMessage(
                userInput,
                sessionAttributes.parentMessageId
            );
    
            sessionAttributes.parentMessageId = response.id;
    
            responseText = (response.toxicity === null || response.toxicity > 0.6)
                ? i18n.t(Strings.FILTERED_ANSWER) 
                : response.text;

        }catch(e){
            responseText = i18n.t(Strings.CHATGPT_GENERAL_ERROR);
            console.error(e);
        }

        return handlerInput.responseBuilder
            .speak(responseText)
            .reprompt(speechMoreText)
            .getResponse();
    },
};