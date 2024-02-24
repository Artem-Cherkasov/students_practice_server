const { DocumentUpload } = require('../models/models');
const ApiError = require('../error/apiError');
const { Op } = require('sequelize');

const currentPath = require('path');

class DocumentUploadController {
    async createFile(req, res) {
        let file;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        file = req.files.file;
        uploadPath = currentPath.resolve(__dirname, '..', "uploads", file.name);

        file.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
        });

        const document = await DocumentUpload.create({
            id_student: req.body.id_student,
            name: file.name,
            path: uploadPath
        });
        return res.json(document);
    }

    async getFiles(req, res) {
        const { id_student } = req.params;
        const event = await DocumentUpload.findAll({
            where: { id_student }
        })
        return res.json(event)
    }

    async deleteAny(req, res) {
        console.log(req.body)
        const document_upload = await DocumentUpload.destroy({
            where: {
                id_document_upload: req.body
            }
        });
        return res.json(document_upload);
    }

    async deleteOne(req, res) {
        const { id_document_upload } = req.params;
        const document_upload = await DocumentUpload.destroy({
            where: { id_document_upload }
        });
        return res.json(document_upload);
    }
}
module.exports = new DocumentUploadController();