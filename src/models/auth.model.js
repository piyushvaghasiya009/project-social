import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    full_name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
            },
        },
    },
    {
        collection: 'Users',
        timestamps: true,
    });

UsersSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        } else {
            this.password = hash;
            next();
        }
    });
});

UsersSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
};


const usersModel = mongoose.model('Users', UsersSchema);

export default usersModel;