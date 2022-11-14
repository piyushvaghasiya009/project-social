import usersModel from "../models/auth.model";
import jwt from 'jsonwebtoken';
import message from '../message/api.message';
import config from "../config";

const secreteKey = config.JWT_SECRET;
/**
 * Create a new user
 */

export const createUser = async (req, res) => {
    // get data from body
    const { email, full_name, password } = req.body;
    try {
        // check for user exits or not
        const exitsuser = await usersModel.findOne({ email: email });
        if (exitsuser) {
            return res.status(message.ERROR_CODE).send({ status: message.ERROR_CODE, message: message.ERROR_USER_EXITS });
        }

        // create a new user object
        let newuser = new usersModel({
            full_name: full_name,
            email: email,
            password: password
        })

        const saveuser = await newuser.save();

        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.SUCCESS, data: saveuser });

    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}

/**
 * Login an user
 */

export const logInUser = async (req, res) => {
    // get data from body
    const { email, password } = req.body;
    try {
        // check for user exits or not
        const exitsuser = await usersModel.findOne({ email: email });
        if (!exitsuser) {
            return res.status(message.ERROR_CODE).send({ status: message.ERROR_CODE, message: message.ERROR_NOT_USER });
        }

        let checkPassword = await exitsuser.comparePassword(password);

        if (!checkPassword) {
            return res.status(message.UNAUTHORIZE_CODE).send({ status: message.UNAUTHORIZE_CODE, message: message.ERROR_WRONG_PASSWORD });
        }

        const token = jwt.sign({
            _id: exitsuser._id,
            email: exitsuser.email
        }, secreteKey, {});

        let response = {
            _id: exitsuser._id,
            email: exitsuser.email,
            token: token
        }

        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.SUCCESS, data: response });
    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}