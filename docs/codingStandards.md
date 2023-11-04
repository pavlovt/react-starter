# Coding standards

## General rules

- **Readable**: The development performance improves when the whole codebase has same consistent style
- **Testable**: It can be tested at the code level
- **Maintainable**: It can be maintained, even as your codebase grows
- **Portable**: It works the same in every environment

## Using only one editor on the frontend

Using Visual Studio Code editor is obligatory for all the frontend developers.
The project is configured with custom settings for this editor and also the automated formatting (with prettier) is used through it.

In order to use VS Code properly with prettier and Tailwind CSS the following extensions have to be installed:

- https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next
- https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css
- https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors
- https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
- https://marketplace.visualstudio.com/items?itemName=heybourn.headwind
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## Specific rules

- All files, containing JSX code shall have the “.tsx “extension
- Naming conventions:
  - components should use title case (AnExample)
  - directories and services should use camel case (anExample)
- Comments:
  - the naming of the variables and functions should be clear self explanatory. Use comments only on complex functions or blocks of code that are hard to understand
  - commenting unused code is forbidden and should be removed
- Logs: no console.logs or debuggers should be left in the code
- Components should not contain business logic: it should be either on the backend side or in the store
- do not overuse the ternary operator: prefer the "if" statement instead
- be careful with the "switch" operator: preferably use "return" on every case (because uou may forget to use "break" and these bugs are hard to catch)
- JavaScript looks like Java or C# but it is a functional language based on [Scheme](<https://en.wikipedia.org/wiki/Scheme_(programming_language)>): try to really understand how it works to avoid creating bugs you cannot fix

## Recommended resources

- [Clean Code - Uncle Bob](https://www.youtube.com/watch?v=7EmboKQH8lM&list=PLmmYSbUCWJ4x1GO839azG_BBw8rkh-zOj)
- JavaScript: The Good Parts by Douglas Crockford
- [Functional Programming in 40 Minutes](https://www.youtube.com/watch?v=0if71HOyVjY)
- [Uncle Bob SOLID principles](https://www.youtube.com/watch?v=zHiWqnTWsn4)
