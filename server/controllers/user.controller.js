import User from './../models/user.js'
import extend from 'lodash/extend.js'
import user from './../models/user.js'
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

            if (!user) return res.status('400').json({
                error: "User not found"
            })

            //salva este dado para utilizar em seguida
            req.profile = user
            next()
        }).catch((error) => {
            return res.status('400').json({
                error: error
            })
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

const update = async (req, res, next) => {

    try {
        let user = req.profile
        //comando extend cria uma classe filho utilizando os dados passados

        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res, next) => {

    console.log(req.profile.id)

    try {
        await user.findByIdAndDelete(req.profile.id)
        res.status(204).json({ "message:": "User deleted!", "success": true, })
    } catch (error) {
        console.log(error)
    }




}

export default { create, userByID, read, list, remove, update } 