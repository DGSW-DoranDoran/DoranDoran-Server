const models = require('../../models');

exports.getComment = async (req, res) => {
    const { group_id } = req.query;

    if (!group_id) {
        const result = {
            status: 400,
            message: "group_id가 없습니다."
        }

        res.status(400).json(result);

        return;
    } else {
        try {
            const comment = await models.Comment.getComment(group_id);

            const result = {
                status: 200,
                message: "Success to Get Comment",
                data: {
                    comment
                }
            }

            res.status(200).json(result);
        } catch (error) {
            console.log(error);

            const result = {
                status: 500,
                message: "Server Error",
                data: {
                    error
                }
            }

            res.status(500).json(result);
        }
    }
}

exports.postComment = async (req, res) => {
    const { group_id, member_id, comment } = req.body;

    if (!group_id || !member_id || !comment) {
        const result = {
            status: 400,
            message: "Body 값 부족"
        }

        res.status(400).json(result);

        return;
    } else {
        try {
            await models.Comment.postComment(group_id, member_id, comment);

            const result = {
                status: 200,
                message: "Success to Write Comment"
            }

            res.status(200).json(result);
        } catch (error) {
            console.log(error);

            const result = {
                status: 400,
                message: "Server Error"
            }

            res.status(400).json(result);
        }
    }
}

exports.deleteComment = async (req, res) => {
    const { comment_id } = req.body;

    if (!comment_id) {
        const result = {
            status: 400,
            message: "comment_id Not Found"
        }

        res.status(400).json(result);

        return;
    } else {
        try {
            await models.Comment.deleteComment(comment_id);

            const result = {
                status: 200,
                message: "Success"
            }

            res.status(200).json(result);
        } catch (error) {
            console.log(error);

            const result = {
                status: 500,
                message: "Server Error",
                data: {
                    error
                }
            }

            res.status(500).json(result);
        }
    }
}