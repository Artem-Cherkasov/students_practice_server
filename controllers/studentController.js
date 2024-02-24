const { Student, CompanyInEvent, User } = require('../models/models');
const ApiError = require('../error/apiError');
const { Sequelize } = require('../db');
const { Op } = require('sequelize');
const excel = require('exceljs');
const currentPath = require('path');
const fs = require('fs');

const sequelize = new Sequelize('students_practice', 'root1', 'Learning-123', {
    host: 'localhost',
    dialect: 'mysql'
})

class StudentController {
    async createNew(req, res) {
        const studentList = req.body;
        const student = await Student.bulkCreate(studentList)//.catch(err => (console.log(err)));
        return res.json(student);
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

    async getExcelFile(req, res) {
        sequelize.query(`SELECT surname, ${'`name`'}, patronymic, birth_year, ${'`group`'}, phone_number, email, hometown, school, math_points, russian_points, physics_points, informatics_points, iap_points, oop_points, skills, achievements, desired_training FROM students_practice.student WHERE id_event='${req.params.id_event}' ORDER BY surname`).then(result => {

            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Students');

            worksheet.columns = [
                { header: 'Фамилия', key: 'surname', width: 10 },
                { header: 'Имя', key: 'name', width: 30 },
                { header: 'Отчество', key: 'patronymic', width: 30 },
                { header: 'Дата рождения', key: 'birth_year', width: 10, outlineLevel: 1 },
                { header: 'Группа', key: 'group', width: 30 },
                { header: 'Телефон', key: 'phone_number', width: 30 },
                { header: 'E-mail', key: 'email', width: 30 },
                { header: 'Родной город', key: 'hometown', width: 30 },
                { header: 'Школа', key: 'school', width: 30 },
                { header: 'Математика', key: 'math_points', width: 30 },
                { header: 'Русский язык', key: 'russian_points', width: 30 },
                { header: 'Физика', key: 'physics_points', width: 30 },
                { header: 'Информатика', key: 'informatics_points', width: 30 },
                { header: 'ИИП', key: 'iap_points', width: 30 },
                { header: 'ООП', key: 'oop_points', width: 30 },
                { header: 'Умения', key: 'skills', width: 30 },
                { header: 'Достижения', key: 'achievements', width: 30 },
                { header: 'Желаемые практики', key: 'desired_training', width: 30 }
            ];

            worksheet.addRows(result[0]);

            workbook.xlsx.writeFile(`${__dirname}/../excel_files/students.xlsx`).then(() => {
                var file = currentPath.resolve("excel_files", `students.xlsx`);
                res.download(file);
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }

    async getAll(req, res) {
        const students = await Student.findAll();
        return res.json(students);
    }

    async getOne(req, res) {
        const { id_student } = req.params;
        const event = await Student.findOne({
            where: { id_student }
        });
        return res.json(event);
    }

    async deleteAny(req, res) {
        const student = await Student.destroy({
            where: {
                id_student: req.body
            }
        });
        return res.json(student);
    }

    async deleteOne(req, res) {
        const { id_student } = req.params;
        const event = await Student.destroy({
            where: { id_student }
        });
        return res.json(event);
    }

    async getSearchResult(req, res) {
        const { full_name } = req.params;
        if (req.params === "") {
            const event = await Student.findAll();
            return res.json(event);
        }
        const event = await Student.findAll({
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
            group,
            phone_number,
            email,
            photo,
            hometown,
            school,
            math_points,
            russian_points,
            physics_points,
            informatics_points,
            iap_points,
            oop_points,
            skills,
            achievements,
            desired_training,
            id_event,
            id_department } = req.body;
        const { id_student } = req.params
        const event = await Student.update(
            {
                login,
                surname,
                name,
                patronymic,
                full_name,
                birth_year,
                group,
                phone_number,
                email,
                photo,
                hometown,
                school,
                math_points,
                russian_points,
                physics_points,
                informatics_points,
                iap_points,
                oop_points,
                skills,
                achievements,
                desired_training,
                id_event,
                id_department
            },
            { where: { id_student } }
        )
        return res.json(event);
    }
}

module.exports = new StudentController();
