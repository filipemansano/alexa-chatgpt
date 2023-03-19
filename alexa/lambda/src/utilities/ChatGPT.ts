import * as https from 'https';

export const ChatGPT = {
    async sendMessage(message: string, parentMessageId: string | null): Promise<{
        text: string
        id: string,
        toxicity: number|null
    }> {
        const data = new TextEncoder().encode(JSON.stringify({ 
            message: message, 
            parentMessageId: parentMessageId,
            measureToxicity: true
         }));
    
        const options: https.RequestOptions = {
            hostname: process.env.CHAT_GPT_DOMAIN,
            path: process.env.CHAT_GPT_PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CHAT_GPT_KEY,
                'Content-Length': data.length.toString()
            },
        }
    
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                res.setEncoding('utf8');
                let responseBody = '';
    
                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
    
                res.on('end', () => {
                    resolve(JSON.parse(responseBody));
                });
            });
    
            req.on('error', (err) => {
                reject(err);
            });
    
            req.write(data)
            req.end();
        });
    }
}