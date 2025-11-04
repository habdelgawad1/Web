const { db } = require("/travel.db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = 'user';

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error hashing password" });
        }

    const query = `INSERT INTO User (name, email, password, role) VALUES ('${name}', '${email}', '${hashedPassword}', '${role}')`;

    db.run(query, (err) => {
        if (err) {
            console.log(err);
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(400).json({ error: "Email already exists" });
            }
            return res.status(500).json({ error: "Error creating user" });
        }
        return res.status(201).json({ message: "User created successfully" });
        });
    });
};

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `SELECT * FROM User WHERE email = '${email}'`;

    db.get(query, (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error retrieving user" });
        }
        if (!row) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error comparing passwords" });
            }
            if (!result) {
                return res.status(400).json({ error: "Invalid email or password" });
            }
            return res.status(200).json({
                message: "Login successful",
                data: {id: row.id, name: row.name, email: row.email, role: row.role},
            });
        });
    });
};

module.exports = { signup, login };

    
    


        