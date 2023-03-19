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

        const response = await ChatGPT.sendMessage(
            attributes.slots.question.value, 
            sessionAttributes.parentMessageId
        );

        sessionAttributes.parentMessageId = response.id;

        const responseText = (response.toxicity === null || response.toxicity > 0.6)
            ? i18n.t(Strings.FILTERED_ANSWER) 
            : response.text;

        return handlerInput.responseBuilder
            .speak(responseText)
            .reprompt(speechText)
            .getResponse();
    },
};