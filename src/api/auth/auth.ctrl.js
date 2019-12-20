const models = require('../../models');
const tokenLib = require('../../lib/token');

exports.login = async (req, res) => {
  const { id, pw } = req.body;

  if(!id) {
    const result = {
      status: 400,
      message: "id를 입력하세요!",
    }

    res.status(400).json(result);

    return;
  }
  if(!pw) {
    const result = {
      status: 400,
      message: "pw를 입력하세요!",
    }

    res.status(400).json(result);

    return;
  }

  try {
    const member = await models.MemberInfo.findMemberForLogin(id, pw);
    // log
    console.log(`${id} + ${pw}`);
    
    if(!member) {
      const result = {
        status: 403,
        message: "id 혹은 pw가 잘못 되었습니다!",
      }
  
      res.status(403).json(result);

      return;
    }

    const token = await tokenLib.createToken(member);

    console.log(token);

    const result = {
      status: 200,
      message: "로그인 성공!",
      data: {
        token,
        member
      },
    }

    res.status(200).json(result);

  } catch(error) {
    console.log(error);
    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}

exports.signUp = (req, res) => {
  // const { email, pw,  }
  try {
    const result = {
      status: 200,
      message: "회원가입 성공!",
    }

    res.status(200).json(result);

  } catch(error) {

    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}