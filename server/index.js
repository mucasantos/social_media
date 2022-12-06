import config from './../config/config.js'
import app from './express.js'

import mongoose from 'mongoose'
import router from './routes/user.route.js'
mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)

mongoose.connect(config.mongoUri )
//mongoose.connection.on('error', () => {
//    throw new Error(`unable to connect to database: ${config.mongoUri}`)/
//})

app.use(router)
app.listen(config.port, (err) => {
    if (err) { console.log(err) }
    console.info('Server started on port %s.', config.port)
})