const dotenv = require("dotenv");
const connectDb = require("./src/config/db");
const app = require("./src/app");

dotenv.config();

connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
