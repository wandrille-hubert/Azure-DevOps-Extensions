import path = require('path');
import tl = require('azure-pipelines-task-lib/task');

async function run() {

    try {
        const firstName: string = tl.getInput('firstname', true);
		let lastName: string = tl.getInput('lastname', false);
        if (!firstName) {
            tl.setResult(tl.TaskResult.Failed, 'First name not provided.');
            return;
        }

		// __dirname is the directory path of the current executing file
		let filePath = path.join(__dirname, 'script.ps1');

		// If lastName is null, set to "" or else 'null' will be passed into powershell argument
		if (!lastName) {
			lastName = "";
		}

		let powershell = tl.tool(tl.which('pwsh') || tl.which('powershell') || tl.which('pwsh', true))
            .arg('-NoLogo')
			.arg('-NonInteractive')
            .arg('-NoProfile')
            .arg('-Command')
            .arg(`. '${filePath.replace("'", "''")}'`)
			.arg(`'${firstName}'`)
			.arg(`'${lastName}'`);

        // Run powershell
        let exitCode: number = await powershell.exec();

        // Fail on exit code not equal to 0
        if (exitCode !== 0) {
            tl.setResult(tl.TaskResult.Failed, tl.loc('JS_ExitCode', exitCode));
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();