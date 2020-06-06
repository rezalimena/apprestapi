const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

function verifikasi(role)
{
    return (req,res,next)=> {
        var tokenBearer = req.headers.authorization;
        
        if(tokenBearer)
        {
            var token = tokenBearer.split(' ')[1];
            console.log(token);
            jwt.verify(token,secret.secret,(err,decode)=> {
                if(err){
                    return res.status(401).send({auth : false, message :"Not Authorized Token"});
                }
                else{
                    if(role == 2)
                    {
                        req.auth = decode;
                        next();
                    }
                    else{
                        return res.status(401).send({auth : false, message :"Not Authorized Roles"});
                    }
                }
            })
        }
        else
        {
            return res.status(401).send({auth : false, message :"You Have No Token"});
        }
    }
}

module.exports = verifikasi;