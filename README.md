# Western Digital Searches

This project is a search engine for human resources that gathers information from different sources. It provides autocomplete functions and displays search results in a client-side search bar, offering a seamless experience for users seeking human resource information.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Elasticsearch-backend API](#elasticsearch-backend-api)
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

## Elasticsearch-backend API

### Authentication

If you want to run the application locally and not from the Docker Compose image, you need to create JWT keys to use the asymmetric RS512 algorithm in the project root. Follow these steps to generate the keys and please don't use a passphrase for the keys when prompted:

```bash
$ mkdir -p src/data/jwt
$ ssh-keygen -t rsa -b 4096 -m PEM -f src/data/jwt/jwt.key # No passphrase is required
$ openssl rsa -in src/data/jwt/jwt.key -pubout -outform PEM -out src/data/jwt/jwt.key.pub
```

This project uses an authentication module to secure the search and index APIs using JWT. To obtain an access token, make a POST request to the `/auth/login` endpoint with a `username` and `password` in the request body.

Example:

Request:

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "exampleuser",
  "password": "examplepassword"
}
```

Response:

```json
{
  "access_token": "your_access_token"
}
```

Use the received `access_token` as a `Bearer` token in the `Authorization header` for subsequent restricted API requests, such as the search and index APIs.

### Search API

We have implemented an API that interacts with the Elasticsearch instance to provide search functionality for development and testing purposes. You can use this API to interact with the search engine, test the autocomplete functions, and display the search results on the client-side search bar.

The API is available at `http://localhost/v1/search` and accepts a GET request with any query string. For example, to search for a term, you can use the following request format:

```curl
GET http://localhost/v1/search?query=your_search_term&skip=0&limit=10
```

Replace `your_search_term` with the term you want to search for, and the API will return paginated search results from Elasticsearch. The `skip` and `limit` parameters can be used to control the pagination of the results. By default, `skip` is set to 0 and the `limit` is set to 10.

As a result of the query, you will receive paginated search results. For example, to search for the term "Applying for a position" and retrieve the first five results, you can use the following request:

```curl
GET http://localhost/v1/search?query=Applying%20for%20a%20position&skip=0&limit=5
```

The search results are no longer mocked, and they are retrieved directly from the Elasticsearch instance.

### Index API

The Index API allows you to index data in the Elasticsearch instance. To use the index API, make a POST request to the `/index` endpoint with an array of objects in the request body.

Each object should contain the following properties:

- `id`: Unique identifier for the document
- `title`: Title of the document
- `content`: Content of the document

Example:

Request:

```http
POST /api/v1/search/index
Content-Type: application/json

[
  {
    "id": "1",
    "title": "Title 1",
    "content": "Content 1"
  },
  {
    "id": "2",
    "title": "Title 2",
    "content": "Content 2"
  }
]
```

Response:

```json
{
  "indexedCount": 2,
  "indexedIds": ["OEbvlYcBEgFxFtc2myL4", "...similar"]
}
```

The response will include the number of indexed documents in the indexedCount property and an array of indexed document IDs in the `indexedIds` property. If any document fails to index, it will not be included in the `indexedIds` array.

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

The project also includes a script, `scripts/docker/elastic_init.sh`, and a sample data file, `src/data/hr_data.elasticsearch.json`, for preloading data into Elasticsearch. To import the sample data, set the environment variable `ELASTICSEARCH_IMPORT_HR_SAMPLE_DATA` to `true` in the `.env` file.

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
docker-compose up --build -d
```

This command will start all the services in the background. To stop the services, use the following command:

```bash
docker-compose down
```

By running the `docker-compose up --build -d` command, the containers will be initialized, and if the `ELASTICSEARCH_IMPORT_HR_SAMPLE_DATA` flag is set to `true`, the sample data from `src/data/hr_data.elasticsearch.json` will be imported into Elasticsearch.

## Debugging

The project includes a `.vscode/launch.json` configuration file, which allows you to debug the application using Visual Studio Code. To start debugging, follow these steps:

1. Open the project in Visual Studio Code.
2. Make sure you have the necessary dependencies installed by running `npm install`.
3. Press `F5` or go to the "Run" tab in the sidebar and click the "Start Debugging" button with the `Debug app(Local)` option in the dropdown menu.

The application will start in debug mode, and you can set breakpoints, inspect variables, and use other debugging features provided by Visual Studio Code. For more information on debugging in Visual Studio Code, refer to the [official documentation](https://code.visualstudio.com/docs/editor/debugging).
