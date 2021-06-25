/* eslint-disable no-undef */
require("dotenv").config()

const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const users = [
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f71",
    name: "test_premium",
    password: "test",
    role: "premium",
    companyId: 1,
    category_id: "{1, 2, 3, 4}"
  },
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f75",
    name: "test_free_2",
    password: "test",
    role: "free",
    companyId: 1,
    category_id: "1, 2"
  },
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f71",
    name: "test",
    password: "test",
    role: "free",
    companyId: 1,
    category_id: "{1, 2}"
  },
  {
    id: "4ea4aabf-6e05-4368-8a09-3dbef2027069",
    name: "prince_premium",
    password: "prince",
    role: "premium",
    companyId: 2,
    category_id: "{1, 2, 3, 4}"
  },
  {
    id: "bfedd9ed-8397-4113-9ffa-616798416f71",
    name: "prince_free",
    password: "prince",
    role: "free",
    companyId: 2,
    category_id: "{1, 2}"
  }
]

app.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user = users.find((user) => user.name == username)
  if (user) {
    if (user.password === password) {
      // const token = {}

      const accessToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          user: { id: user.id, name: user.name, role: user.role },
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["premium", "free"],
            "x-hasura-default-role": user.role,
            "x-hasura-allowed-org-ids": user.category_id,
            "x-hasura-company-id": user.companyId.toString()
          }
        },
        process.env.ACCESS_TOKEN_SECRET
      )
      res.json({
        user: {
          id: user.id,
          name: user.name,
          companyId: user.companyId,
          role: user.role,
          token: accessToken
        }
      })
    } else {
      res.status(403)
      res.json({
        error: "mot de passe erroné"
      })
    }
  } else {
    res.status(403)
    res.json({
      error: "user not found"
    })
  }
})

app.listen(4300)

// {
//   "key": "8e4dfa5b7b8bd192a845dfa84631a03216f7e53fc641ecf43db4ad46d0fab2c071c8bbe652035b601325cb0985fea3e6f7938c97fec21e5dd1fefee21b454469",
//   "type": "HS256"
// }
// {
//   "key": "PjMHjcFbHLLW5UKe3rGtnPx+q0GnjpqC",
//   "type": "HS256"
// }
