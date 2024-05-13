const swaggerUI = require('swagger-ui-express');
const swagger = require('./src/swagger');

async function serveSwaggerUI(app, route, postmanId, options) {
    try {
        const collection = await swagger.generateSwaggerJs(postmanId, { postmanApiKey: options.postmanApiKey });

        if (options.inclusionList && options.inclusionList.length > 0) {
            collection.paths = Object.fromEntries(
                Object.entries(collection.paths).filter(([path, methods]) =>
                    options.inclusionList.includes(path)
                )
            );
        }

        if (options.exclusionList && options.exclusionList.length > 0) {
            collection.paths = Object.fromEntries(
                Object.entries(collection.paths).filter(([path, methods]) =>
                    !options.exclusionList.includes(path)
                )
            );
        }

        collection.servers = [
            {
                url: options.liveBaseUrl,
                description: `${options.nodeEnv} Server`
            },
        ];

        app.use(route, swaggerUI.serve, swaggerUI.setup(collection));

        console.log(`Swagger UI served at ${route}`);

    } catch (error) {
        console.error(`Error serving Swagger UI: ${error}`);
    }
}

module.exports = {
    serveSwaggerUI
};
