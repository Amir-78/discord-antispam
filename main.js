const { checker } = require('./functions/Check.js');

function check(message, action, max, timeout){


    if(!message || !action || !timeout || !max){

        
        console.error("(message, action, timeout) required!");
        return;
        
        }

        if(!message.channel.guild)return;

if(message.member.hasPermission("ADMINISTRATOR"))return;



console.log("here 1");
checker(message, action, max, timeout);

};


module.exports = { check };