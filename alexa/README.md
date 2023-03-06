# Alexa Custom Skill
Este projeto demonstra como criar uma habilidade personalizada da alexa para se comunicar com a Api do ChatGPT criada anteriormente.

## Pré-requisitos

* ASK CLI
  * Uma conta de [desenvolvedor da Amazon](https://developer.amazon.com/). A inscrição é gratuita.
  * Node.js e npm, que vem com o Node.js. O ASK CLI requer Node.js versão 8.3 ou superior, mas recomendamos que você use a versão atual ou a versão LTS ativa do Node.js. Para instalar ou atualizar sua versão do Node.js, consulte a página de downloads do Node.js. Para verificar sua versão do Node.js, abra um prompt de comando e digite `node --version`.

# Instalação

**1. Install CLI**

```
$ npm install -g ask-cli
```


**2. Configure CLI profile**

Antes de começar a usar o ASK CLI, configure suas credenciais ASK (e AWS):
```
$ ask configure
```

Você será solicitado a fazer login na sua conta de desenvolvedor da Amazon. Se você optar por ter sua habilidade hospedada pela AWS, também terá a opção de vincular sua conta da AWS.

<p align="center">
  <img align="center" src="https://ask-cli-static-content.s3-us-west-2.amazonaws.com/document-assets/v2-ask-cli-configure.gif" height="520" />
</p>

Aqui está uma visão geral de cada um dos arquivos e pastas criados por padrão:

 File/Folder       | Description  |
| :--------------   | :----------- |
| skill-package/    | Recursos de habilidades utilizados pela plataforma ASK, como manifesto de habilidades, modelos de interação e ativos |
| lambda/	          | Contém o código-fonte para sua habilidade que utiliza o ASK SDK |
| infrastructure/   | Contém suas definições do CloudFormation para implantar sua habilidade na AWS |
| ask-resources config     | Configuração para seu projeto de habilidade Alexa |

## Deploy Alexa skill

Para que o Alexa se comunique com seu código de habilidade, ele precisará ser implantado e hospedado na nuvem usando este comando.

_antes de tudo altere o arquivo `aks-resources.json` na linha 21 para o endereço do seu API Gateway_

```
$ ask deploy
```

O comando deploy executa as seguintes etapas:

1. `skill-package/` os recursos serão compactados e enviados para a plataforma ASK via SMAPI's [Skill Package Service](https://developer.amazon.com/docs/smapi/skill-package-api-reference.html).
2. `lambda/` os arquivos de origem serão criados e compactados para implantação na AWS.
3. `infrastructure/` as definições serão usadas para provisionar recursos na AWS. O arquivo zip `lambda/` da etapa anterior será implantado na função provisionada do AWS Lambda. O gif abaixo mostra a implantação usando `@ask-cli/cfn-deployer`

<p align="center">
  <img align="center" src="https://ask-cli-static-content.s3-us-west-2.amazonaws.com/document-assets/v2-ask-cli-deploy.gif" height="520" />
</p>


**5. Interagir com a aplicação**

Para testar enquanto desenvolve sua habilidade localmente, ou mostrar rapidamente suas ideias de habilidade, ou até mesmo construir testes de ponta a ponta, você pode usar o comando de diálogo da CLI.

```
$ ask dialog
```
