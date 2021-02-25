const { banMember, blacklistMember, muteMember, kickMember } = require('./Action.js');
const fs = require('fs');



function checker(message, action, max, timeout){

if(!message || !action || !timeout || !max){


console.error("(message, action, timeout) required!");
return;

}else{

if(!message.channel.guild)return;

if(message.member.hasPermission("ADMINISTRATOR"))return;

var dbPath = "./Antispam-DBS.json";

if(!fs.existsSync(dbPath)){

    fs.writeFile(`${dbPath}`, "{ }", err => {

console.log('Antispam DB file has been created!');

      });

}

let Db = JSON.parse(fs.readFileSync(`${dbPath}`, "utf8"));

let guild = Db[message.guild.id];

if(!guild){
  
  saveDB(message.guild.id, message.author.id, Number(timeout));

  return;
}

let user = Db[message.guild.id][message.author.id]

if(user && user.messages >= Number(max)){

    doAction(message, action);

    Db[message.guild.id][message.author.id].messages = 0;

    fs.writeFile(`${dbPath}`, JSON.stringify(Db, null, 4), err => {
        if (err){
          console.error(err).catch(err => {
            console.error(err);
          });
    
        }
      });

    return;
}

saveDB(message.guild.id, message.author.id, Number(timeout));

}

};


function saveDB(guild, author, timeout){

var dbPath = "./Antispam-DBS.json";

if(!fs.existsSync(dbPath)){

  fs.writeFile(`${dbPath}`, "{ }", err => {

console.log('Antispam DB file has been created!');

      });

}

let Db = JSON.parse(fs.readFileSync(`${dbPath}`, "utf8"));

if(Db){

if(!Db[guild]){

    Db[guild] = { 
    
        [author]: {
    
    messages: 1
    
       }
      
      }; 
      
      fs.writeFile(`${dbPath}`, JSON.stringify(Db, null, 4), err => {
        if (err){
          console.error(err).catch(err => {
            console.error(err);
          });

        }else{
            
//Call timeout
timeOut(guild, author, Number(timeout));

        }
      });

    }else if(!Db[guild][author]){

        Db[guild][author] = {

            messages: 1
            
              }

              fs.writeFile(`${dbPath}`, JSON.stringify(Db, null, 4), err => {
                if (err){
                  console.error(err).catch(err => {
                    console.error(err);
                  });
    
                }else{
                    
    //Call timeout
    timeOut(guild, author, Number(timeout));
    
                }
              });

    }else if(Db[guild][author]){

        Db[guild][author].messages += 1;

        fs.writeFile(`${dbPath}`, JSON.stringify(Db, null, 4), err => {
            if (err){
              console.error(err).catch(err => {
                console.error(err);
              });

            }else{

//Call timeout
                timeOut(guild, author, Number(timeout));

            }
          });



    }

}

};


function doAction(message, action){

let act = action.toLowerCase();

if(act === "mute"){

  muteMember(message);

}else if(act === "blacklist"){

  blacklistMember(message);

}else if(act === "kick"){

kickMember(message);

}else if(act === "ban"){

banMember(message);

}

};

function timeOut(guild, author, timeout){

    var dbPath = "./Antispam-DBS.json";

    if(!fs.existsSync(dbPath)){
    
      fs.writeFile(`${dbPath}`, "{ }", err => {
    
    console.log('Antispam DB file has been created!');
    
          });
    
    }
    
    let Db = JSON.parse(fs.readFileSync(`${dbPath}`, "utf8"));


    setTimeout(() => {


Db[guild][author].messages = 0;

fs.writeFile(`${dbPath}`, JSON.stringify(Db, null, 4), err => {
    if (err){
      console.error(err).catch(err => {
        console.error(err);
      });

    }
  });

    }, Number(timeout));


};

module.exports = { checker };