# Discord-antispam

Discord-antispam is the best package for antispam protection.

## Installation



```j
npm i discord-pro-antispam
```

## Usage

```javascript
const Discord = require('discord.js');
const client = new Discord.Client();

const antiSpam = require('discord-antispam');

client.on("message", async message => {


    antiSpam.check(message, 'Action', max, timeout);

// Action =  Mute | Ban | Kick | Blacklist;
// max = Number of messages in timeout like 5 messages in 10 seconds.
// timeout = Time between max number of messages.

});

client.login("BOT_TOKEN");
```

## Important:

- `ADMINISTRATOR` permission required.

- if your Action is: Mute you must make role with name "Muted" and disable `SEND_MESSAGES` permission in all text channels.

-  if your Action is: Blacklist you must make role with name "Blacklist" and disable `READ_MESSAGES` permission in all text channels.


## Created by: Amir.#0001
