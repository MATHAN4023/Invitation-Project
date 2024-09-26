// File Imports
const ModelLayer = require('../Model_Layer/Model')


async function AddBranch(req) {
    const AddBranch = await ModelLayer.AddBranch(req);
    return AddBranch? "Branch Added Successfully" : "Failed to Add Branch";
}

module.exports = {AddBranch};