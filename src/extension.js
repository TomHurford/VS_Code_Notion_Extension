// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const tree = require('./utils/tree');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('NEW RUN ----------------------------');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscodenotion.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		tree.getTree('0c435fe0-b8fe-4638-af89-4e1105ce5305');
	});

	context.subscriptions.push(disposable);

	const panel = vscode.window.createWebviewPanel(
		'vscodenotion',
		'vsCodeNotion',
		vscode.ViewColumn.One,
		{
			// Enable javascript in the webview
			enableScripts: true
		}
	);

	// And set its HTML content
	panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<h1>Hello World</h1>
	</body>
	</html>`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
