const { Employee, CompanyInEvent } = require('../models/models');
const ApiError = require('../error/apiError');
const { Op } = require('sequelize');

class EmployeeController {
    async createNew(req, res) {
        const employeeList = req.body;
        console.log(employeeList)
        const employee = await Employee.bulkCreate(employeeList);
        return res.json(employee);
    }

    // async apply(req, res) {
    //     const {
    //         id_event,
    //         id_company,
    //         students_to_recruit_number,
    //         responsible_name,
    //         responsible_phone_number,
    //         responsible_email,
    //         details} = req.body;
    //     const companyInEvent = await CompanyInEvent.create({
    //         id_event,
    //         id_company,
    //         students_to_recruit_number,
    //         responsible_name,
    //         responsible_phone_number,
    //         responsible_email,
    //         details});
    //     return res.json(companyInEvent);
    // }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'))
        }
        res.json(id);
    }

    async getAll(req, res) {
        const employees = await Employee.findAll();
        return res.json(employees);
    }

    async getOne(req, res) {
        const { id_employee } = req.params;
        const employee = await Employee.findOne({
            where: { id_employee }
        });
        return res.json(employee);
    }

    async deleteAny(req, res) {
        console.log(req.body)
        const event = await Employee.destroy({
            where: {
                id_employee: req.body
            }
        });
        return res.json(event);
    }

    async deleteOne(req, res) {
        const { id_employee } = req.params;
        const event = await Employee.destroy({
            where: { id_employee }
        });
        return res.json(event);
    }

    async getSearchResult(req, res) {
        const { full_name } = req.params;
        if (req.params === "") {
            const event = await Employee.findAll();
            return res.json(event);
        }
        const event = await Employee.findAll({
            where: {
                full_name: {
                    [Op.substring]: full_name
                }
            }
        });
        return res.json(event);
    }

    async update(req, res) {
        console.log(req.body);
        const {
            login,
            surname,
            name,
            patronymic,
            full_name,
            birth_year,
            phone_number,
            email,
            photo,
            id_department } = req.body;
        const { id_employee } = req.params
        const event = await Employee.update(
            {
                login,
                surname,
                name,
                patronymic,
                full_name,
                birth_year,
                phone_number,
                email,
                photo,
                id_department
            },
            { where: { id_employee } }
        )
        return res.json(event);
    }
}

module.exports = new EmployeeController();