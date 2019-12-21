const models = require('../../models');

exports.getComment = async (req, res) => {
    const { group_id } = req.body;

    console.log(req.body);

    console.log(group_id);

    if(!group_id) {
        const result = {
            status: 400,
            message: "group_id가 없습니다."
        }

        res.status(400).json(result);

        return;
    }else {
        try {
            const comment = await models.Comment.AllComment(group_id);

            const result = {
                status: 200,
                message: "Success to Get Comment",
                data: {
                    comment
                }
            }

            res.status(200).json(result);
        }catch(error) {
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

    if(!group_id || !member_id || !comment) {
        const result = {
            status: 400,
            message: "Body 값 부족"
        }

        res.status(400).json(result);
    }else {
        try{
            
        }catch(error) {

        }
    }
}