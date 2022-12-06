import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import Template from './../template.js'
import User from './../server/models/user.js'



const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())


app.get('/', (req, res, next) => {
    res.status(200).send(Template())
})

app.get('/save-user', (req, res, next) => {

    const user = new User(
        {
            email: "samuca@email.com",
            name: "Samuel Santos",
            salt: "123456",
            hashed_password: "123456"
        }
    )
    user.save().then((result) => {
        res.send(Template(result))
    })
})


export default app