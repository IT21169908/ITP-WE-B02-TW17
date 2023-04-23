import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import * as bcrypt from 'bcryptjs';
import { Permission } from "../enums/auth";
import { checkPermission } from "../middleware/validate-permissions";
import { IUser } from "../models/User.model";
import jwt from "jsonwebtoken";
import env from "../utils/validate-env";

export const UserSchemaOptions: mongoose.SchemaOptions = {
    _id: true,
    id: false,
    timestamps: true,
    skipVersioning: {
        updatedAt: true
    },
    strict: false,
    discriminatorKey: 'role',
    toJSON: {
        getters: true,
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.password;
        }
    },
};

export const UserSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: false,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: false,
    },
    password: {
        type: Schema.Types.String,
        required: false,
    },
    phone: {
        type: Schema.Types.String,
        required: false,
    },
    role: {
        type: Schema.Types.String,
        required: true,
    },
    permissions: [
        {
            type: Schema.Types.String,
            required: true,
            default: [],
        }
    ],
    lastLogin: {
        type: Schema.Types.Date,
        required: false,
    },
    photo: {
        type: Schema.Types.ObjectId,
        required: false,
        // ref: Upload.modelName
    },
    signedUpAs: {
        type: Schema.Types.String,
        required: false,
    },
}, UserSchemaOptions);

UserSchema.pre<IUser>('save', function (next) {
    const user = this as IUser;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        if (user.password != null) {
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        }
    });
});

UserSchema.methods.createAccessToken = function (expiresIn = "365 days") {
    return jwt.sign({user_id: this._id}, env.JWT_SECRET, {expiresIn: expiresIn});
};

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return reject(err);
            return resolve(isMatch);
        });
    });
};

UserSchema.methods.hasPermission = function (...permissions: Permission[]): boolean {
    const user = this as IUser;
    const [success] = checkPermission(user, permissions);
    return success;
};

const User = mongoose.model<IUser>('users', UserSchema);
export default User;
