# Western Digital Searches

This project is a search engine for human resources that gathers information from different sources. It provides autocomplete functions and displays search results in a client-side search bar, offering a seamless experience for users seeking human resource information.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Mocked API](#mocked-api)
- [Project Structure and Patterns](#project-structure-and-patterns)
- [Development](#development)
  - [Running the App](#running-the-app)
  - [Running Tests](#running-tests)
- [NodeJS Upgrade and Dependencies Installation](#nodejs-upgrade-and-dependencies-installation)
- [Dockerization](#dockerization)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
- [Debugging](#debugging)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. Clone the repository:

git clone https://github.com/AnaOsano/WesternDigitalBE.git


2. Navigate to the project folder:

cd WesternDigitalBE


3. Install the dependencies:

npm install


Now, you're ready to start working on the project!

### Mocked API

We have implemented a mocked API to simulate the search functionality for development and testing purposes. You can use this API to interact with the search engine and test the autocomplete functions, as well as the search results displayed on the client-side search bar.

The mocked API is available at `http://localhost:80/v1/search` and accepts a GET request with any query string. For example, to search for a term, you can use the following request format:

GET http://localhost/v1/search?query=your_search_term

Replace `your_search_term` with the term you want to search for, and the API will return a mocked response containing search results.

## Project Structure and Patterns

Our project follows the controller-service-repository pattern, which enables a clean and maintainable architecture. The main components of this pattern are:

- **Controllers**: Handle HTTP requests and delegate business logic to services.
- **Services**: Contain the core business logic, responsible for interacting with repositories and returning data to controllers.
- **Repositories**: Provide an abstraction layer over data access and storage, decoupling the application from the underlying data source.

We have organized our codebase into the following directories:

- **modules**: Contains the main application modules, each with its controllers, services, and repositories.
- **helpers**: Houses utility functions and classes that can be used throughout the application to perform common tasks.
- **middlewares**: Stores Express middleware functions that are used to process incoming requests before they reach the controllers.
- **filters**: Contains custom exception filters that can be used to catch and handle specific exceptions in a centralized manner.

Our tests are organized in a separate directory structure that mirrors the main project structure, making it easy to locate and manage tests for each module and component.

## Development

### Running the App

To run the app in development mode, use the following command:

npm run start:dev


The app will be available at `http://localhost:80`.

### Running Tests

To run tests, use the following command:

npm test

## NodeJS Upgrade and Dependencies Installation

To upgrade or install dependencies, follow these steps:

1. Ensure you have the latest version of Node.js installed on your system. You can download it from the [official Node.js website](https://nodejs.org/).

2. Navigate to your project directory and run the following command to install or upgrade the project dependencies:

```console 
npm install
```

This command will install or update the dependencies listed in your package.json file. If you need to add a new dependency or upgrade an existing one to a specific version, you can use the following command:

```console
npm install package-name@version
```

Replace the `package-name` with the name of the package you want to install or upgrade and the `version` with the desired version number.

## Dockerization

This project uses Docker to simplify the setup and deployment process. The Docker configuration includes the following services:

1. Elasticsearch
2. Kibana
3. Our NestJS backend application (WDBES)

### Prerequisites

To run the project using Docker, you'll need to have the following installed on your system:

- Docker Engine
- Docker Compose

### Elasticsearch

Elasticsearch is a powerful open-source search and analytics engine. In this project, it is configured as a single-node cluster, and the security features are disabled.

To access Elasticsearch, use the following address:

- http://localhost:9200

### Kibana

Kibana is an open-source data visualization and exploration tool for Elasticsearch. It provides a web-based interface to interact with the data stored in Elasticsearch.

To access Kibana, use the following address:

- http://localhost:5601

### WDBES

WDBES is the custom service developed for this project. It depends on the Elasticsearch service.

### Running the Services

To run the services, navigate to the project directory and use the following command:

```bash
docker-compose up -d
```

This command will start all the services in the background. To stop the services, use the following command:

```bash
docker-compose down
```

## Debugging

The project includes a `.vscode/launch.json` configuration file, which allows you to debug the application using Visual Studio Code. To start debugging, follow these steps:

1. Open the project in Visual Studio Code.
2. Make sure you have the necessary dependencies installed by running `npm install`.
3. Press `F5` or go to the "Run" tab in the sidebar and click the "Start Debugging" button with the `Debug app(Local)` option in the dropdown menu.

The application will start in debug mode, and you can set breakpoints, inspect variables, and use other debugging features provided by Visual Studio Code. For more information on debugging in Visual Studio Code, refer to the [official documentation](https://code.visualstudio.com/docs/editor/debugging).
