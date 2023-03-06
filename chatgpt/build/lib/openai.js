import { ChatGPTAPI } from "chatgpt";
export const chatgpt = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || "",
});
