const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const {
    notFoundError,
    objectIdCastError,
} = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.erros");
const { EmailAlreadyInUseError, NameAlreadyInUseError } = require("../errors/user.erros");

class UserController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async login() {
        try {
            const { email, password } = this.req.body;
            const user = await UserModel.findOne({ email, password });
    
            if (!user) {
                return this.res
                    .status(400)
                    .send({ message: "Usuário não encontrado ou senha incorreta." });
            }
    
            this.res.status(200).send({
                message: "Login bem-sucedido!",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
        } catch (error) {
            this.res.status(500).send({
                message: "Erro ao processar o login",
                error: error.message,
            });
        }
    }

    async getAllUsers() {
        try {
            const users = await UserModel.find({}, { password: 0 });
            this.res.status(200).send(users);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getUserById() {
        try {
            const userId = this.req.params.id;
            const user = await UserModel.findById(userId);

            if (!user) {
                return notFoundError(this.res);
            }

            this.res.status(200).send(user);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async createUser() {
        try {

            const {email, username} = this.req.body;
            const alredyEmail = await UserModel.findOne({email})
            const alredyName = await UserModel.findOne({username})
            

            if(alredyEmail){
                
                return EmailAlreadyInUseError(this.res, email)
            }

            if(alredyName){
                
                return NameAlreadyInUseError(this.res)
            }


            const newUser = new UserModel(this.req.body);
            await newUser.save();
            this.res.status(201).send(newUser);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async updateUser() {
        try {
            const userId = this.req.params.id;
            const userData = this.req.body;

            const userToUpdate = await UserModel.findById(userId);

            if (!userToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdates = ["username", "email", "password"];
            const requestUpdates = Object.keys(userData);

            requestUpdates.forEach((update) => {
                if (allowedUpdates.includes(update)) {
                    userToUpdate[update] = userData[update];
                } else {
                    return notAllowedFieldsToUpdateError(this.res);
                }
            });

            await userToUpdate.save();
            this.res.status(200).send(userToUpdate);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async deleteUser() {
        try {
            const userId = this.req.params.id;
            const userToDelete = await UserModel.findById(userId);
            if (!userToDelete) {
                return notFoundError(this.res);
            }
            await UserModel.findByIdAndDelete(userId);
            this.res.status(200).send(userToDelete);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = UserController;
