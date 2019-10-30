# Coverage Reporter

This action uses the GitHub api to store the results of a jest test coverage report in a Gist to be viewed later. 

## Inputs

### `gist-id`
**Required** The id of Gist the report will be saved to.
See (https://developer.github.com/v3/gists/#list-a-users-gists) for how to retrieve gist ids.

### `github-user`
**Required** The GitHub user that will be used to upload the report

### `access-token`
**Required** A GitHub personal access token with the 'gist' scope enabled.

### `coverage-summary`
**Required** The path to the coverage-summary.json file where coverage data is saved.




## Example usage

```yaml
  - name: Save Coverage Report
	uses: forsythes-technology/coverage-reporter@master
	with:
	  gist-id: <gist-id>
	  github-user: ${{ secrets.<github_user> }}
	  access-token: ${{ secrets.<personal_access_key> }}
	  coverage-summary: ./coverage/coverage-summary.json
```
