const express = require('express');
const app = express();
const port = 501;
// const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());

// File Imports
const Tech_Logic = require('./Technical_Logic_Layer/Logic');
const { verifyToken } = require('./Common_Layer/Verify_token');

app.use(cors({
    origin: 'http://localhost:3001', // Allow only this origin
    methods: ['GET', 'POST'], // Specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
}));

app.post('/:action(insert|select|update|delete)/:entity(branch|product)', verifyToken , async (req, res) => {
    const { action, entity } = req.params;
    await handleEntityRequest(action, entity, req, res);
});

const handleEntityRequest = async (action , entity, req, res) => {
    if (!entityActions[action] || !entityActions[action][entity]) {
        return res.status(400).send('Invalid entity or action');
    }
    try {
        const response = await entityActions[action][entity](req);
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const entityActions = {
    insert: {
        branch: Tech_Logic.AddBranch,
        product:  async (req) => {
            console.log("Printing Hello world");
            return "hello";
        } // Replace with the appropriate select logic if needed
    },
    select: {
        branch: async (req) => {
             return "Selct Check";
        },
        product: async (req) => {
            // Implement the select logic for product
            // return await getData.getProductDataIndividual(req);
        }
    }
};

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})