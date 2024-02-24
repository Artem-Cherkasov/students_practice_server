const { CompanyChoseStudent } = require('../models/models');
const ApiError = require('../error/apiError');
var generatePassword = require('password-generator');

class UserController {
    async createNew(req, res) {
        console.log(req.body);
        const {
            id_company,
            company_name,
            id_student,
            id_training_type,
            event_title,
            type_of_development,
            accepted } = req.body;
        const event = await CompanyChoseStudent.create({
            id_company,
            company_name,
            id_student,
            id_training_type,
            event_title,
            type_of_development,
            accepted
        });
        return res.json(event);
    }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'))
        }
        res.json(id);
    }

    async getAll(req, res) {
        const offers = await CompanyChoseStudent.findAll({
            where: {
                accepted: null
            }
        });
        return res.json(offers);
    }

    async getAllByStudentID(req, res) {
        const { id_student } = req.params;
        const offers = await CompanyChoseStudent.findAll({
            where: {
                id_student, 
                accepted: null
            }
        });
        return res.json(offers);
    }

    async getAcceptedByStudentID(req, res) {
        const { id_student } = req.params;
        const offers = await CompanyChoseStudent.findAll({
            where: {
                id_student, 
                accepted: true
            }
        });
        return res.json(offers);
    }

    async getOne(req, res) {
        const { id_company_chose_student } = req.params;
        const offer = await CompanyChoseStudent.findOne({
            where: { id_company_chose_student }
        });
        return res.json(offer);
    }

    async update(req, res) {
        console.log(req.body);
        const {
            accepted
        } = req.body;
        const { id_company_chose_student } = req.params
        const event = await CompanyChoseStudent.update(
            {
                accepted
            },
            { where: { id_company_chose_student } }
        )
        return res.json(event);
    }
}

module.exports = new UserController();