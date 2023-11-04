# Code Review

## General rules

1. All code should be reviewed.
2. Everyone should review the code.
3. Don’t argue over code style and formatting issues. Use automatic tools.
4. Pull request should be reviewed at least by 1 person.

## For Submitters

1. Pull request should contain finished functionality.
   a. On exceptional cases large functionality can be delivered in multiple pieces, but in this cases nothing should be broken and unfinished functionality should not be visible to user.
2. Pull request should set up review context:
   a. Clear and concise title which describe functionality included to review.
   b. Clear explanation of what is included into pull request.
3. Run build on your local machine and verify acceptance criteria before creating pull request.
4. Changes included in pull request should not issue new code analysis issues.
5. Create pull request for code review only when CI is finished to build the feature branch and there are no failed unit tests.
6. Pull request should be merged without conflicts.
7. Provide meaningful name for pull request. Pull request should be linked with work item.

## For Reviewers

1. Code review task is of a higher priority than a development one.
2. Use checklist
3. Provide feedback/comment in polite manner.
4. Comment on specific lines of code if you can to say where the code doesn’t meet standards or could be improved.

## Code Review Checklist

### General

- Does the code work? Does it perform its intended function, the logic is correct etc. Check with task acceptance criteria.
- Is all the code easily understood?
- Does it conform to your agreed coding conventions? These will usually cover location of braces, variable and function names, line length, indentations, formatting, and comments.
- Is there any redundant or duplicate code?
- Is the code as modular as possible?
- Can any global variables be replaced?
- Is there any commented out code?
- Do loops have a set length and correct termination conditions?
- Can any of the code be replaced with library functions?
- There should be no logging or debugging code?

### Coding

- View does not contain any business logic?
- Are third party libraries used via wrappers?
- Does the code have hidden dependencies?

### Security

- Are all data inputs checked (for the correct type, length, format, and range)?
- Where third-party utilities are used, are returning errors being caught?
- Are output values checked?
- Are invalid parameter values handled?
- Is sensitive data used properly? E.g no sensitive data is written to application logs, system credential storage facilities are used appropriately to store sensitive data, etc.

### Documentation

- Do comments exist and describe the intent of the code?
- Is any unusual behavior or edge-case handling described?
- Is the use and function of third-party libraries documented?
- Are data structures and units of measurement explained?
- Is there any incomplete code? If so, should it be removed or flagged with a suitable marker like ‘TODO’?
