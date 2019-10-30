const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');


try {
    const projectName = core.getInput('project-name');
    const gistId = core.getInput('gist-id');
    const accessToken = core.getInput('access-token');
    const coverageSummary = core.getInput('coverage-summary');

    console.log(projectName, gistId, coverageSummary);

    let myOutput = '';
    let myError = '';

    const options = {};
    options.listeners = {
        stdout: (data) => {
            myOutput += data.toString();
        },
        stderr: (data) => {
            myError += data.toString();
        }
    };
    options.cwd = './lib';
    console.log(myOutput);
    console.log(myError);




    await exec.exec('ls');
    await exec.exec('cat', [coverageSummary], options);


    const json = require(coverageSummary);

    const summary =
        `All files: \n Statements: ${json.total.statements.pct}%, ` +
        `Branches: ${json.total.branches.pct}%, ` +
        `Functions: ${json.total.functions.pct}%, ` +
        `Lines: ${json.total.lines.pct}%`;


    console.log("Summary", summary);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}