const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');
const fs = require('fs');


try {
    const projectName = core.getInput('project-name');
    const gistId = core.getInput('gist-id');
    const accessToken = core.getInput('access-token');
    const coverageSummary = core.getInput('coverage-summary');

    console.log(projectName, gistId, coverageSummary);

    // First I want to read the file
    const coverageFile = fs.readFileSync(coverageSummary, 'utf8');
    console.log(coverageFile);
    const json = JSON.parse(coverageFile);
    const summary =
        `All files: \n Statements: ${json.total.statements.pct}%, ` +
        `Branches: ${json.total.branches.pct}%, ` +
        `Functions: ${json.total.functions.pct}%, ` +
        `Lines: ${json.total.lines.pct}%`;


    console.log("Summary", summary);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}