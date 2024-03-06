const express = require('express')
const UserModel = require('../model/user.schema')
const bcrypt = require('bcrypt')

const app = {

    emailExists: async (email) => {
        const existingUser = await UserModel.findOne({ email });
        return !!existingUser;
    },

    signup: async (username, email, password) => {

        const hashPassword = await bcrypt.hash(password, 10)
        return await UserModel.create({ username, email, password: hashPassword })
    },

    login: async (email, password) => {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return null
        }

        const match = await bcrypt.compare(password, user.password)
        return match ? user : null;
    }


}


module.exports = app