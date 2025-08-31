# Tonder

Welcome to the documentation for **Tonder**, a developer-focused dating app prototype. This document covers API usage, installation, setup, build and test instructions, and current limitations.

---

## API Documentation

All files in `./src/api` simulate interactions with an external back-end service. These are developer aids and **not production implementations**. Below is an overview of each API module and its intended real-world counterpart:

### `action.ts`

Handles user actions such as "like" and "dislike".

**External API:**

- `POST /user/action`
  - Payload: `{ userId, targetId, actionType }`
  - Response 200: `{}`
  - Response 400: `{ error: "INVALID_ACTION" }`
  - Response 500: `{ error: "GENERIC_ERROR" }`

### `check-match.ts`

Checks if a mutual match exists between two users.

**External API:**

- `GET /user/match?userId=...&targetId=...`
  - Response 200: `{ match: true | false }`
  - Response 500: `{ error: "GENERIC_ERROR" }`

### `db.ts`

This is a development helper file used to simulate low-level database operations. **Note:** It does **not** correspond to any external API endpoint.

### `init.ts`

Initializes a user session or logs in the user.

**External API:**

- `POST /login`
  - Payload: `{ username, password }`
  - Response 200: `{ sessionId, user: { id, name, gender, age, bio, photo, liked, disliked } }`
  - Response 401: `{ error: "INVALID_CREDENTIALS" }`

### `next-user.ts`

Fetches the next profile for the user to review.
**External API:**

- `GET /user/next?userId=...`
  - Response 200: `{ id, name, gender, age, bio, photo }`
  - Response 404: `{ error: "NO_MORE_PROFILES" }`

---

## Install, Setup, Build, Test

### Prerequisites

- Node.js (see `.node-version`)

### Installation

```sh
git clone git@github.com:stenowtf/tonder.git
cd ./tonder
npm install
```

### Development server

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

### Preview production build

```sh
npm run preview
```

### Testing

```sh
npm run test
```

### Coverage

Run test coverage reports using:

```sh
npm run coverage
```

The HTML coverage report is available at `./coverage/index.html`.

## Project structure

- src/ - _Main source code_
  - api/ - _Mock API modules_
  - components/ - _UI components_
  - fixtures/ - _Sample data_
  - i18n/ - _Internationalization_
  - types/ - _TypeScript types_
  - utils/ - _Utility functions_
  - \_\_tests\_\_/ - _Unit and integration tests_
- public/ - _Static assets_
- coverage/ - HTML test coverage report

## Current Limitations

- Gender field: The gender property is present in user data but is not used in any matching logic or UI. It is currently informational only.

- Prebuilt data: All user profiles and match data are hardcoded in `./src/fixtures/users.ts` and used by `./src/api/db.ts` for development and testing. There is no persistent storage or real user registration.

- API Simulation: All API modules in `./src/api` are mocks. In production, these would be replaced by real HTTP requests to a back-end service.

- No Authentication: There is no authentication or authorization implemented.
