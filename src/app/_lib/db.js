import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",            // change if different
    password: "12345678", // replace with your MySQL password
    database: "schoolDB"
});
