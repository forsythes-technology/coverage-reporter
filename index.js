const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const io = require('@actions/io');

async function getFile() {
    await io.mkdirP('temp');
    await io.cp('./coverage-summary.json', 'temp');

    const json = require('temp/coverage-summary.json');
    console.log("FILE", json);

}

try {
    const projectName = core.getInput('project-name');
    const gistId = core.getInput('gist-id');
    const accessToken = core.getInput('access-token');
    const coverageSummary = core.getInput('coverage-summary');

    console.log(projectName, gistId, coverageSummary);

    getFile();
    // const summary =
    //     `All files: \n Statements: ${json.total.statements.pct}%, ` +
    //     `Branches: ${json.total.branches.pct}%, ` +
    //     `Functions: ${json.total.functions.pct}%, ` +
    //     `Lines: ${json.total.lines.pct}%`;


    // console.log("Summary", summary);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}