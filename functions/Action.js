function banMember(message){

if(message.member.manageable){

    message.member.ban({ days: 7, reason: `AntiSpam` }).then(member => {

        message.channel.send(`**✈️ ${message.author.tag} was banned for spamming!**`);
      })

}

};

function kickMember(message){

    if(message.member.manageable){

    message.member.kick(`AntiSpam`).then(member => {

        message.channel.send(`**✈️ ${message.author.tag} was kicked for spamming!**`);
      })


    }
};

function blacklistMember(message){

    if(message.member.manageable){

let blackRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === "blacklist");

if(blackRole){


message.member.roles.add(blackRole.id).then((m) => {

    message.channel.send(`**✈️ ${message.author.tag} Blacklisted for spamming!**`);

})


}
    
        }

};

function muteMember(message){

    if(message.member.manageable){

        let muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
        
        if(muteRole){
        
        
        message.member.roles.add(muteRole.id).then((m) => {
        
            message.channel.send(`**✈️ ${message.author.tag} Muted for spamming!**`);
        
        })
        
        
        }
            
                }

};

module.exports = { banMember, kickMember, blacklistMember, muteMember };