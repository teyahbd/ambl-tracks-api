# Plan

- [ ] Complete initial project and tooling setup
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

# Out of Scope

A list of both nice-to-have and important production features that have deliberately not been included for the sake of time:
