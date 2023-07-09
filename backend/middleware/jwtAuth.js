const JWT = require('jsonwebtoken');

const jwtAuth = (req, res, next)=> {
    const token = req.body.token;
    // const token = req.cookies.token;
    if (!token) {
       return res.status(400).json({
        succes: false,
        message: 'Not authorized'
       });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = {id: payload.id, email: payload.email};
        next();
    } catch (error) {
        return res.status(400).json({
            succes: false,
            message: 'Not authorized'
           });
    }
}

module.exports = jwtAuth;
