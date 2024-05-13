
# Usage Instructions for `renderSwagger`

## Introduction

The `renderSwagger` function is a utility that generates and sets up Swagger UI documentation based on a Postman collection. It accepts various parameters to customize the generated documentation, including Postman ID, base URL, environment, Postman API key, inclusion list, and exclusion list.

## Installation

To use the `renderSwagger` function, you need to install it as an npm package:

```bash
npm install your-package-name
```

## Usage

### Importing the Module

First, import the `renderSwagger` function from the installed package:

```javascript
const { renderSwagger } = require('your-package-name');
```

### Calling the Function

Call the `renderSwagger` function with the required parameters:

```javascript
const postmanId = 'your-postman-id';
const liveBaseUrl = 'https://your-live-base-url.com';
const nodeEnv = 'development';
const postmanApiKey = 'your-postman-api-key';
const inclusionList = ['/api/v1/authenticate/login', '/api/v1/user/profile'];
const exclusionList = ['/api/v1/authenticate/register'];

const setupSwagger = await renderSwagger(postmanId, {
  liveBaseUrl,
  nodeEnv,
  postmanApiKey,
  inclusionList,
  exclusionList
});
```

### Parameters

- `postmanId` (string): The Postman collection ID.
- `liveBaseUrl` (string): The base URL of the live server.
- `nodeEnv` (string): The environment of the server (e.g., "development", "production").
- `postmanApiKey` (string): The Postman API key for authentication (optional).
- `inclusionList` (array of strings): An array of paths to include in the Swagger documentation.
- `exclusionList` (array of strings): An array of paths to exclude from the Swagger documentation.

### Output

The function returns a setup function for Swagger UI. You can use this setup function to mount Swagger UI middleware in your Express application:

```javascript
app.use('/api-docs', async (req, res, next) => {
  try {
    const setupSwagger = await renderSwagger(postmanId, {
      liveBaseUrl,
      nodeEnv,
      postmanApiKey,
      inclusionList,
      exclusionList
    });
    
    if (setupSwagger !== "Not available") {
      setupSwagger(req, res, next);
    } else {
      res.send("Swagger setup failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
```

## License

This project is licensed under the [MIT License](LICENSE).

