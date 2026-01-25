import app from "./app.js";
import { pool } from "./database/db.js";

app.listen(3000, () => {
  console.log("Server is live");
  pool.connect().then(() => {
    console.log("Connected to the database");
  }).catch((err) => {
    console.error("Database connection error", err);
  });
});