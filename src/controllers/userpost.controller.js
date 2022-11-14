
import userPostModel from '../models/userpost.model';
import message from '../message/api.message';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;


/**
 * Create a new user
 */

export const createUserPost = async (req, res) => {
    // get data from body
    const { title, body, active_status, longitude, latitude, created_by } = req.body;
    const { _id } = req.user;

    try {
        console.log(_id, '-_id')
        // create a new user object
        let newpost = new userPostModel({
            title: title,
            body: body,
            active_status: active_status,
            latitude: latitude,
            longitude: longitude,
            created_by: _id
        })
        console.log(newpost, '--');

        const savepost = await newpost.save();

        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.USER_NEW_POST, data: savepost });

    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}

/**
 * update an user post
 */

export const getOnePost = async (req, res) => {
    // get data from body
    const id = req.params.id;

    try {
        const findpost = await userPostModel.findOne({ _id: id });
        if (!findpost) {
            return res.status(message.NOT_FOUND_CODE).send({ status: message.NOT_FOUND_CODE, message: message.USER_POST_NOT_FOUND, data: {} });
        }
        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.GET_USER_POST, data: findpost });

    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}

/**
 * update an user post
 */

export const updateUserPost = async (req, res) => {
    // get data from body
    const { title, body, active_status, longitude, latitude } = req.body;
    const id = req.params.id;
    const { _id } = req.user;

    try {
        const findpost = await userPostModel.findOne({ _id: id });
        if (!findpost) {
            return res.status(message.NOT_FOUND_CODE).send({ status: message.NOT_FOUND_CODE, message: message.USER_POST_NOT_FOUND, data: {} });
        }
        console.log(findpost.created_by.toString(), _id,)
        if (findpost.created_by.toString() != _id) {
            return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.POST_NOT_CHANGE, data: {} });
        }

        const updatepost = await userPostModel.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { title: title, body: body, active_status: active_status, latitude: latitude, longitude: longitude } }, { new: true });
        console.log(updatepost, '-updatepost')
        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.USER_UPDATE_POST, data: updatepost });

    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}

/**
 * delete an user post
 */

export const deleteUserPost = async (req, res) => {
    const { _id } = req.user;
    const id = req.params.id;

    try {
        const findpost = await userPostModel.findOne({ _id: id });
        if (!findpost) {
            return res.status(message.NOT_FOUND_CODE).send({ status: message.NOT_FOUND_CODE, message: message.USER_POST_NOT_FOUND, data: {} });
        }
        if (findpost.created_by.toString() != _id) {
            return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.POST_NOT_CHANGE, data: {} });
        }
        await userPostModel.deleteOne({ _id: id });

        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.USER_DELETE_POST, data: {} });

    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}

/**
 * get post using geolocation
 */

export const getPostGeo = async (req, res, next) => {
    const { longitude, latitude } = req.query;
    console.log(longitude, latitude, '-longitude, latitude')
    try {
        const getpostusinggeo = await userPostModel.find({ longitude: longitude, latitude: latitude });
        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS_CODE, message: message.SUCCESS, data: getpostusinggeo });

    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}

/**
 * show post dashboard
 */

export const dashboard = async (req, res) => {
    try {
        const findallposts = await userPostModel.find()
        console.log(findallposts)
        const active_post = findallposts.filter(post => post.active_status == 1);
        const inactive_post = findallposts.filter(post => post.active_status == 0);


        let response = {
            active_post: active_post.length,
            inactive_post: inactive_post.length
        }


        return res.status(message.SUCCESS_CODE).send({ status: message.SUCCESS, message: message.SUCCESS, data: response });
    } catch (error) {
        console.log(error, '-error')
        return res.status(message.INTERNAL_SERVER_ERROR_CODE).send({ status: message.INTERNAL_SERVER_ERROR_CODE, message: message.ERROR, data: {} });
    }
}