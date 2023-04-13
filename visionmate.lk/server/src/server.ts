/**
 * Node Server
 *
 * @author M.M.N.H.Fonseka
 */

import app from "./app";
import env from "./util/validate-env";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
   .connect(env.MONGO_CONNECTION_STRING)
   .then(() => {
      console.log("Mongoose connected!");
      app.listen(port, () => {
         console.log("Server is listening on port:" + port);
      });
   })
   .catch(console.error);
