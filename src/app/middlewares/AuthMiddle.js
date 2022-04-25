
class AuthController{


    login(req,res,){
        let session = req.session;
        if(session.userID){
            res.redirect('/')
        }else{
            if(req.method=="GET"){
                res.render('site/login',{layout:false})
            }else{
                let formData = req.body;
                const username= formData.username;
                const password = formData.password;
                if(username ==="thehieu" && password=="1"){
                    req.session.userID=1;
                    res.redirect('/')
                }else{
                    res.render('site/login',{layout:false,alert:"Username or password wrong"})
                }
            }
        }
    }
    register(req,res){
        let formData = req.body;
        const username= formData.username;
        const password = formData.password;
        if(username=="thehieu"){
            res.render('site/login',{layout:false,alert:"register fail"})
        }else{
            req.session.userID=2;
            res.redirect('/')
        }
    }
 
    auth(req,res,next){
        let session = req.session;
        if(session.userID){
            next()
        }else{
            res.redirect('/auth/login')
        }
    }

    logout(req,res){
        req.session.destroy((err)=>{
            if(!err){
                res.redirect('/')
            }
            else{
                res.redirect('/')
            }
        })
    }
}

module.exports= new AuthController()