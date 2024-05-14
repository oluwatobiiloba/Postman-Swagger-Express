const express = require("express");
const request = require("supertest");
const swaggerUI = require("swagger-ui-express");
const { serveSwaggerUI } = require("../index");
const swagger = require("../src/swagger");

jest.mock("../src/swagger.js");

describe("serveSwaggerUI", () => {
  let app;
  let collection;
  let postmanApiKey;
  let postmanId;

  beforeEach(() => {
    app = express();
    collection = { "openapi": "3.0.0", "info": { "title": "postman_swagger_express", "version": "1.0.0" }, "servers": [{ "url": "https://api.example.com" }, { "url": "https://api.getpostman.com" }], "tags": [{ "name": "GET" }, { "name": "Post" }, { "name": "Delete" }, { "name": "Put" }], "paths": { "/users/1": { "get": { "tags": ["GET"], "summary": "https://api.example.com/users/1", "parameters": [{ "name": "Authorization", "in": "header", "schema": { "type": "string" }, "example": "Bearer your_access_token" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/collections/{collectionId}": { "get": { "tags": ["GET"], "summary": "Get Self", "parameters": [{ "name": "collectionId", "in": "path", "schema": { "type": "string" }, "required": true }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/posts": { "post": { "tags": ["Post"], "summary": "https://api.example.com/posts", "requestBody": { "content": { "*/*": { "schema": { "type": "string", "example": "\"{\\\"title\\\":\\\"Sample Post\\\",\\\"body\\\":\\\"This is a sample post body.\\\",\\\"userId\\\":1}\"" } } } }, "parameters": [{ "name": "Content-Type", "in": "header", "schema": { "type": "string" }, "example": "application/json" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/posts/1": { "delete": { "tags": ["Delete"], "summary": "https://api.example.com/posts/1", "parameters": [{ "name": "Authorization", "in": "header", "schema": { "type": "string" }, "example": "Bearer your_access_token" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } }, "put": { "tags": ["Put"], "summary": "https://api.example.com/posts/1", "requestBody": { "content": { "*/*": { "schema": { "type": "string", "example": "\"{\\\"title\\\":\\\"Updated Title\\\",\\\"body\\\":\\\"This is the updated body of the post.\\\"}\"" } } } }, "parameters": [{ "name": "Content-Type", "in": "header", "schema": { "type": "string" }, "example": "application/json" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } } } };
    postmanApiKey = "api_key";
    postmanId = "postman_id";
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("serves Swagger UI with default options", async () => {
    collection = { "openapi": "3.0.0", "info": { "title": "postman_swagger_express", "version": "1.0.0" }, "servers": [{ "url": "https://api.example.com" }, { "url": "https://api.getpostman.com" }], "tags": [{ "name": "GET" }, { "name": "Post" }, { "name": "Delete" }, { "name": "Put" }], "paths": { "/users/1": { "get": { "tags": ["GET"], "summary": "https://api.example.com/users/1", "parameters": [{ "name": "Authorization", "in": "header", "schema": { "type": "string" }, "example": "Bearer your_access_token" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/collections/{collectionId}": { "get": { "tags": ["GET"], "summary": "Get Self", "parameters": [{ "name": "collectionId", "in": "path", "schema": { "type": "string" }, "required": true }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/posts": { "post": { "tags": ["Post"], "summary": "https://api.example.com/posts", "requestBody": { "content": { "*/*": { "schema": { "type": "string", "example": "\"{\\\"title\\\":\\\"Sample Post\\\",\\\"body\\\":\\\"This is a sample post body.\\\",\\\"userId\\\":1}\"" } } } }, "parameters": [{ "name": "Content-Type", "in": "header", "schema": { "type": "string" }, "example": "application/json" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } }, "/posts/1": { "delete": { "tags": ["Delete"], "summary": "https://api.example.com/posts/1", "parameters": [{ "name": "Authorization", "in": "header", "schema": { "type": "string" }, "example": "Bearer your_access_token" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } }, "put": { "tags": ["Put"], "summary": "https://api.example.com/posts/1", "requestBody": { "content": { "*/*": { "schema": { "type": "string", "example": "\"{\\\"title\\\":\\\"Updated Title\\\",\\\"body\\\":\\\"This is the updated body of the post.\\\"}\"" } } } }, "parameters": [{ "name": "Content-Type", "in": "header", "schema": { "type": "string" }, "example": "application/json" }], "responses": { "200": { "description": "Successful response", "content": { "application/json": {} } } } } } } };
    swagger.generateSwaggerJs.mockResolvedValue(collection);

    await serveSwaggerUI(app, "/swagger", postmanId, {postmanApiKey});

    expect(swagger.generateSwaggerJs).toHaveBeenCalledWith(postmanId, {
      postmanApiKey
    });
    expect(
      app._router.stack.some(
        (layer) => layer.regexp && layer.regexp.test("/swagger")
      )
    ).toBe(true);
    
  });

  it("filters paths based on inclusion list", async () => {
    swagger.generateSwaggerJs.mockResolvedValue(collection);
    await serveSwaggerUI(app, "/swagger", postmanId, {
      inclusionList: ["/users/1"],
      postmanApiKey
    });
    expect(swagger.generateSwaggerJs).toHaveBeenCalledWith(postmanId, {
      postmanApiKey
    });
    expect(collection.paths["/users/1"]).toBeDefined();
    expect(collection.paths["/posts"]).toBeUndefined();
  });

  it("filters paths based on exclusion list", async () => {
    swagger.generateSwaggerJs.mockResolvedValue(collection);

    await serveSwaggerUI(app, "/swagger", postmanId, {
      exclusionList: ["/users/1"],
      postmanApiKey
    });

    expect(swagger.generateSwaggerJs).toHaveBeenCalledWith(postmanId, {
      postmanApiKey,
    });
    expect(collection.paths["/users/1"]).toBeUndefined();
    expect(collection.paths["/posts"]).toBeDefined();
  });

  it("configures live base URL", async () => {
    swagger.generateSwaggerJs.mockResolvedValue(collection);

    await serveSwaggerUI(app, "/swagger", postmanId, {
      liveBaseUrl: "http://localhost:3000",
      postmanApiKey
    });

    expect(swagger.generateSwaggerJs).toHaveBeenCalledWith(postmanId, {
      postmanApiKey
    });
    expect(collection.servers).toEqual([
      {
        url: "http://localhost:3000",
        description: " Server",
      },
    ]);
  });

  it("handles errors", async () => {
    const errorMessage = "Failed to generate Swagger JS";
    swagger.generateSwaggerJs.mockRejectedValue(new Error(errorMessage));
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await serveSwaggerUI(app, "/swagger", postmanId, {});

    expect(swagger.generateSwaggerJs).toHaveBeenCalledWith(postmanId, {
      postmanApiKey: undefined,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Error serving Swagger UI: Error: ${errorMessage}`);
  });
});
