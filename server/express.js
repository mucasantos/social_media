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


import userRoutes from './../server/routes/user.route.js' 
import authRoutes from './../server/routes/auth.route.js' 

app.use('/', userRoutes)
app.use('/', authRoutes)


export default app