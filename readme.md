
# postman-swagger-express

Convert Postman documentation to Swagger UI for Express routes.

## Installation

```bash
npm install postman-swagger-express
```

## Usage

### Static Generation of Swagger UI

```javascript
const express = require("express");
const { serveSwaggerUI } = require("postman-swagger-express");

const app = express();

serveSwaggerUI(app, "/api-docs-static", "your_postman_collection_id", {
  postmanApiKey: "your_postman_api_key",
  inclusionList: ["/api/users"],
  exclusionList: ["/api/admin"],
  liveBaseUrl: "http://localhost:3000",
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Dynamic Generation of Swagger UI

```javascript
const express = require("express");
const { serveSwaggerUIDynamic } = require("postman-swagger-express");

const app = express();

serveSwaggerUIDynamic(app, "/api-docs-dynamic", "your_postman_collection_id", {
  postmanApiKey: "your_postman_api_key",
  inclusionList: ["/api/users"],
  exclusionList: ["/api/admin"],
  liveBaseUrl: "http://localhost:3000",
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Explanation

- **Static Generation:** Use `serveSwaggerUI` to serve the Swagger UI with the Swagger collection generated once during initialization. This method is suitable for scenarios where the Swagger documentation doesn't change frequently.

- **Dynamic Generation:** Use `serveSwaggerUIDynamic` to serve the Swagger UI with the Swagger collection generated dynamically on each request. This approach ensures that the Swagger documentation is always up-to-date.

## License

This project is licensed under the 0BSD License - see the [LICENSE](LICENSE) file for details.

## Issues

Please report any issues or bugs you encounter on the [GitHub Issues](https://github.com/oluwatobiiloba/postman-swagger-express/issues) page.

## Repository

The source code is hosted on [GitHub](https://github.com/oluwatobiiloba/postman-swagger-express).
