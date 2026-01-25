import app from "./app.js";
import { pool } from "./config/db.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log("✔️  - Server is live");
  pool
    .connect()
    .then(() => {
      console.log("✔️  - Connected to the database");
    })
    .catch((err) => {
      console.error("Database connection error", err);
    });
});
