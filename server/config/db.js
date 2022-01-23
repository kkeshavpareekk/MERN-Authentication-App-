const mongoose = require("mongoose");

const connectWithDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database is connected successfully.."))
    .catch((error) => {
      console.log("DB CONNECTION ISSUES");
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDB;