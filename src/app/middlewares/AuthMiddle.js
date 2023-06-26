const { Schema } = require("mongoose");
const UserModel = require('../models/Users');
class AuthController {

    async login(req, res,) {
        let session = req.session;
        if(session.userID) {
            res.redirect('/')
        }else {
            if(req.method=="GET") {
                res.render('site/login', {layout:false})
            }
            else {
                let formData = req.body;
                const username= formData.username;
                const password = formData.password;
                const user = await UserModel.findOne({ username: username})

                if(!user) {
                    res.render('site/login',{layout:false, alert:"Username or password wrong"})
                }
                else {
                    if(user.username === username && user.password === password) {
                        req.session.userID = user;
                        if (user.role === 'admin') {
                            req.session.userRole = user.role;
                        }
                        res.redirect('/')
                    }
                    else {
                        res.render('site/login',{layout:false, alert:"Username or password wrong"})

                    }
                }

            }
        }
    }

    async register(req, res) {
        let formData = req.body;
        const username = formData.username;
        const password = formData.password;
        const passwordConfirm = formData.password_confirm;
        const fullname = formData.fullname;
        if(password != passwordConfirm) {
            res.render('site/login', {layout:false, alert:"Confirm Fail"})
        }
        
        const user = new UserModel({
            username, password, fullname, role:'user'
        })
        
        await user.save((err, result) => {
            if(err) res.render('site/login', {layout:false, alert:"register fail"})
            else {
                req.session.userID = user;
                res.redirect('/')
            }
        });

    }


    auth(req, res, next) {
        let session = req.session;
        if(session.userID) {
            res.locals.session = req.session;
            next()
        } 
        else {
            res.redirect('/auth/login')
        }
    }
x
    authAdmin(req, res, next) {
        let session = req.session;
        if(!session.userID) {
            res.redirect('/auth/login')
        }
        else {
            if(session.userID.role === 'admin') {
                res.locals.session = req.session;
                next() 
            }
        }
    }

    logout(req, res) {
        req.session.destroy((err)=>{
            if(!err) {
                res.redirect('/')
            }
            else{
                res.redirect('/')
            }
        })
    }
}

module.exports= new AuthController()