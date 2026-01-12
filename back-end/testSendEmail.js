const { sendEmail } = require("./sendEmail");

sendEmail({
    to: 'email+test1@test.com',
    from: 'email@test.com',
    subject: 'Does this work?',
    text: 'If you\'re reading this then ... yes!!!',
}).then(() => {
    console.log('Email sent');
}).catch(e => console.log(e));