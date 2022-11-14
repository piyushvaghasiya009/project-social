import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UsersPostSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    active_status: {
        //1-active,0-inactive
        type: Number,
        default: 0
    }
},
    {
        collection: 'Post',
        timestamps: true,
    });




const userPostModel = mongoose.model('Post', UsersPostSchema);

export default userPostModel;