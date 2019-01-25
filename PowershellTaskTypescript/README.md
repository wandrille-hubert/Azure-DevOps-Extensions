# Introduction 
Sample Azure DevOps\TFS Extension Task to run a powershell script called from typescript.


# To Use
- Make sure you have node.js version 4 or greater installed.  It can be found at https://nodejs.org/

- Once installed, you will want to install the CLI, from a command prompt run:
	- **npm install -g tfx-cli**

- Make sure you have typescript installed.  This can be installed by running:
	- **npm install -g typescript**

- Download the sample.

- In a command prompt, travel to the root directory of the sample.  Travel to the BuildTask folder.

- Run the following command to create a package.json file: 
	- **npm init**
	- you can accept all of the default options

- This sample relies on the azure-pipelines-task-lib library.  This can be added by running: 
	- **npm install azure-pipelines-task-lib --save**

- After running this, you should see a node_modules folder created in your BuildTask folder.

- This library provides us access to various APIs that allow us to interact with Azure DevOps\TFS.

- Install the Typescript typings by running the following two commands:
	- **npm install @types/node --save-dev**
	- **npm install @types/q --save-dev**

- The next step is to initialize our typescript json file by running:
	- **tsc --init**
	- this will create a tsconfig.json file.  By default, it is set to compile to the ES5 standard.  You can update to point to ES6 standard if desired.


# File Structure
- vss-extension.json:
	- provides basic information about the extension
	- you will want to update the publisher to your own.  Information to create your own can be found at: https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azdevops
	- there is a flag to make your extension public or private: in order to be able to create public extensions, you will need to have your publishing account verified by Microsoft
	- more information can be found at: https://docs.microsoft.com/en-us/azure/devops/extend/develop/manifest?view=azdevops

- images\logo.png:
	- picture used as icon for extension, which is set in vss-extension.json

- task.json:
	- describes the build or release task and is used to render the configuration options to the user
		-configuration options are the inputs
	- also includes which files to execute at build/release time
		- section execution

- tsconfig.json:
	- holds typescript arguments, properties and compiler options
	- more information: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

- index.ts:
	- file that will be executed
	- within here, couple of examples of ways to interact with Azure DevOps\TFS:
		- .getInput: get the Azure DevOps\TFS task configuration inputs
		- .setResult: set the Azure DevOps\TFS task result

- script.ps1:
	- script that is called from within index.ts

- package.json/package-lock.json:
	- created when npm init is ran
	- contains list of dependencies and package versions to use


# Extension Build And Publish
- You will need to have a publishing profile before proceeding

- To compile typescript into javascript, you will want to run the command: 
	- **tsc**

- From within the root directory, run the following command from command prompt:
	- **tfx extension create** or **tfx extension create --manifest-globs vss-extension.json**
	- the first command will default to picking vss-extension.json
	- the second command allows you to specify which extension json file to use in case you have multiple/or use different ones for debugging and production

- Running this command will build a .vsix file.  You can then take this file to a TFS server and install it, or navigate to your publishing account in the Marketplace and upload your new extension.

- Then you can share your new extension to specific organizations in the case your extension is set to private

- Side-Note: When updating your extension, remember to update both the version set in the vss-extension.json file as well as the version set in the task.json. 


# Local Testing
- This task can locally be tested.  Open up Powershell and travel to the root directory\BuildTask folder.

- Run the following command:
	- **node index.js**
	- (this is what the agent will be doing)

- The task will fail and that is because no inputs were supplied and firstname is a required input.  We have the ability to set an input from Powershell:
	- **$env:INPUT_FIRSTNAME="Bob"**

- Run it again and this time the task will succeed.  You can play with adding in the lastname input as well and removing it.