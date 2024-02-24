const { TrainingType } = require('../models/models');
const ApiError = require('../error/apiError');
var generatePassword = require('password-generator');

class UserController {
    async createNew(req, res) {
        console.log(req.body);
        const {
            id_company,
            id_event,
            name,
            places_taken,
            places_total} = req.body;
        const event = await TrainingType.create({
            id_company,
            id_event,
            name,
            places_taken,
            places_total
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

    async getAllWithId(req, res) {
        const { id_company } = req.params;
        const registrations = await TrainingType.findAll({
            where: { id_company }
        })
        return res.json(registrations);
    }

    async getAll(req, res) {
        const registrations = await TrainingType.findAll()
        return res.json(registrations);
    }

    async getOne(req, res) {
        const { id_company_chose_student } = req.params;
        const registration = await TrainingType.findOne({
            where: { id_company_chose_student }
        });
        return res.json(registration);
    }

        async getOneTrainingType(req, res) {
        const { id_training_type } = req.params;
        const registration = await TrainingType.findOne({
            where: { id_training_type }
        });
        return res.json(registration);
    }

    async update(req, res) {
        console.log(req.body);
        const {
            places_taken
        } = req.body;
        const { id_training_type } = req.params
        const event = await TrainingType.update(
            {
                places_taken
            },
            { where: { id_training_type } }
        )
        return res.json(event);
    }
}

module.exports = new UserController();