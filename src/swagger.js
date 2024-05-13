
const axios = require("axios").default;
const postmanToOpenApi = require('postman-to-openapi')
const yamljs = require('yamljs');

module.exports = {
    async fetchPostmanCollection(collectionId,postmanApiKey ) {
        try {
            const options = {}
            options.headers = {
                "x-api-key": postmanApiKey
            }
            const response = await axios.get(`https://api.getpostman.com/collections/${collectionId}`, options);
            return response.data;
        } catch (error) {
          console.error(`Error fetching or encoding content from ${collectionId}:`, error.message);
        }
    },  
    
    async generateSwaggerYaml(collectionId, postmanApiKey) {
        try {
            const { collection } = await this.fetchPostmanCollection(collectionId, postmanApiKey);
            const result = await postmanToOpenApi(JSON.stringify(collection), null, { defaultTag: 'General' })
            return result
        } catch (error) {
            console.warn("Failed to load Swagger Doc", error.message);
            return null
        }
    },

    async generateSwaggerJs(collectionId, config = {}) {
        try {
            const swaggeryml = await this.generateSwaggerYaml(collectionId,config.postmanApiKey);
            const result = yamljs.parse(swaggeryml)
            return result
        } catch (error) {
            console.warn("Failed to load Swagger Doc", error.message);
            return null
        }
    }
   
}