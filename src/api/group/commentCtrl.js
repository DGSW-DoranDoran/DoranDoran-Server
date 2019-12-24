const colors = require('colors');
const models = require('../../models');
const slack = require('../../middleware/logging');

exports.getComments = async (req, res) => {
    console.log(colors.green('[GET] Get Comments'));

    const { group_id } = req.query;

    var msg = "";
    var result = {};

    if (!group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.red('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try{
            const comments = await models.Comment.getComments(group_id);

            msg = "댓글 조회 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
                status: 200,
                message: msg,
                data: {
                    comments
                }
            }

            res.status(200).json(result);
        } catch (error) {
            console.log(colors.red('ServerError: ' + error));

            msg = "서버 에러";

            result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        };
    };

    result.body = Object.values(req.body);
    result.query = Object.values(req.query);

    slack(result);
};

exports.write = async(req, res) => {
    console.log(colors.yellow('[POST] Write Comment'));

    const { body } = req;

    var msg = "";
    var result = {};

    if (!body.group_id) {
        msg = "group_id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.member_id) {
        msg = "member_id가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else if (!body.comment) {
        msg = "comment가 없습니다.";

        console.log(colors.magenta('Error: ' + msg));

        result = {
            status: 400,
            message: msg
        };

        res.status(400).json(result);
    } else {
        try {
            await models.Comment.write(body);

            msg = "댓글 작성 성공";

            console.log(colors.green('Success: ' + msg));

            result = {
                status: 200,
                message: msg
            };

            res.status(200).json(result);
        } catch (error) {
            console.log(colors.red('ServerError: ' + error));

            msg = "서버 에러";

            result = {
                status: 500,
                message: msg
            };

            res.status(500).json(result);
        };
    };

    result.body = Object.values(req.body);
    result.query = Object.values(req.query);

    slack(result);
};