
# Postman Swagger Express

Postman Swagger Express is a middleware for Express.js that automates the process of generating Swagger UI documentation from Postman collections. It simplifies the task of documenting and visualizing your API endpoints, making it easier for developers to understand and interact with your API.

## Installation

To install Postman Swagger Express, use npm:

```bash
npm install postman-swagger-express
```

# Important Note

If you are bootstrapping your Express app using a function , make sure to await the `serveSwaggerUI` function call. It is asynchronous and requires awaiting to ensure proper execution.


## Usage

```javascript
const express = require("express");
const { serveSwaggerUI } = require("postman-swagger-express");

const app = express();

// Serve Swagger UI for a specific route
serveSwaggerUI(app, "/api-docs", "your_postman_collection_id", {
  postmanApiKey: "your_postman_api_key",
  inclusionList: ["/api/users"],
  exclusionList: ["/api/admin"],
  liveBaseUrl: "http://localhost:3000",
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## API

### `serveSwaggerUI(app, route, postmanId, options)`

Serves Swagger UI for the specified Express app and route.

- `app`: Express application instance.
- `route`: Route path where Swagger UI will be served.
- `postmanId`: Postman collection ID.
- `options`: Additional configuration options:
  - `postmanApiKey`: Postman API key for accessing the collection (optional).
  - `inclusionList`: Array of paths to include in the Swagger specification (optional).
  - `exclusionList`: Array of paths to exclude from the Swagger specification (optional).
  - `liveBaseUrl`: Base URL of the live API server (optional).

## License

Postman Swagger Express is licensed under the [ISC License](LICENSE).

## Author

- Oluwatobiloba Aremu

## Support and Contribution

- For issues or feature requests, please submit an issue on [GitHub](https://github.com/oluwatobiiloba/postman-swagger-express/issues).
- Contributions are welcome! Feel free to submit a pull request.
