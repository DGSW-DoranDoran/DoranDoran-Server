const colors = require('colors');
const models = require('../../models');
const jwt = require('../../lib/token');

exports.login = async (req, res) => {
    console.log(colors.yellow('[POST] Login'));

    const { id, password } = req.body;

    var msg = "";

    if (!id) {
        msg = "id가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!password) {
        msg = "password가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const member = await models.Member.login(id, password);

            if (!member) {
                msg = 'id 또는 password가 잘못되었습니다.';

                console.log(colors.yellow('Error: ' + msg));

                const result = {
                    status: 403,
                    message: msg
                };

                res.status(403).json(result);
            } else {
                msg = '로그인 성공';

                console.log(colors.green('Success: ', msg));

                const token = jwt.encodeToken(member.id, member.name);

                const result = {
                    status: 200,
                    message: msg,
                    data: {
                        token: token,
                        member: member
                    }
                };

                res.status(200).json(result);
            }
        } catch (error) {
            msg = '서버 에러';

            console.log(colors.red('ServerError: ' + error));

            const result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        }
    };
};

exports.register = async (req, res) => {
    console.log(colors.yellow('[POST] Register'));

    const { body } = req;

    var msg = "";

    if (!body.id) {
        msg = "id가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.password) {
        msg = "password가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.name) {
        msg = "name이 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.phone) {
        msg = "phone이 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.gender) {
        msg = "gender가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.grade) {
        msg = "grade가 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.position) {
        msg = "position이 없습니다.";

        console.log(colors.yellow('Error: ' + msg));

        const result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            const check = await models.Member.DuplicateCheck(body.id);

            if (!check) {
                msg = "회원가입 성공";

                const result = {
                    status: 200,
                    message: msg
                };

                res.status(200).json(result);

                console.log('Success: ' + msg);
            } else {
                msg = "이미 등록된 아이디입니다.";

                const result = {
                    status: 409,
                    message: msg
                };

                res.status(409).json(result);

                console.log('Error: ' + msg);
            }
        } catch (error) {
            msg = "서버 에러";

            console.log(colors.red('ServerError: ' + error));

            const result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        };
    };
};