export enum RequestTypes {
    Launch = 'LaunchRequest',
    Intent = 'IntentRequest',
    SessionEnded = 'SessionEndedRequest',
    SystemExceptionEncountered = 'System.ExceptionEncountered',
}

export enum IntentTypes {
    Help = 'AMAZON.HelpIntent',
    Stop = 'AMAZON.StopIntent',
    Cancel = 'AMAZON.CancelIntent',
    Fallback = 'AMAZON.FallbackIntent',
    Question = 'QuestionIntent',
    Conversation = 'ConversationIntent',
}

export enum ErrorTypes {
    Unknown = "UnknownError",
    Unexpected = "UnexpectedError",
}

export enum LocaleTypes {
    ptBR = 'pt-BR',
    enUS = 'en-US',
}

export enum Strings {
    WELCOME_MSG = 'WELCOME_MSG',
    GOODBYE_MSG = 'GOODBYE_MSG',
    HELP_MSG = 'HELP_MSG',
    ERROR_MSG = 'ERROR_MSG',
    REFLECTOR_MSG = 'REFLECTOR_MSG',
    FALLBACK_MSG = 'FALLBACK_MSG',
    QUESTION_MSG = 'QUESTION_MSG',
    ERROR_UNEXPECTED_MSG = "ERROR_UNEXPECTED_MSG",
    CONVERSATION_MSG = 'CONVERSATION_MSG',
    CONVERSATION_EMPTY_MSG = "CONVERSATION_EMPTY_MSG",
    CONVERSATION_ERROR_MSG = "CONVERSATION_ERROR_MSG",
    CONVERSATION_QUESTION_MSG = "CONVERSATION_QUESTION_MSG",
    CONVERSATION_SPEAK_MORE_MSG = "CONVERSATION_SPEAK_MORE_MSG",
    FILTERED_ANSWER = "FILTERED_ANSWER",
    CHATGPT_GENERAL_ERROR = "CHATGPT_GENERAL_ERROR",
    DISCLAIMER = "DISCLAIMER",
}