**Fresh Cells Challenge Application**

Welcome to the Fresh Cells Challenge Application! This application is built with React, React Router, React Testing Library, TypeScript, Ant Design, and Apollo Client. It provides features like login and validations, account page, and a notification system.

**Features:**

- **Login and Validations:** Users can log in with their credentials, and the application performs validations to ensure the correct input format.
- **Account Page:** Once logged in, users can view their account details on a dedicated account page.
- **Notification:** The application includes a notification system to alert users of errors.

**Stack:**

- **React:** A JavaScript library for building user interfaces.
- **React Router:** A routing library for React that enables navigation within the application.
- **React Testing Library:** A testing utility for React applications that focuses on behavior rather than implementation details.
- **TypeScript:** A statically typed superset of JavaScript that adds type-checking capabilities to the language.
- **Ant Design:** A UI library for React that provides a set of high-quality components and styles.
- **Apollo Client:** A fully-featured caching GraphQL client for React applications.
- **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects.

**Missing Features:**

- **Use Case with Location:** This feature involves incorporating location-based functionality into the application, such as geolocation or address lookup.
- **Internationalization (i18n):** Adding support for multiple languages to make the application accessible to users from different regions.

**Setup:**

1. Clone the repository:

```bash
git clone https://github.com/ramon-src/freshcells-challenge.git
```

2. Navigate to the project directory:

```bash
cd freshcells-challenge
```

3. Install dependencies:

```bash
npm install -g bun
```

```bash
bun install
```

1. Configure the environment:

Create a `.env` file in the root directory of the project and set the `VITE_GRAPHQL_ENDPOINT` variable to your GraphQL endpoint.

```
VITE_GRAPHQL_ENDPOINT=http://your-graphql-endpoint.com
```

**Running the Application:**

To start the application, run:

```bash
bun dev
```

This command will start the development server and open the application in your default web browser.

**Testing:**

To run tests and generate coverage reports, use:

```bash
bun run test:cov
```

To run tests without coverage:

```bash
bun run test
```

**Author:**

Ramon Schmidt - [LinkedIn](https://www.linkedin.com/in/ramonsrocha/) - ramonroc@gmail.com

**Acknowledgements:**

Special thanks to the team at Fresh Cells for the inspiration and support in building this application.
