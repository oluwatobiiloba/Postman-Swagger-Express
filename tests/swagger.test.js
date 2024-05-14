const axios = require("axios");
require('dotenv').config();
const postmanToOpenApi = require("postman-to-openapi");
const yamljs = require("yamljs");
const swagger = require("../src/swagger");

console.error = jest.fn();
console.warn = jest.fn();

jest.mock("axios");
jest.mock("postman-to-openapi");
jest.mock("yamljs");

describe("fetchPostmanCollection", () => {
  it("fetches a Postman collection successfully", async () => {
    const collectionId = "23034417-ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4";
    const postmanApiKey = "postman api key";
    const responseData =  {
        "collection": {
            "info": {
                "_postman_id": "ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4",
                "name": "postman_swagger_express",
                "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
                "updatedAt": "2024-05-13T22:25:25.000Z",
                "uid": "23034417-ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4",
                "createdAt": "2024-05-13T22:18:56.000Z",
                "lastUpdatedBy": "23034417"
            },
            "item": [
                {
                    "name": "GET",
                    "item": [
                        {
                            "name": "https://api.example.com/users/1",
                            "id": "5c5149a8-3118-42fa-a01d-01c01301ca78",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer your_access_token"
                                    }
                                ],
                                "url": {
                                    "raw": "https://api.example.com/users/1",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "users",
                                        "1"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-5c5149a8-3118-42fa-a01d-01c01301ca78"
                        },
                        {
                            "name": "Get Self",
                            "id": "937a5e90-59ed-4846-babf-da189053f0a8",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "https://api.getpostman.com/collections/:collectionId",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "getpostman",
                                        "com"
                                    ],
                                    "path": [
                                        "collections",
                                        ":collectionId"
                                    ],
                                    "variable": [
                                        {
                                            "key": "collectionId",
                                            "value": ""
                                        }
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-937a5e90-59ed-4846-babf-da189053f0a8"
                        }
                    ],
                    "id": "a85b3a41-4aac-490a-b5e5-3c0299a80b69",
                    "uid": "23034417-a85b3a41-4aac-490a-b5e5-3c0299a80b69"
                },
                {
                    "name": "Post",
                    "item": [
                        {
                            "name": "https://api.example.com/posts",
                            "id": "c2500602-aaf4-4da0-8ddc-c4abec31932d",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\"title\":\"Sample Post\",\"body\":\"This is a sample post body.\",\"userId\":1}"
                                },
                                "url": {
                                    "raw": "https://api.example.com/posts",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "posts"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-c2500602-aaf4-4da0-8ddc-c4abec31932d"
                        }
                    ],
                    "id": "5fe68133-fa99-452d-85e1-1249fd52640b",
                    "uid": "23034417-5fe68133-fa99-452d-85e1-1249fd52640b"
                },
                {
                    "name": "Delete",
                    "item": [
                        {
                            "name": "https://api.example.com/posts/1",
                            "id": "6ea3ba67-2763-4aa0-a595-6493241028e8",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "DELETE",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer your_access_token"
                                    }
                                ],
                                "url": {
                                    "raw": "https://api.example.com/posts/1",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "posts",
                                        "1"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-6ea3ba67-2763-4aa0-a595-6493241028e8"
                        }
                    ],
                    "id": "6a035d1f-673b-46ff-94da-eba23b978dba",
                    "uid": "23034417-6a035d1f-673b-46ff-94da-eba23b978dba"
                },
                {
                    "name": "Put",
                    "item": [
                        {
                            "name": "https://api.example.com/posts/1",
                            "id": "faf6d91f-58d3-492a-846a-ab1ea54cca27",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "PUT",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\"title\":\"Updated Title\",\"body\":\"This is the updated body of the post.\"}"
                                },
                                "url": {
                                    "raw": "https://api.example.com/posts/1",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "posts",
                                        "1"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-faf6d91f-58d3-492a-846a-ab1ea54cca27"
                        }
                    ],
                    "id": "cc2eae12-88bf-4c84-9578-ba6a853730dd",
                    "uid": "23034417-cc2eae12-88bf-4c84-9578-ba6a853730dd"
                }
            ]
        }
    };
    axios.get.mockResolvedValue(responseData);

    const result = await swagger.fetchPostmanCollection(collectionId, postmanApiKey);

    expect(result).toEqual(responseData.data);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.getpostman.com/collections/${collectionId}`,
      {
        headers: { "x-api-key": postmanApiKey },
      }
    );
  });

    it("handles errors when fetching a Postman collection", async () => {
        const collectionId = "23034417-ecd8c65f-b950-4ded-a8a8";
        const postmanApiKey = process.env.x_api_key;
        const errorMessage = "Failed to fetch collection";
        axios.get.mockRejectedValue(new Error(errorMessage));
        const result = await swagger.fetchPostmanCollection(collectionId, postmanApiKey);
        expect(result).toEqual({});
        expect(console.error).toHaveBeenCalledWith(
        `Error fetching or encoding content from ${collectionId}:`,
        errorMessage
        );
    });
});

describe("generateSwaggerYaml", () => {
  it("generates Swagger YAML from a Postman collection successfully", async () => {
      const collectionData = {
        "collection": {
            "info": {
                "_postman_id": "ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4",
                "name": "postman_swagger_express",
                "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
                "updatedAt": "2024-05-13T22:25:25.000Z",
                "uid": "23034417-ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4",
                "createdAt": "2024-05-13T22:18:56.000Z",
                "lastUpdatedBy": "23034417"
            },
            "item": [
                {
                    "name": "GET",
                    "item": [
                        {
                            "name": "https://api.example.com/users/1",
                            "id": "5c5149a8-3118-42fa-a01d-01c01301ca78",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer your_access_token"
                                    }
                                ],
                                "url": {
                                    "raw": "https://api.example.com/users/1",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "users",
                                        "1"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-5c5149a8-3118-42fa-a01d-01c01301ca78"
                        },
                        {
                            "name": "Get Self",
                            "id": "937a5e90-59ed-4846-babf-da189053f0a8",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "https://api.getpostman.com/collections/:collectionId",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "getpostman",
                                        "com"
                                    ],
                                    "path": [
                                        "collections",
                                        ":collectionId"
                                    ],
                                    "variable": [
                                        {
                                            "key": "collectionId",
                                            "value": ""
                                        }
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-937a5e90-59ed-4846-babf-da189053f0a8"
                        }
                    ],
                    "id": "a85b3a41-4aac-490a-b5e5-3c0299a80b69",
                    "uid": "23034417-a85b3a41-4aac-490a-b5e5-3c0299a80b69"
                },
                {
                    "name": "Post",
                    "item": [
                        {
                            "name": "https://api.example.com/posts",
                            "id": "c2500602-aaf4-4da0-8ddc-c4abec31932d",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\"title\":\"Sample Post\",\"body\":\"This is a sample post body.\",\"userId\":1}"
                                },
                                "url": {
                                    "raw": "https://api.example.com/posts",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "posts"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-c2500602-aaf4-4da0-8ddc-c4abec31932d"
                        }
                    ],
                    "id": "5fe68133-fa99-452d-85e1-1249fd52640b",
                    "uid": "23034417-5fe68133-fa99-452d-85e1-1249fd52640b"
                },
                {
                    "name": "Delete",
                    "item": [
                        {
                            "name": "https://api.example.com/posts/1",
                            "id": "6ea3ba67-2763-4aa0-a595-6493241028e8",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "DELETE",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer your_access_token"
                                    }
                                ],
                                "url": {
                                    "raw": "https://api.example.com/posts/1",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "posts",
                                        "1"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-6ea3ba67-2763-4aa0-a595-6493241028e8"
                        }
                    ],
                    "id": "6a035d1f-673b-46ff-94da-eba23b978dba",
                    "uid": "23034417-6a035d1f-673b-46ff-94da-eba23b978dba"
                },
                {
                    "name": "Put",
                    "item": [
                        {
                            "name": "https://api.example.com/posts/1",
                            "id": "faf6d91f-58d3-492a-846a-ab1ea54cca27",
                            "protocolProfileBehavior": {
                                "disableBodyPruning": true
                            },
                            "request": {
                                "method": "PUT",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\"title\":\"Updated Title\",\"body\":\"This is the updated body of the post.\"}"
                                },
                                "url": {
                                    "raw": "https://api.example.com/posts/1",
                                    "protocol": "https",
                                    "host": [
                                        "api",
                                        "example",
                                        "com"
                                    ],
                                    "path": [
                                        "posts",
                                        "1"
                                    ]
                                }
                            },
                            "response": [],
                            "uid": "23034417-faf6d91f-58d3-492a-846a-ab1ea54cca27"
                        }
                    ],
                    "id": "cc2eae12-88bf-4c84-9578-ba6a853730dd",
                    "uid": "23034417-cc2eae12-88bf-4c84-9578-ba6a853730dd"
                }
            ]
        }
    };
    const openApiData = `openapi: 3.0.0
    info:
      title: postman_swagger_express
      version: 1.0.0
    servers:
      - url: https://api.example.com
      - url: https://api.getpostman.com
    tags:
      - name: GET
      - name: Post
      - name: Delete
      - name: Put
    paths:
      /users/1:
        get:
          tags:
            - GET
          summary: https://api.example.com/users/1
          parameters:
            - name: Authorization
              in: header
              schema:
                type: string
              example: Bearer your_access_token
          responses:
            '200':
              description: Successful response
              content:
                application/json: {}
      /collections/{collectionId}:
        get:
          tags:
            - GET
          summary: Get Self
          parameters:
            - name: collectionId
              in: path
              schema:
                type: string
              required: true
          responses:
            '200':
              description: Successful response
              content:
                application/json: {}
      /posts:
        post:
          tags:
            - Post
          summary: https://api.example.com/posts
          requestBody:
            content:
              '*/*':
                schema:
                  type: string
                  example: >-
                    "{\"title\":\"Sample Post\",\"body\":\"This is a sample post
                    body.\",\"userId\":1}"
          parameters:
            - name: Content-Type
              in: header
              schema:
                type: string
              example: application/json
          responses:
            '200':
              description: Successful response
              content:
                application/json: {}
      /posts/1:
        delete:
          tags:
            - Delete
          summary: https://api.example.com/posts/1
          parameters:
            - name: Authorization
              in: header
              schema:
                type: string
              example: Bearer your_access_token
          responses:
            '200':
              description: Successful response
              content:
                application/json: {}
        put:
          tags:
            - Put
          summary: https://api.example.com/posts/1
          requestBody:
            content:
              '*/*':
                schema:
                  type: string
                  example: >-
                    "{\"title\":\"Updated Title\",\"body\":\"This is the updated
                    body of the post.\"}"
          parameters:
            - name: Content-Type
              in: header
              schema:
                type: string
              example: application/json
          responses:
            '200':
              description: Successful response
              content:
                application/json: {}
    `;
    postmanToOpenApi.mockResolvedValue(openApiData);
    const result = await swagger.generateSwaggerYaml(collectionData);
    expect(result).toEqual(openApiData);
    expect(postmanToOpenApi).toHaveBeenCalledWith(
      JSON.stringify(collectionData),
      null,
      { defaultTag: "General" }
    );
  });

    it("handles errors when generating Swagger YAML", async () => {
        const errorMessage = "Failed to generate Swagger YAML";
        postmanToOpenApi.mockRejectedValue(new Error(errorMessage));
        const collectionData = {}
        const result = await swagger.generateSwaggerYaml(collectionData);
        expect(result).toBeNull();
        expect(console.warn).toHaveBeenCalledWith(
            "Failed to load Swagger Doc",
            errorMessage
        );
  });
});

describe("generateSwaggerJs", () => {
  it("generates Swagger JS from a Postman collection successfully", async () => {
      const collectionId = "23034417-ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4";
      const postmanApiKey = "postman key";
      const responseData =  {data: { "collection": {
        "info": {
            "_postman_id": "ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4",
            "name": "postman_swagger_express",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
            "updatedAt": "2024-05-13T22:25:25.000Z",
            "uid": "23034417-ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4",
            "createdAt": "2024-05-13T22:18:56.000Z",
            "lastUpdatedBy": "23034417"
        },
        "item": [
            {
                "name": "GET",
                "item": [
                    {
                        "name": "https://api.example.com/users/1",
                        "id": "5c5149a8-3118-42fa-a01d-01c01301ca78",
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "method": "GET",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "Bearer your_access_token"
                                }
                            ],
                            "url": {
                                "raw": "https://api.example.com/users/1",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "example",
                                    "com"
                                ],
                                "path": [
                                    "users",
                                    "1"
                                ]
                            }
                        },
                        "response": [],
                        "uid": "23034417-5c5149a8-3118-42fa-a01d-01c01301ca78"
                    },
                    {
                        "name": "Get Self",
                        "id": "937a5e90-59ed-4846-babf-da189053f0a8",
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "method": "GET",
                            "header": [],
                            "url": {
                                "raw": "https://api.getpostman.com/collections/:collectionId",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "getpostman",
                                    "com"
                                ],
                                "path": [
                                    "collections",
                                    ":collectionId"
                                ],
                                "variable": [
                                    {
                                        "key": "collectionId",
                                        "value": ""
                                    }
                                ]
                            }
                        },
                        "response": [],
                        "uid": "23034417-937a5e90-59ed-4846-babf-da189053f0a8"
                    }
                ],
                "id": "a85b3a41-4aac-490a-b5e5-3c0299a80b69",
                "uid": "23034417-a85b3a41-4aac-490a-b5e5-3c0299a80b69"
            },
            {
                "name": "Post",
                "item": [
                    {
                        "name": "https://api.example.com/posts",
                        "id": "c2500602-aaf4-4da0-8ddc-c4abec31932d",
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "method": "POST",
                            "header": [
                                {
                                    "key": "Content-Type",
                                    "value": "application/json"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\"title\":\"Sample Post\",\"body\":\"This is a sample post body.\",\"userId\":1}"
                            },
                            "url": {
                                "raw": "https://api.example.com/posts",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "example",
                                    "com"
                                ],
                                "path": [
                                    "posts"
                                ]
                            }
                        },
                        "response": [],
                        "uid": "23034417-c2500602-aaf4-4da0-8ddc-c4abec31932d"
                    }
                ],
                "id": "5fe68133-fa99-452d-85e1-1249fd52640b",
                "uid": "23034417-5fe68133-fa99-452d-85e1-1249fd52640b"
            },
            {
                "name": "Delete",
                "item": [
                    {
                        "name": "https://api.example.com/posts/1",
                        "id": "6ea3ba67-2763-4aa0-a595-6493241028e8",
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "method": "DELETE",
                            "header": [
                                {
                                    "key": "Authorization",
                                    "value": "Bearer your_access_token"
                                }
                            ],
                            "url": {
                                "raw": "https://api.example.com/posts/1",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "example",
                                    "com"
                                ],
                                "path": [
                                    "posts",
                                    "1"
                                ]
                            }
                        },
                        "response": [],
                        "uid": "23034417-6ea3ba67-2763-4aa0-a595-6493241028e8"
                    }
                ],
                "id": "6a035d1f-673b-46ff-94da-eba23b978dba",
                "uid": "23034417-6a035d1f-673b-46ff-94da-eba23b978dba"
            },
            {
                "name": "Put",
                "item": [
                    {
                        "name": "https://api.example.com/posts/1",
                        "id": "faf6d91f-58d3-492a-846a-ab1ea54cca27",
                        "protocolProfileBehavior": {
                            "disableBodyPruning": true
                        },
                        "request": {
                            "method": "PUT",
                            "header": [
                                {
                                    "key": "Content-Type",
                                    "value": "application/json"
                                }
                            ],
                            "body": {
                                "mode": "raw",
                                "raw": "{\"title\":\"Updated Title\",\"body\":\"This is the updated body of the post.\"}"
                            },
                            "url": {
                                "raw": "https://api.example.com/posts/1",
                                "protocol": "https",
                                "host": [
                                    "api",
                                    "example",
                                    "com"
                                ],
                                "path": [
                                    "posts",
                                    "1"
                                ]
                            }
                        },
                        "response": [],
                        "uid": "23034417-faf6d91f-58d3-492a-846a-ab1ea54cca27"
                    }
                ],
                "id": "cc2eae12-88bf-4c84-9578-ba6a853730dd",
                "uid": "23034417-cc2eae12-88bf-4c84-9578-ba6a853730dd"
            }
        ]
      }}
      };
      axios.get.mockResolvedValue(responseData);
      const swaggerYaml = await swagger.generateSwaggerYaml(responseData.collection);
      const swaggerJs = { "openapi": "3.0.0", "info": { "title": "postman_swagger_express", "version": "1.0.0" }, "servers": [{ "url": "https://api.example.com" }, { "url": "https://api.getpostman.com" }], "tags": [{ "name": "GET" }, { "name": "Post" }, { "name": "Delete" }, { "name": "Put" }], "paths": { "/users/1": { "get": { "tags": ["GET"], "summary": "https://api.example.com/users/1", "parameters": [{ "name": "Authorization", "in": "header", "schema": { "type": "string" }, "example": "Bearer your_access_token" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/collections/{collectionId}": { "get": { "tags": ["GET"], "summary": "Get Self", "parameters": [{ "name": "collectionId", "in": "path", "schema": { "type": "string" }, "required": true }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/posts": { "post": { "tags": ["Post"], "summary": "https://api.example.com/posts", "requestBody": { "content": { "*/*": { "schema": { "type": "string", "example": "\"{\\\"title\\\":\\\"Sample Post\\\",\\\"body\\\":\\\"This is a sample post body.\\\",\\\"userId\\\":1}\"" } } } }, "parameters": [{ "name": "Content-Type", "in": "header", "schema": { "type": "string" }, "example": "application/json" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/posts/1": { "delete": { "tags": ["Delete"], "summary": "https://api.example.com/posts/1", "parameters": [{ "name": "Authorization", "in": "header", "schema": { "type": "string" }, "example": "Bearer your_access_token" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } }, "put": { "tags": ["Put"], "summary": "https://api.example.com/posts/1", "requestBody": { "content": { "*/*": { "schema": { "type": "string", "example": "\"{\\\"title\\\":\\\"Updated Title\\\",\\\"body\\\":\\\"This is the updated body of the post.\\\"}\"" } } } }, "parameters": [{ "name": "Content-Type", "in": "header", "schema": { "type": "string" }, "example": "application/json" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } } } }
      yamljs.parse.mockReturnValue(swaggerJs);
      const result = await swagger.generateSwaggerJs(collectionId, {
        postmanApiKey,
    });

    expect(result).toEqual(swaggerJs);
    expect(yamljs.parse).toHaveBeenCalledWith(swaggerYaml);
  });

  it("handles errors when generating Swagger JS", async () => {
    const collectionId = "23034417-ecd8c65f-b950-4ded-a8a8-ffac4d99b6a4"
    const postmanApiKey = "your_api_key";
    const errorMessage = "Failed to generate Swagger JS";
    yamljs.parse.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const result = await swagger.generateSwaggerJs(collectionId, {
      postmanApiKey,
    });

    expect(result).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(
      "Failed to load Swagger Doc",
      errorMessage
    );
  });
});
