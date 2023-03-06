import { Strings, LocaleTypes } from './constants';

interface IStrings {
    [Strings.WELCOME_MSG]: string;
    [Strings.GOODBYE_MSG]: string;
    [Strings.HELP_MSG]: string;
    [Strings.ERROR_MSG]: string;
    [Strings.FALLBACK_MSG]: string;
    [Strings.QUESTION_MSG]: string;
    [Strings.CONVERSATION_MSG]: string;
    [Strings.ERROR_UNEXPECTED_MSG]: string;

    [Strings.CONVERSATION_MSG]: string;
    [Strings.CONVERSATION_EMPTY_MSG]: string;
    [Strings.CONVERSATION_ERROR_MSG]: string;
    [Strings.CONVERSATION_QUESTION_MSG]: string;
    [Strings.CONVERSATION_SPEAK_MORE_MSG]: string;
}

export const strings = {
    [LocaleTypes.ptBR]: {
        translation: {
            WELCOME_MSG: 'Chat G. P. T. iniciado, o que você gostaria de fazer?',
            HELP_MSG: 'Eu posso realizar perguntas ou iniciar uma conversa, exemplo, caso você tenha uma dúvida sobre como começar uma dieta, diga: pergunte como começar uma dieta. Ou caso você queira abrir uma conversa, diga: quero conversar.',
            GOODBYE_MSG: 'Tchau tchau!',
            ERROR_MSG: 'Desculpe, não entendi o que você quis dizer. Por favor, tente novamente ou diga ajuda.',
            ERROR_UNEXPECTED_MSG: 'Desculpe, não entendi o que você quis dizer. Por favor, tente novamente ou diga ajuda.',
            QUESTION_MSG: 'O que mais você gostaria de fazer?',

            CONVERSATION_MSG: 'Vamos conversar! O que você gostaria de falar?',
            CONVERSATION_EMPTY_MSG: 'Por favor, diga alguma coisa.',
            CONVERSATION_ERROR_MSG: 'Desculpe, não entendi o que você disse. Poderia repetir, por favor?',
            CONVERSATION_QUESTION_MSG: 'O que você gostaria de falar?',
            CONVERSATION_SPEAK_MORE_MSG: 'O que mais você gostaria de falar?',
        } as IStrings,
    },
    [LocaleTypes.enUS]: {
        translation: {
            WELCOME_MSG: "Chat G.P.T. started, what would you like to do?",
            HELP_MSG: "I can ask questions or start a conversation, for example, if you have a question about how to start a diet, say: ask how to start a diet. Or if you want to open a conversation, say: I want to talk.",
            GOODBYE_MSG: "Bye bye!",
            ERROR_MSG: "Sorry, I don't understand what you mean. Please try again or say help.",
            ERROR_UNEXPECTED_MSG: "Sorry, I don't understand what you mean. Please try again or say help.",
            QUESTION_MSG: "What else would you like to do?",

            CONVERSATION_MSG: "Let's talk! What would you like to talk?",
            CONVERSATION_EMPTY_MSG: "Please say something.",
            CONVERSATION_ERROR_MSG: "Sorry, I didn't understand what you said. Could you repeat, please?",
            CONVERSATION_QUESTION_MSG: "What would you like to talk about?",
            CONVERSATION_SPEAK_MORE_MSG: "What else would you like to talk about?",
        } as IStrings,
    },
};