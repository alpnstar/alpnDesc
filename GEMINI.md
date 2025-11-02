# GEMINI.md

## Project Overview

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The project uses:

- **Framework**: [Next.js](https://nextjs.org)
- **UI Library**: [React](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Backend**: [Supabase](https://supabase.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/)

The project follows a modular architecture, likely inspired by [Feature-Sliced Design](https://feature-sliced.design/). A custom script at `scripts/generate.js` is used to scaffold new features, entities, widgets, and pages.

## Building and Running

### Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building

To build the application for production:

```bash
npm run build
```

### Starting the production server

To start the production server:

```bash
npm run start
```

## Development Conventions

### Code Generation

The project includes a script to generate new modules. To use it, run:

```bash
npm run gen <layer> <sliceName>
```

- `<layer>`: The layer of the module. Can be one of `feature`, `entity`, `widget`, `app`, or `ui`.
- `<sliceName>`: The name of the module (e.g., `AuthByEmail`).

For example:

```bash
npm run gen feature AuthByEmail
```

This will create a new feature module in `src/features/AuthByEmail` with the necessary files and boilerplate code.

### Linting and Formatting

The project uses ESLint for linting and Prettier for formatting.

To lint the code:

```bash
npm run lint
```

To format the code:

```bash
npm run format
```

Husky is used to run linting and formatting on pre-commit.
