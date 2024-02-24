const { DocumentUpload } = require('../models/models');
const ApiError = require('../error/apiError');
const { Op } = require('sequelize');

const currentPath = require('path');

class DocumentDownloadController {
    async downloadFile(req, res) {
        var file = currentPath.resolve("uploads", `${req.params.name}`);
        res.download(file);
    }
}
module.exports = new DocumentDownloadController();