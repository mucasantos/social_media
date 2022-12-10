import User from './../models/user.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/error.handler.js'

const create = async (req, res, next) => {

    const user = new User(req.body)
/*
    var result = await User.findOne({ email: user.email }).then((result) => {
        return result
    })
    if (result != null)
        if (result.email === req.body.email) {
            return res.status(400).json({
                error: "Email already in use"
            })
        }
*/
    user.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    })
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
            if (!user) return res.status(400).json({
                error: "User not found"
            })
            req.profile = user
            next()
        })

    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile) 
}

const update = (req, res, next) => {
    let user = req.profile
    user = extend(user, req.body)
    
    user.updated = Date.now()

    user.save().then((result) => {
        user.hashed_password = undefined
        user.salt = undefined
        res.json(result)
    }).catch((error)=> {
        res.json(error)
    })

 }
const remove = (req, res, next) => {
    let user = req.profile

    User.findByIdAndDelete(user.id).then((result) => {
        res.json(result)
    }).catch((error)=> {
        res.json(error)
    })
 }

export default { create, userByID, read, list, remove, update } 