import * as Alexa from 'ask-sdk-core';
import * as Intents from "./intents";
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        // Default intents
        Intents.Launch,
        Intents.Help,
        Intents.Stop,
        Intents.SessionEnded,
        Intents.SystemExceptionEncountered,
        Intents.Fallback,

        // Custom intents
        Intents.Question,
        Intents.Conversation
    )
    .addErrorHandlers(
        Errors.Unknown,
        Errors.Unexpected
    )
    .addRequestInterceptors(
        Interceptors.Localization,
        Interceptors.Slots
    )
    .lambda();