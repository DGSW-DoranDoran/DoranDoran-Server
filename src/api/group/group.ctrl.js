const models = require('../../models');

exports.getGroup = async (req, res) => {
  console.log("[GET] Group 요청");
  const { category_id } = req.query;

  try {
    if (!category_id) {
      const groups = await models.GroupInfo.getAllGroups();

      const result = {
        status: 200,
        message: "모든 그룹 조회",
        data: {
          groups
        }
      }

      res.status(200).json(result);
    } else {
      const groups = await models.GroupInfo.getCategoryGroups(category_id)

      const result = {
        status: 200,
        message: "카테고리 검색 그룹",
        data: {
          groups
        }
      }

      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);

    const result = {
      status: 500,
      message: "서버 에러",
      data: {
        error
      }
    }

    res.status(500).json(result);
  }
}

exports.createGroup = async (req, res) => {
  console.log("[POST] Group 요청");
  const { body } = req;

  try {
    await models.GroupInfo.createGroup(body);

    const result = {
      status: 200,
      message: "Success"
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    const result = {
      status: 500,
      message: "Error",
      data: {
        error
      }
    }

    res.status(500).json(result);
  }
}

exports.modifyGroup = async (req, res) => {
  console.log("[PUT] Group 요청");
  const { body } = req;

  try {
    await models.GroupInfo.modifyGroup(body);

    const result = {
      status: 200,
      message: "Success",
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