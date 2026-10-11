# Plan

- [x] Complete initial project and tooling setup
- [ ] Add the ability to add and fetch "track" objects by ID, holding data in memory for now. Implement using TDD and validate data.
- [ ] Ensure meaningful error handling and responses for a range of cases incl. when there are no results.
- [ ] Verify the API runs successfully on localhost.
- [ ] Document endpoints.
- [ ] Briefly document use and decisions made during development.

# Stack Decisions

The stack decisions made in the project with brief reasoning:

- `TypeScript` has been chosen over JavaScript due to the benefits of error detection during development and use in ensuring accurate shapes of data.
- `pnpm` has been chosen for its efficiency and the developers familiarity with it.
- `Express` has been chosen as a framework for simpler routing and middleware, in addition to developer familiarity.
- `Prettier` and `eslint` have been chosen to ensure code quality and style simply with the existing stack.
- `Vitest` has been chosen for it's TypeScript support and developer familiarity.
- `Supertest` has been chosen to test behaviour via the Express app without managing a separate server.
- This repo uses pre-commit hooks, specifically `Husky` so this can be shared between developers. This has been added for developer convenience since no other CI will be implemented at this time. Since the repo is small, this includes typechecking and test, which ideally would be moved out to other CI.
- `Zod` has been chosen for it's compatibility with TypeScript types for consistency when validating data both during development and at runtime.

# Out of Scope

A list of both nice-to-have and important production features that have deliberately not been included for the sake of time:

- Code style/formatting tools will use sensible defaults to save time, but could be made more opinionated.
- CI will not be added at this time. Ideally, CI running on something like GitHub Actions would be added, running tests, typechecking, linting/formatting and build checks on every PR or commit to main.
- OpenAPI documentation or Swagger are out of scope due to time, however, endpoint usage and expected responses are documented in the [README.md](./README.md)
