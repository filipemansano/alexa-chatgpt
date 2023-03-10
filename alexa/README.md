@@ -0.0 +1.68 @@
# Alexa Custom Skill
This project demonstrates how to create a custom alexa skill to communicate with the previously created ChatGPT API.

## Prerequisites

* ASK CLI
   * An [Amazon developer](https://developer.amazon.com/) account. Registration is free.
   * Node.js and npm, which come with Node.js. The ASK CLI requires Node.js version 8.3 or higher, but we recommend that you use the current or active LTS version of Node.js. To install or update your version of Node.js, see the Node.js downloads page. To check your Node.js version, open a command prompt and type `node --version`.

# Installation

**1. Install CLI**

```
$ npm install -g ask-cli
```


**two. Configure CLI profile**

Before you start using the ASK CLI, configure your ASK (and AWS) credentials:
```
$ ask configure
```

You will be asked to log in to your Amazon developer account. If you choose to have your skill hosted by AWS, you also have the option to link your AWS account.

<p align="center">
   <img align="center" src="https://ask-cli-static-content.s3-us-west-2.amazonaws.com/document-assets/v2-ask-cli-configure.gif" height= "520" />
</p>

Here is an overview of each of the files and folders created by default:

  File/Folder | Description |
| :------------- | :----------- |
| skill-package/ | Skill Resources Used by the ASK Platform, such as Skill Manifest, Interaction Models, and Assets |
| lambda/ | Contains source code for your skill that uses the ASK SDK |
| infrastructure/ | Contains your CloudFormation definitions for deploying your skill to AWS |
| ask-resources config | Setup for Your Alexa Skill Project |

## Deploy Alexa skill

In order for Alexa to communicate with your skill code, it will need to be deployed and hosted in the cloud using this command.

_first of all change the `aks-resources.json` file on line 21 to the address of your API Gateway_

```
$ ask deploy
```

The deploy command performs the following steps:

1. `skill-package/` resources will be packaged and uploaded to the ASK platform via SMAPI's [Skill Package Service](https://developer.amazon.com/docs/smapi/skill-package-api-reference.html) .
2. `lambda/` source files will be created and packaged for deployment to AWS.
3. `infrastructure/` definitions will be used to provision resources in AWS. The `lambda/` zip file from the previous step will be deployed to the provisioned AWS Lambda function. The gif below shows deployment using `@ask-cli/cfn-deployer`

<p align="center">
   <img align="center" src="https://ask-cli-static-content.s3-us-west-2.amazonaws.com/document-assets/v2-ask-cli-deploy.gif" height= "520" />
</p>


**5. Interact with the app**

To test while building your skill locally, or quickly show your skill ideas, or even build end-to-end tests, you can use the CLI command dialog.

```
$ ask dialog
```