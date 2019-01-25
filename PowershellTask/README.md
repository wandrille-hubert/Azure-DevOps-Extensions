# Introduction 
Sample Azure DevOps\TFS Extension Task to run a powershell script.


# To Use
- Make sure you have node.js version 4 or greater installed.  It can be found at https://nodejs.org/

- Once installed, from a command prompt run npm install -g tfx-cli in order to install the CLI.

- Download the sample.

- This sample relies on the VstsTaskSdk Powershell Module (https://www.powershellgallery.com/packages/VstsTaskSdk/).  In order to install it, open up Powershell, travel to the root directory of the solution, and then into the BuildTask folder.

- First you will want to make a folder where the module is to be saved to: mkdir ps_modules

- Travel into the ps_modules directory.

- Now execute: Save-Module -Name VstsTaskSdk -Path .

- This module provides us access to various APIs that allow us to interact with Azure DevOps\TFS.


# File Structure
- vss-extension.json:
	- provides basic information about the extension
	- you will want to update the publisher to your own.  Information to create your own can be found at: https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azdevops
	- more information can be found at: https://docs.microsoft.com/en-us/azure/devops/extend/develop/manifest?view=azdevops
	- there is a flag to make your extension public or private: in order to be able to create public extensions, you will need to have your publishing account verified by Microsoft

- images\logo.png:
	- picture used as icon for extension, which is set in vss-extension.json

- task.json:
	- describes the build or release task and is used to render the configuration options to the user
		-configuration options are the inputs
	- also includes which scripts to execute at build/release time
		- section execution

- script.ps1:
	- script that will be run
	- within here, couple of examples of ways to interact with Azure DevOps\TFS:
		- Get-VstsTaskVariable: get the Azure DevOps\TFS task variables
		- Get-VstsInput: get the Azure DevOps\TFS task configuration inputs
		- Trace-VstsEnteringInvocation (Trace-VstsLeavingInvocation): trace verbose information when entering/leaving a function or script
		- To see the list of possible commands: https://github.com/Microsoft/azure-pipelines-task-lib/tree/master/powershell/Docs/FullHelp


# Extension Build And Publish
- you will need to have a publishing profile before proceeding

- from within the root directory, run the following command from command prompt:

	tfx extension create
			or
	tfx extension create --manifest-globs vss-extension.json

	- the first command will default to picking vss-extension.json
	- the second command allows you to specify which extension json file to use in case you have multiple/or use different ones for debugging and production

- Running this command will build a .vsix file.  You can then take this file to a TFS server and install it, or navigate to your publishing account in the Marketplace and upload your new extension.

- Then you can share your new extension to specific organizations in the case your extension is set to private

- Side-Note: When updating your extension, remember to update both the version set in the vss-extension.json file as well as the version set in the task.json.  