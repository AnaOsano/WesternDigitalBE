# Western Digital Searches

This project is a search engine for human resources that gathers information from different sources. It provides autocomplete functions and displays search results in a client-side search bar, offering a seamless experience for users seeking human resource information.

## Table of Contents

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
  - [Running the App](#running-the-app)
  - [Running Tests](#running-tests)
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

The mocked API is available at `http://localhost:3000/v1/search` and accepts a GET request with any query string. For example, to search for a term, you can use the following request format:

GET http://localhost:3000/v1/search?query=your_search_term

Replace `your_search_term` with the term you want to search for, and the API will return a mocked response containing search results.

## Development

### Running the App

To run the app in development mode, use the following command:

npm run start:dev


The app will be available at `http://localhost:80`.

### Running Tests

To run tests, use the following command:

npm test
