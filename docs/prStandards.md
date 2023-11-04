# Pull request, commit and branch naming standards

## Branching strategy

We are following the [Git flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model. In it you have:

- main branch for production
- develop branch for features
- feature branch for new features (e.g. feature/123-short-explanation where 123 is the id of the story, you are working on)
- bugfix branch for fixing bugs in develop (e.g. bugfix/123-short-explanation where 123 is the id of the bug)
- hotfix branch for fixing bugs in production (e.g. hotfix/123-short-explanation where 123 is the id of the bug)

For more details see [here](https://github.com/JsonMa/validate-branch-name).

## Commit message rules

- example commit message: feat(SPI-42, fe): Create Footer component
- each message starts with feat, fix or test
- in braces add the story id (SPI-42) and if the task is a frontend or a backend task
- after the column explain what this commit is about

For more details see [here](https://www.conventionalcommits.org/en/v1.0.0/#summary).

## PR Rules

You will see the PR rules when you open new PR and you need to check and execute each one of them.
They are also repeated bellow:

1. Make sure you follow the Code Review Checklist in the [Coding Standards document](./codingStandards.md)
2. Make sure to run `yarn lint` before creating the PR
3. Make sure to follow the Code message rules for the PR title
