const _token = require('../lib/token');
const db = require('../../models');

module.exports = async (req, res, next) => {
    const { token } = req.headers;
    if(!token) {
        return res.status(403).send('토큰 값이 없음');
    }
    console.log(`start decoded`);
    let decoded = await _token.verifyToken(token);
    if(!decoded) {
        return res.status(403).send('토큰이 정의되지 않거나 null임');
    }
    
    await db.User.findOne({where: { id: decoded.id }})
    .then(async user => {
        req.user = user;
    })
    .catch(err => {
        console.log(`TOKEN 멤버 조회불가\n${err}`);
    })
    
    await next();
};