const axios = require('axios');

const slack = async (ctx) => {
    var text = `Date: ${Date()}\n
                Status: ${ctx.status}\n
                Message: ${ctx.message}\n
                body: ${ctx.body}\n
                query: ${ctx.query}`;

    try {
        await axios({
            method: "POST",
            url: "https://hooks.slack.com/services/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",
            contentType: 'application/json',
            data: JSON.stringify({text: text})
        });
    } catch (error) {
        console.log('Slack: ' + error);
    }
};

module.exports = slack;