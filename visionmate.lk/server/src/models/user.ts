/**
 * User Model
 *
 * @author M.M.N.H.Fonseka
 */

import { model, InferSchemaType, Schema } from "mongoose";

const UserSchema = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      password: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

type User = InferSchemaType<typeof UserSchema>;

export default model<User>("User", UserSchema);
