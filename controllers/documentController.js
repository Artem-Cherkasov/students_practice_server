const { Document } = require('../models/models');
const ApiError = require('../error/apiError');

class DocumentController {
    async createNew(req, res) {
        console.log(req.body);
        const {
            name,
            type,
            template_file,
            sample_file } = req.body;
        const document = await Document.create({
            name,
            type,
            template_file,
            sample_file
        });
        return res.json(document);
    }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'))
        }
        res.json(id);
    }

    async getAll(req, res) {
        const documents = await Document.findAll();
        return res.json(documents);
    }

    async getOne(req, res) {
        const { id_document } = req.params;
        const document = await Document.findOne({
            where: { id_document }
        });
        return res.json(document);
    }

    async deleteAny(req, res) {
        console.log(req.body)
        const document = await Document.destroy({
            where: {
                id_document: req.body
            }
        });
        return res.json(document);
    }

    async deleteOne(req, res) {
        const { id_document } = req.params;
        const document = await Document.destroy({
            where: { id_document }
        });
        return res.json(document);
    }

    async update(req, res) {
        console.log(req.body);
        const {
            name,
            type,
            template_file,
            sample_file } = req.body;
        const { id_document } = req.params
        const document = await Document.update(
            {
                name,
                type,
                template_file,
                sample_file
            },
            { where: { id_document } }
        )
        return res.json(document);
    }
}

module.exports = new DocumentController();