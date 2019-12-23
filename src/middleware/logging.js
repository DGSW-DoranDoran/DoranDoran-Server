const axios = require('axios');

const slack = async (ctx) => {
    var text = `Date: ${Date()}\nStatus: ${ctx.status}\nMessage: ${ctx.message}`;

    try {
        await axios({
            method: "POST",
            url: "https://hooks.slack.com/services/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",
            contentType: 'application/json',
            data: JSON.stringify({
                text: text
            })
        });
    } catch (error) {
        console.log('' + error);
    }
};

module.exports = slack;