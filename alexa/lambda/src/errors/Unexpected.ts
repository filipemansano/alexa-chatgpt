import { ErrorHandler } from "ask-sdk-core";
import { Strings, ErrorTypes } from "../utilities/constants";
import i18n from 'i18next';

/**
 * Handles ErrorTypes.Unexpected errors which should be thrown when something
 * unexpected happens.
 */
export const Unexpected: ErrorHandler = {
    canHandle(_, error) {
        return error.name === ErrorTypes.Unexpected;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);


        return handlerInput.responseBuilder
            .speak(i18n.t(Strings.ERROR_UNEXPECTED_MSG))
            .getResponse();
    },
};