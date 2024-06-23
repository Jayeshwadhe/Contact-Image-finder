# Contact Image Finder

A simple web application that shows the Gravatar image for an email or the website logo using Clearbit Logo API for a given website domain.

## Features

- Enter an email or website domain in the input box.
- Fetch and display the Gravatar image if an email is provided.
- Fetch and display the website logo using Clearbit Logo API if a website domain is provided.
- Handle errors and edge cases with appropriate messages.

## Prerequisites

- Node.js
- npm (Node package manager)
- Clearbit API key (for fetching the website logos)

## Installation

1. Install the dependencies.

    ```bash
    npm install
    ```

## Running the Application

1. Start the server.

    ```bash
    node run start
    ```

2. Open `http://localhost:8080/` in your web browser.

3. Enter an email or website domain and click "Get Image" to see the result.



## Dependencies

- express
- body-parser
- axios
- gravatar

