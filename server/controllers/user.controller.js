import User from './../models/user.js'
import extend from 'lodash/extend.js'
//import errorHandler from './error.controller'

const create = (req, res, next) => {

    const user = new User(req.body)

    try {
        user.save().then((result) => {
            res.send(result)
        })
    } catch (error) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(error) })

    }

}
const list = (req, res) => {

    try {
        User.find().then((doc) => {
            res.json(doc)
        })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }

}
const userByID = (req, res, next, id) => {

    console.log(id)
    try {
        User.findById(id).then((user) => {

            console.log(user)
            if (!user) return res.status('400').json({
                error: "User not found"
            })
            req.profile = user
            next()
        })

    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile) 
}

const update = (req, res, next) => { }
const remove = (req, res, next) => { }

export default { create, userByID, read, list, remove, update } 