# Contribution Guidelines

First off, thanks for taking the time to contribute! :+1:

## I just have a question

You can launch a quick question on the [#acpaas-ui-ngx slack channel](https://digantcafe.slack.com/messages/CDF95H5B7). If you're not yet a member of our DigAnt Café slack community, you can easily [join here](https://digantcafe-slack.digipolis.be/).

For something that requires longer discussion it may be better to book an issue.

## How do I report bugs / ask features?

Please book a GitHub issue.

## What should I know to get started?

This component is part of the [ACPaaS UI platform](https://acpaas-ui.digipolis.be).

Before contributing code, you should be aware of the following:

- All code should conform to the [Angular style guide](https://angular.io/guide/styleguide), as well as the [ACPaaS UI guidelines](https://acpaas-ui.digipolis.be/docs/guidelines).

## How can I contribute code?

### Code layout

- `./src` contains the component and decorator source
- `./example` contains the demo app

### Building and Testing

`> npm install`

Commands:

- Start the demo app

  `> npm start`

- Run the tests (continously)

  `> npm run test-watch`

  Code coverage reports are output to the `./coverage` folder.

- Lint and test (once)

  `> npm test`

This repo is based on the [Angular Library Starter Kit](https://github.com/zurfyx/angular-library-starter-kit). See its documentation for more details (such as how to write tests).

### Submitting Changes

Please send us your changes as a GitHub pull request.

In order for us to be able to accept your pull request without remarks, please do these things:

- Follow the above style guides.
- Please update the readme documentation and example app along with the code.
- Make sure all the tests pass.
- Provide a clear description on the pull request of what was changed
- Link to a relevant issue. Feel free to create one if none exists.

If possible, do provide meaningful and clean commit messages. A [good commit message](https://chris.beams.io/posts/git-commit/) completes the sentence "When committed this will …"

### Publishing

> Only the ACPaaS UI team publishes new packages. [Contact us](https://acpaas-ui.digipolis.be/contact) if you need a new release published.

Follow these steps to publish a new version of the package.
You must be a member of the @acpaas-ui organization on NPM.

1. Increment the version in package.json
2. Log in to the npmjs registry

    ```sh
    > npm login
    ```

3. Publish the package

    ```sh
    > npm run build
    > npm publish dist
    ```
