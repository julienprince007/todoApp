require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f71",
    name: "test_premium",
    password: "test",
    role: "premium",
    idOrg: "1",
  },
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f75",
    name: "test_free_2",
    password: "test",
    role: "free",
    idOrg: "1",
  },
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f71",
    name: "test_free",
    password: "test",
    role: "free",
    idOrg: "1",
  },
  {
    id: "4ea4aabf-6e05-4368-8a09-3dbef2027069",
    name: "prince_premium",
    password: "prince",
    role: "premium",
    idOrg: "2",
  },
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f71",
    name: "prince_free",
    password: "prince",
    role: "free",
    idOrg: "2",
  },
];

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((user) => user.name == username);
  if (user) {
    if (user.password === password) {
      const token = {
        username: username,
        "https://hasura.io/jwt/claims": {
          " x-hasura-default-role ": user.role,
          " x- hasura-org-id ": user.idOrg,
        },
      };
      setTimeout(() => {
        const accessToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET);
        res.json({
          user: { id: user.id, name: user.name },
          token: accessToken,
        });
      }, 500);
    } else {
      res.status(403);
      res.json({
        error: "mot de passe erroné",
      });
    }
  } else {
    res.status(403);
    res.json({
      error: "user not found",
    });
  }
});

app.listen(3000);
