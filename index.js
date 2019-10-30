const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');


try {
    const projectName = core.getInput('project-name');
    const gistId = core.getInput('gist-id');
    const gitHubUser = core.getInput('github-user');
    const accessToken = core.getInput('access-token');
    const coverageSummary = core.getInput('coverage-summary');

    console.log(projectName, gistId, coverageSummary);

    // First I want to read the file
    const json = JSON.parse(fs.readFileSync(coverageSummary, 'utf8'));
    const summary =
        `All files: \n Statements: ${json.total.statements.pct}%, ` +
        `Branches: ${json.total.branches.pct}%, ` +
        `Functions: ${json.total.functions.pct}%, ` +
        `Lines: ${json.total.lines.pct}%`;

    const request = require('request');
    const url = `https://api.github.com/gists/${gistId}`; //
    const options = {
        url: url,
        method: 'patch',
        auth: {
            user: gitHubUser,
            password: accessToken
        },
        headers: {
            'User-Agent': 'Github-Activity'
        },
        body: {
            description: 'Code Coverage Reports',
            files: { projectName: { filename: projectName, content: summary } }
        },
        json: true
    };
    request(options, function(error, response, body) {
        if (error) {
            console.log(error)
            return
        }
        console.log(`Sending coverage report to Gist: (https://gist.github.com/${gitHubUser}/${gistId})`);
        console.log('Status Code', response.statusCode)
    });

    console.log("Summary", summary);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}