# Plan

- [x] Complete initial project and tooling setup
- [x] Add the ability to add and fetch "track" objects by ID, holding data in memory for now. Implement using TDD and validate data.
- [x] Ensure meaningful error handling and responses for a range of cases incl. when there are no results.
- [x] Verify the API runs successfully on localhost.
- [x] Document endpoints.
- [x] Briefly document use and decisions made during development.
- [x] Verify a clean install, run all checks, and confirm the compiled API works.

# Stack & Decisions

The stack decisions made in the project with brief reasoning:

- `TypeScript` has been chosen over JavaScript due to the benefits of error detection during development and use in ensuring accurate shapes of data.
- `pnpm` has been chosen for its efficiency and the developers familiarity with it.
- `Express` has been chosen as a framework for simpler routing and middleware, in addition to developer familiarity.
- `Prettier` and `eslint` have been chosen to ensure code quality and style simply with the existing stack.
- `Vitest` has been chosen for it's TypeScript support and developer familiarity.
- `Supertest` has been chosen to test behaviour via the Express app without managing a separate server.
- This repo uses pre-commit hooks, specifically `Husky` so this can be shared between developers. This has been added for developer convenience since no other CI will be implemented at this time. Since the repo is small, this includes typechecking and test.
- `Zod` has been chosen for it's ability to provide runtime validation and align this with it's inferred TypeScript types based on schemas.
- Storage is accessed via a repository in a standard design pattern, so another storage mechanism can easily be added without significant change to the service.
- Application errors have a status and code and shared middleware converts them into consistent JSON responses.

# Out of Scope

A list of both nice-to-have and important production features that have deliberately not been included for the sake of time:

- CI will not be added at this time. Ideally, CI running on something like GitHub Actions would be added, running tests, typechecking, linting/formatting and build checks on every PR or commit to main.
- OpenAPI documentation or Swagger are out of scope due to time, however, endpoint usage and expected responses are documented in the [README.md](./README.md)
- To fit the original requirements, there is only in-memory storage for this API, nothing persists when the service restarts.
- Authentication, structured logging, rate limiting and centralised monitoring are all out of scope in this small system but would likely be requirements for a production API.
- Additional failure path testing and logging would be added with more time.
