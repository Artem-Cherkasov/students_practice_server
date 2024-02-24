const { User } = require('../models/models');
const ApiError = require('../error/apiError');
var generatePassword = require('password-generator');

class UserController {
    async createNew(req, res) {
        console.log(req.body);
        req.body.pwd_hash = generatePassword(12, false);
        const {
            login,
            pwd_hash,
            role} = req.body;
        const event = await User.create({
            login,
            pwd_hash,
            role
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
        const users = await User.findAll();
        return res.json(users);
    }

    async checkUser(req, res) {
        console.log(req.body)
        const user = User.findOne({
            where: {
                login: req.body.login,
                pwd_hash: req.body.pwd_hash
            }
        })
        return res.json(user);
    }

    async getOne(req, res) {
        const { id_user } = req.params;
        const event = await User.findOne({
            where: { id_user }
        });
        return res.json(event);
    }

    async addAny(req, res) {
        req.body.map(user => {
            user.pwd_hash = generatePassword(12, false)
        })
        const user = await User.bulkCreate(req.body);
        return res.json(user);
    }

    async deleteAny(req, res) {
        const user = await User.destroy({
            where: {
                id_user: req.body
            }
        });
        return res.json(user);
    }

    async deleteOne(req, res) {
        const { id_user } = req.params;
        const event = await User.destroy({
            where: { id_user }
        });
        return res.json(event);
    }

    // async registerCompany(req, res) {
    //     const {
    //         login,
    //         pwd_hash,
    //         role,
    //         name,
    //         description,
    //         hr_name,
    //         hr_phone_number,
    //         hr_email} = req.body;
    //     const user = await User.create({
    //         login,
    //         pwd_hash,
    //         role});
    //     const company = await Company.create({
    //         login,
    //         name,
    //         description,
    //         hr_name,
    //         hr_phone_number,
    //         hr_email
    //     })
    //     return res.json(user);
    // }
}

module.exports = new UserController();