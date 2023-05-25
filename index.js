const app = require("./src/server")
const config = require("./src/config/config")

const connect = require("./src/db/connect")

app.listen(config.app.PORT, () => {
    console.log(`Server is running on Port ${config.app.PORT}`)
})

connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

