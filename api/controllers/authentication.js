const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client, client2 } = require("../configs/database");

exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      isValid = data.rows;

      if (isValid.length !== 0) {
        res.status(400).json({
          error: "User already exists",
        });
      } else {
        //Generate Token
        const token = jwt.sign(
          {
            email: email,
          },
          process.env.Secret_Key
        );

        //Hash Password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error",
            });
          }

          const user = {
            username,
            email,
            password: hash,
          };

          client
            .query(
              `INSERT INTO users (username,email,password,last_login_time) VALUES ('${user.username}','${user.email}','${user.password}',CURRENT_TIMESTAMP);`
            )
            .then((data) => {
              res.status(200).json({
                message: "User Added Succefully",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "Database Error Occurred",
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;

      if (userData.length == 0) {
        res.status(400).json({
          error: "User doesn't exist, SignUp Instead",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Internal Server Error Occurred",
            });
          } else if (result === true) {
            client
              .query(
                `UPDATE users SET last_login_time = CURRENT_TIMESTAMP WHERE u_id = ${userData[0].u_id};`
              )
              .then()
              .catch((err) => {
                res.status(500).json({
                  error: "Database Error Occurred!!",
                });
              });
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.Secret_Key
            );

            res.status(200).json({
              message: "User Signed In Sucessfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "Enter correct password!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database Error Occurred!!",
      });
    });
};
