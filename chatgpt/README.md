# Chat GPT API
Este projeto demonstra como criar uma aplicação que faz a comunicação com o modelo de linguagem Chat GPT usando a AWS Lambda e a API Gateway.

## Pré-requisitos
* AWS CLI (https://aws.amazon.com/cli/)
* SAM CLI (https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js (https://nodejs.org/)
* Conta na AWS com as permissões necessárias para criar e gerenciar recursos.

## Instalação
Clone este repositório em seu computador local.

Navegue até a pasta raiz do projeto e instale as dependências usando o seguinte comando:

```bash
npm install
```

# Configuração

Crie uma chave de API na [OpenAI](https://platform.openai.com/account/api-keys)

![OpenAI](./doc/openaikey.png)

Crie um recurso no AWS Secret Manger para armazenar a chave do OpenAI

_lembre-se de criar na mesma região onde iria ficar sua aplicação_

![OpenAI](./doc/aws-secret-manager-1.png)
![OpenAI](./doc/aws-secret-manager-2.png)
![OpenAI](./doc/aws-secret-manager-3.png)

Após a 3 etapa, clique em "Next", "Next" e "Store"

# Implatação

```bash
npm run generate:layers # gere os arquivos necessários para o layer do lambda
npm run build # converte o codigo typescript em javascript
sam deploy --guided # o argumento --guided é necessário só na primeira vez
```

Siga as instruções para criar o recurso na AWS. Certifique-se de lembrar o nome do recurso, pois ele será necessário para chamar a API.

## Como usar

Acesse seu Rest API no console da AWS para acessar a chave de api gerada para realizar os requests

![api-key](./doc/api-key.png)

_atualize o secret criado anteriormente adicionando essa chave também com a key de **apiKey** ela será necessária da etapa da Alexa_

Para utilizar a API, faça uma requisição POST para a URL da API Gateway, passando o corpo da mensagem em JSON:

```
POST https://<api-gateway-endpoint>/Prod

Header: {
    "Content-Type": "application/json",
    "x-api-key": "xxxxx"
}

Body:
{
  "message": "olá, como posso te ajudar?",
  "parentMessageId": "<opcional>"
}
```

O corpo da resposta terá o ID da mensagem e o texto da mensagem de resposta gerada pelo modelo GPT:

```json
{
  "id": "message-id",
  "text": "resposta do modelo GPT"
}
```

# Analise de tóxicidade da resposta

A função `analyzeText` usa a API de análise de comentários do Google para determinar a probabilidade de um texto ser considerado tóxico. A função recebe um texto como entrada e retorna um valor numérico entre 0 e 1, que representa a pontuação de toxicidade do texto.

Para usar a API do Comment Analyzer, a função faz uma chamada para `google.discoverAPI` para criar um cliente que possa acessar a API. Em seguida, a função constrói uma solicitação de análise de comentários com base no texto de entrada e solicita especificamente uma pontuação de toxicidade. A solicitação é enviada para a API do Comment Analyzer por meio do método `client.comments.analyze`.

A função espera a resposta da API e extrai a pontuação de toxicidade do resultado. O resultado é retornado como um número entre 0 e 1, que representa a probabilidade de o texto ser considerado tóxico.

A função é tipada com as interfaces `AnalyzeResponse` e `AnalyzeComments`, que definem os tipos de parâmetros e retorno esperados pelo método `client.comments.analyze`. Essas interfaces ajudam a garantir a segurança e a precisão do tipo em tempo de compilação.

Para acessar a API de análise de comentários do Google (também conhecida como "Comment Analyzer"), você precisa seguir as seguintes etapas:

> Antes de tudo você precisa solicitar acesso a essa API preenchendo um formulário no site da Perspective: [acesse o formulário clicando aqui](https://docs.google.com/forms/d/e/1FAIpQLSdhBBnVVVbXSElby-jhNnEj-Zwpt5toQSCFsJerGfpXW66CuQ/viewform), para mais info [clique aqui](https://developers.perspectiveapi.com/s/docs-get-started?language=en_US)

1. Criar uma conta no Google Cloud Platform: Acesse https://console.cloud.google.com e crie uma conta. Se você já tem uma conta, faça login.

2. Criar um projeto: Na página inicial do Google Cloud Console, clique no botão "Select a Project" no topo da página e selecione "New Project". Dê um nome ao projeto e clique em "Create".

3. Ativar a API do Comment Analyzer: No painel de controle do projeto, navegue até "APIs & Services" > "Dashboard". Clique em "+ ENABLE APIS AND SERVICES" e procure por "Comment Analyzer API". Selecione a API e clique em "Enable".

4. Criar credenciais: Ainda na página "APIs & Services", clique em "Create credentials". Selecione "API key" e copie a chave gerada. Você usará essa chave em sua função para autenticar a solicitação à API.

5. Configurar as permissões da API: Na página de detalhes da API Comment Analyzer, clique em "CREATE CREDENTIALS" e selecione "Service account key". Siga as etapas para criar uma nova chave de conta de serviço. Você usará essa chave em sua função para autenticar a solicitação à API.

6. Usar a API em sua função: Com as credenciais de API e permissões configuradas, você pode usar a API do Comment Analyzer em sua função. Certifique-se de que a chave da API esteja incluída em suas solicitações e que as permissões de acesso à API estejam definidas corretamente.

7. Atualize seu Secret Manager e adicione a key `googleApiKey` com o valor a chave da sua API no google

Observação: O uso da API do Comment Analyzer do Google pode estar sujeito a cobranças. Consulte a documentação da API para obter mais informações sobre as políticas de preços e limites de uso.

## Arquitetura
A arquitetura da aplicação consiste em:

* **API Gateway**: fornece um ponto de entrada para a API.
* **AWS Lambda**: executa o código da aplicação e faz chamadas para a API do OpenAI.
* **OpenAI API**: modelo de linguagem Chat GPT que gera respostas com base nas entradas fornecidas.
* **AWS Secrets Manager**: armazena a chave de acesso para as credenciais da API do OpenAI.

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.