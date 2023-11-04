# React Application

## Installation

```
git clone https://github.com/pavlovt/react-starter.git
cd react-starter
yarn
yarn start
```

## Directory structure

- **docs**: contains all the documentation for the project
- **src\assets**: images, fonts, svg files
- **src\bits**: all reusable components
- **src\core**: core, api, conf and other global services
- **src\store**: all the store (rematch.js) modules
- **tests**: here are the automated tests
- **tests-examples**: example automated tests

## Important files

- **.env**: configuration variables for the site. the most important is SITECORE_API_KEY without which the connection with sitecore will not work
- **.eslintrc**: eslint configuration. if any eslint rule is not necessary it can be added to the exceptions in this file
- **package.json**: all the used packages are here. the most important are the scripts that can be run:
  - **build**: building the site for production
  - **lint**: run it before making a commit to be sure that there are no eslint errors (without fixing them the commit will be canceled)
  - **start:connected**: run the dev server
  - **size**: check the size of the whole project when build
  - **test**: run the automation testing locally with the Playwright ui tool
  - **test-console**: run the automation testing without the ui tool - can be used on Asure
- **tailwind.config.js**: tailwind css configuration file. here we can add new colors that can be reused in the site
- **tsconfig.json**: typescript configuration file. check the "paths" property to see the directories that are directly accessible in the imports

## Documentation

- [Coding standards](./docs/codingStandards.md)
- [Code Review standards](./docs/codeReview.md)
- [Pull Request standards](./docs/prStandards.md)

## Learn More

- [Create React App documentation](https://create-react-app.dev/)
- [.env possible configuration parametars for react-scripts](https://create-react-app.dev/docs/advanced-configuration/)

## Solutions

- [Should I commit the yarn.lock file and what is it for?](https://stackoverflow.com/questions/39990017/should-i-commit-the-yarn-lock-file-and-what-is-it-for)
- [Do I need to import react in every file?](https://stackoverflow.com/questions/71725865/do-i-need-to-import-react-in-every-file)
