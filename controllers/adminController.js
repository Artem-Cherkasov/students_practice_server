const { Admin } = require('../models/models');
const ApiError = require('../error/apiError');

class AdminController {
    // async createNew(req, res) {
    //     console.log(req.body);
    //     req.body.pwd_hash = generatePassword(12, false);
    //     const {
    //         login,
    //         pwd_hash,
    //         role} = req.body;
    //     const event = await User.create({
    //         login,
    //         pwd_hash,
    //         role
    //     });
    //     return res.json(event);
    // }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'))
        }
        res.json(id);
    }

    async getAll(req, res) {
        const admins = await Admin.findAll();
        return res.json(admins);
    }

    // async checkUser(req, res) {
    //     console.log(req.body)
    //     const user = User.findOne({
    //         where: {
    //             login: req.body.login,
    //             pwd_hash: req.body.pwd_hash
    //         }
    //     })
    //     return res.json(user);
    //     // console.log(login, pwd_hash)
    // }

    async getOne(req, res) {
        const { id_admin } = req.params;
        const admin = await Admin.findOne({
            where: { id_admin }
        });
        return res.json(admin);
    }

    // async addAny(req, res) {
    //     req.body.map(user => {
    //         user.pwd_hash = generatePassword(12, false)
    //     })
    //     const user = await User.bulkCreate(req.body);
    //     return res.json(user);
    // }
}

module.exports = new AdminController();