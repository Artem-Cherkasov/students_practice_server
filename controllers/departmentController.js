const {Department} = require('../models/models');
const ApiError = require('../error/apiError');

class DepartmentController {
    async createNew(req, res) {
        console.log(req.body);
        const {
            title,} = req.body;
        const department = await Department.create({
            title,
        });
        return res.json(department);
    }

    async check(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'))
        }
        res.json(id);
    }

    async getAll(req, res) {
        const departments = await Department.findAll();
        return res.json(departments);
    }

    async getOne(req, res) {
        const {id_department} = req.params;
        const department = await Department.findOne({
            where: {id_department}
        });
        return res.json(department);
    }

    async deleteAny(req, res) {
        console.log(req.body)
        const department = await Department.destroy({
            where: {
                id_department: req.body
            }
        });
        return res.json(department);
    }

    async deleteOne(req, res) {
        const {id_department} = req.params;
        const department = await Department.destroy({
            where: {id_department}
        });
        return res.json(department);
    }

    async update(req, res) {
        console.log(req.body);
        const {
            title,} = req.body;
        const {id_department} = req.params
        const department = await Department.update(
            {
                title,
            },
            {where: {id_department}}
        )
        return res.json(department);
    }
}

module.exports = new DepartmentController();