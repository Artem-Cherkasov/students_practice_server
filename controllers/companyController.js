const { Company } = require('../models/models');
const ApiError = require('../error/apiError');
const { Op } = require('sequelize');

class CompanyController {
    async createNew(req, res) {
        console.log(req.body);
        const {
            login,
            name,
            description,
            hr_name,
            hr_phone_number,
            hr_email} = req.body;
        const company = await Company.create({
            login,
            name,
            description,
            hr_name,
            hr_phone_number,
            hr_email
        });
        return res.json(company);
    }

    async check(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'))
        }
        res.json(id);
    }

    async getAll(req, res) {
        const companies = await Company.findAll();
        return res.json(companies);
    }

    async getOne(req, res) {
        const {id_company} = req.params;
        const company = await Company.findOne({
            where: {id_company}
        });
        return res.json(company);
    }

    async deleteAny(req, res) {
        console.log(req.body)
        const company = await Company.destroy({
            where: {
                id_company: req.body
            }
        });
        return res.json(company);
    }

    async deleteOne(req, res) {
        const {id_company} = req.params;
        const company = await Company.destroy({
            where: {id_company}
        });
        return res.json(company);
    }

    async getSearchResult(req, res) {
        const { name } = req.params;
        if (req.params === "") {
            const company = await Company.findAll();
            return res.json(company);
        }
        const company = await Company.findAll({
            where: {
                name: {
                    [Op.substring]: name
                }
            }
        });
        return res.json(company);
    }

    async update(req, res) {
        console.log(req.body);
        const {
            login,
            name,
            description,
            hr_name,
            hr_phone_number,
            hr_email} = req.body;
        const {id_company} = req.params
        const company = await Company.update(
            {
                login,
                name,
                description,
                hr_name,
                hr_phone_number,
                hr_email
            },
            {where: {id_company}}
        )
        return res.json(company);
    }
}

module.exports = new CompanyController();