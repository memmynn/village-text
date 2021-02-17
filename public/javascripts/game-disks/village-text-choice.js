// This simple game disk can be used as a starting point to create a new adventure.
// Change anything you want, add new rooms, etc.
const village = {
  roomId: 'bizimEv', // Set this to the ID of the room you want the player to start in.
  rooms: [
    {
      id: 'muhtarEv',
      name: 'Muhtar\'s House',
      desc: `A warm village house of two rooms. 
      There is a sofa, a WARDROBE, FIREPLACE and TELEVISION.
      A DOOR to his bedroom.
      Muhtar lives here. But not here now. Better quit.`,
      items: [
        {
          name: ['wardrobe'],
          desc: 'An old wardrobe, probably filled with clothes and some paperwork of muhtar.', // Displayed when the player looks at the item.
          onUse: () => 
          {
             
            let papertaken;
            if (papertaken) {
              // the key is already in the pot or the player's inventory
              return;
            };
            println(`You opened it. There are clothes. And you see a PAPER.`)

            const muhtarEv = getRoom('muhtarEv');

            // put the silver key in the pot
            muhtarEv.items.push({
              name: 'paper',
              onUse: () => {
                  println(`It reads 
                  
                  Dear Muhtar,
                  
                  We will take over the village in 10 days.
                  
                  All the best,
                  Commander`);
                  // this item can only be used once
                },
              
              desc: `The official document. Reads 'TOP SECRET!'`,
              onLook: () => {
                const paper = getItemInInventory('paper') || getItemInRoom('paper');

                // let's also update the description
                wood.desc = `Official paper.`;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const wardrobe = getItemInRoom('wardrobe', 'muhtarEv');
                wardrobe.desc = wardrobe.desc.slice(0, wardrobe.desc.indexOf('\n'));
                papertaken = true;
              },
            });
          },
        },
        {
          name: ['fireplace','fire'],
          desc: 'Extinguished fireplace.', // Displayed when the player looks at the item.
          onUse: () => {
            let wood = getItemInInventory('wood');
            if (!wood){
              return println("You have no wood to fire it.");
            };
          },
        },
        {
          name: 'door',
          desc: 'Door to bedroom.', // Displayed when the player looks at the item.
          onUse: () => println('Type GO BEDROOM, to enter try entering the bedroom.')
        },
        {
          name: ['tv', 'television'],
          img: `
           _______________
          | /~~~~~~~~\ ||||
          ||          |...|
          ||          |   |
          | \________/  O |
           ~~~~~~~~~~~~~~~
           `,
          desc: 'An old TV. Yet nowadays no one has television except a lucky minority.', // Displayed when the player looks at the item.
          onUse: () => {
            
            if(tvOpen){
              println('You turned off the television');
              tvOpen = false;
              return;
            };
            tvOpen = true;
            return println("Channel 1. This is the only channel since two years. Full of government propaganda.");
          },
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'path-1',
        },
        {
          dir: ['north','door','bedroom'],
          id: 'muhtarBedroom',
        },
      ],
    },
    {
      id: 'path-1',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      One side of the path [NORTH], is the CARPENTER WORKSHOP.
      Other side of the path [SOUTH] is the HOUSE OF MUHTAR`,
      items: [
        {
          name: ['carpenter\'s workshop','carpenter', 'workshop'],
          desc: 'It belongs to a guy called Yusuf. Providing wooden stuff to the guard post.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to enter carpenter's workshop.`), // Called when the player uses the item.
        },
        {
          name: ['house of muhtar','muhtar', 'house'],
          desc: 'It is muhtar\'s house. Generally in the evenings he is home.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH to enter muhtar\'s house.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'muhtarEv',
        },
        {
          dir: 'north',
          id: 'carpenter',
          block: 'Door is closed and no one seems to be home',
        },
        {
          dir: 'west',
          id: 'path1',
        },
        {
          dir: 'east',
          id: 'path-2',
        },
      ],
    },
    {
      id: 'bizimEv', // Unique identifier for this room. Entering a room will set the disk's roomId to this.
      name: 'Home', // Displayed each time the player enters the room.
      desc: `This is a one room village house. 
      You hear the crackling of the FIREPLACE. 
      You live with your MOTHER and your SON here. 
      There is a door on the NORTH. 
      Type ITEMS to see who is here.`, // Displayed when the player first enters the room.
      items: [
        {
          name: 'door',
          desc: 'It leads NORTH.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to try the door.`), // Called when the player uses the item.
        },
        {
          name: 'bed', // The player can refer to this item by either name. The game will use the first name.
          desc: `There is a bed on the wall. You sleep there.`,
          onUse: () => println(`You are not feeling sleepy now.`)
        },
        {
          name: 'fireplace',
          desc: `It is burning with a relaxing crackling.`,
          //isTakeable: true, // Allows the player to take the item.
          onUse: () => {
            let wood = getItemInInventory('wood');
            if (!wood){
              return println("You have no wood to put.");
            };
          },
        }
      ],
      exits: [
        {
          dir: 'north', // "dir" can be anything. If it's north, the player will type "go north" to get to the room called "A Forest Clearing".
          id: 'path1',
        },
      ],
    },
    {
      id: 'path1',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      One side of the path [NORTH], is the HOUSE of Ali.
      Other side of the path [SOUTH] is your home`,
      exits: [
        {
          dir: 'south',
          id: 'bizimEv',
        },
        {
          dir: 'north',
          id: 'AliEv',
          block: 'Door is closed and no one seems to be home',
        },
        {
          dir: 'west',
          id: 'path2',
        },
        {
          dir: 'east',
          id: 'path-1',
        },
      ],
    },
    {
      id: 'path2',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      On one side of the path, is an ABANDONED HOUSE.[NORTH] 
      In front of the empty house is your neighbor AYŞE'S HOUSE.[SOUTH]`,
      exits: [
        {
          dir: 'north',
          id: 'abandonedHouse',
        },
        {
          dir: 'south',
          id: 'kofteciHouse',
          block: 'Door is closed and no one seems to be home.',
        },
        {
          dir: 'east',
          id: 'path1',
        },
        {
          dir: 'west',
          id: 'path3',
        },
      ],
      items: [
        {
          name: 'abandoned house',
          desc: 'It is a wooden ruined house. Door is open.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH get inside.`), // Called when the player uses the item.
        }
      ],
    },
    {
      id: 'abandonedHouse',
      name: 'Abandoned house',
      desc: `This is an old, ruined, dusty house.
      There is a BROKEN WINDOW. 
      Light enters from the window.
      There is a STAIRS leading up.
      `,
      items: [
        {
          name: ['broken window', 'window', 'broken'],
          desc: `Broken.
          It is closed with a WOOD.`, // Displayed when the player looks at the item.
          onUse: () => println(`Window is too small to pass through.`), // Called when the player uses the item.
          onLook: () => {
            let woodtaken;
            if (woodtaken) {
              // the key is already in the pot or the player's inventory
              return;
            }

            const abandonedHouse = getRoom('abandonedHouse');

            // put the silver key in the pot
            abandonedHouse.items.push({
              name: 'wood',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  //name 'wood' olan nesnenin indeksini al
                  const woodIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('wood');
                  //name 'wood' olan nesneyi sil
                  if (woodIndex > -1){
                    disk.inventory.splice(woodIndex, 1);
                  };
                  println(`You put the wood into fireplace.
                  Now your home is warmer.`);
                } else {
                  println(`You can't use wood here.`);
                  // this item can only be used once
                };
              },
              desc: `It's a wood used in the empty house window.`,
              onLook: () => {
                const wood = getItemInInventory('wood') || getItemInRoom('wood');

                // let's also update the description
                wood.desc = `It will be enough for today if burned on fireplace.`;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const window = getItemInRoom('window', 'abandonedHouse');
                window.desc = window.desc.slice(0, window.desc.indexOf('\n'));
                woodtaken = true;
              },
            });
          },
          
        },
        {
          name: ['stair','stairs'],
          desc: 'It leads to the second floor.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO UP to go upstairs.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'path2',
        },
        {
          dir: ['up', 'upstairs'],
          id: 'secondStairs',
        }
      ],
    },
    {
      id: 'secondStairs',
      name: 'Upstairs',
      desc: `This is the second floor.
      There are two broken windows. 
      WINDOW ON WEST side and WINDOW ON EAST side.
      Light enters from those windows.
      `,
      items: [
        {
          name: ['broken window on west', 'window on west', 'west window'],
          desc: `Broken on west side.
          It is closed with a WOOD.`, // Displayed when the player looks at the item.
          onUse: () => println(`Window is too small to pass through.`), // Called when the player uses the item.
          onLook: () => {
            let woodtaken1;
            if (woodtaken1) {
              // the key is already in the pot or the player's inventory
              return;
            };

            const secondStairs = getRoom('secondStairs');

            // put the silver key in the pot
            secondStairs.items.push({
              name: 'wood',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  //name 'wood' olan nesnenin indeksini al
                  const woodIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('wood');
                  //name 'wood' olan nesneyi sil
                  if (woodIndex > -1){
                    disk.inventory.splice(woodIndex, 1);
                  };
                  println(`You put the wood into fireplace.
                  Now your home is warmer.`);
                } else {
                  println(`You can't use wood here.`);
                  // this item can only be used once
                };
              },
              desc: `It's a wood used in the empty house window.`,
              onLook: () => {
                const wood = getItemInInventory('wood') || getItemInRoom('wood');

                // let's also update the description
                wood.desc = `It will be enough for today if burned on fireplace.`;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const windowOnWest = getItemInRoom('broken window on west', 'secondStairs');
                windowOnWest.desc = windowOnWest.desc.slice(0, windowOnWest.desc.indexOf('\n'));
                woodtaken1 = true;
              },
            });
          },
          
        },
        {
          name: ['broken window on east', 'window on east', 'east window'],
          desc: `Broken on east side.
          It is closed with a WOOD.`, // Displayed when the player looks at the item.
          onUse: () => println(`Window is too small to pass through.`), // Called when the player uses the item.
          onLook: () => {
            let woodtaken2;
            if (woodtaken2) {
              // the key is already in the pot or the player's inventory
              return;
            }

            const scondStairs = getRoom('secondStairs');

            // put the silver key in the pot
            secondStairs.items.push({
              name: 'wood',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  //name 'wood' olan nesnenin indeksini al
                  const woodIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('wood');
                  //name 'wood' olan nesneyi sil
                  if (woodIndex > -1){
                    disk.inventory.splice(woodIndex, 1);
                  };
                  println(`You put the wood into fireplace.
                  Now your home is warmer.`);
                } else {
                  println(`You can't use wood here.`);
                  // this item can only be used once
                };
              },
              desc: `It's a wood used in the empty house window.`,
              onLook: () => {
                const wood = getItemInInventory('wood') || getItemInRoom('wood');

                // let's also update the description
                wood.desc = `It will be enough for today if burned on fireplace.`;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const windowOnEast = getItemInRoom('broken window on east', 'secondStairs');
                windowOneast.desc = windowOneast.desc.slice(0, windowOneast.desc.indexOf('\n'));
                woodtaken2 = true;
              },
            });
          },
          
        },
        {
          name: ['stair','stairs'],
          desc: 'It leads to the first floor.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO DOWN to go downstairs.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: ['down', 'downstairs'],
          id: 'abandonedHouse',
        }
      ],
    },
  ],
  characters: [
    {
      name: ['Mother'],
      roomId: 'bizimEv',
      desc: `She looks old and tired. 
      You know she is tired especially since last year after the accident.`, // printed when the player looks at the character
      // optional callback, run when the player talks to this character
      onTalk: () => println(`"Bring some food and wood sonnie."`),
      // things the player can discuss with the character
      topics: [
        
      ],
    },
    {
      name: 'son',
      roomId: 'bizimEv',
      desc: `Your son of 5 years. 
      He looks weaker than before.`,
      onTalk: () => println(`"I'm hungry dad." he says. 
      And you know that is true.`),
      topics: [
        
      ],
    },
    {
      name: 'red robot',
      roomId: 'advanced',
      onTalk: () => println(`"I can tell you about the JavaScript functions available to you when you use text-engine," they explain. "What would you like to know about?"`),
      topics: [
        {
          option: `Tell me about **FUNCTIONS**`,
          line: `Functions are reuseable bits of JavaScript code. **text-engine** provides several of these which you can use, for instance in callbacks like <code>onUse</code>, <code>onLook</code>, <code>onEnter</code>, etc.`
        },
        {
          option: `Tell me about **COMMANDS**`,
          line: `Every command a player can issue in the game has a corresponding function in **text-engine**.

          For instance, there's a function called <code>go</code> that gets called when the player types **GO**.

          You can add your own custom commands, like the **UNLOCK** command you used to get access to this room. And if existing commands don't work how you want them to, you can ever override them by reassigning them to your own function code.`,
        },
        {
          option: `Tell me about **PRINTLN**`,
          line: `<code>println</code> is a function you can use to print a line of text to the console. It takes up to two arguments:

          **line** (*string*) - The text to be printed.

          **className** (*string*) - Optional. The name of a CSS class to apply to the line. You can use this to style the text.`
        },
        {
          option: `Tell me about **PICKONE**`,
          line: `<code>pickOne</code> is a function you can use to get a random item from an array. It takes one argument:

          **arr** (*array*) - The array with the items to pick from.`
        },
        {
          option: `Tell me about **GETROOM**`,
          line: `<code>getRoom</code> is a function you can use to get a reference to a room by its ID. It takes one argument:

          **id** (*string*) - The unique identifier for the room.`
        },
        {
          option: `Tell me about **ENTERROOM**`,
          line: `<code>enterRoom</code> is a function you can use to move the player to particular room. It takes one argument:

          **id** (*string*) - The unique identifier for the room.`
        },
        {
          option: `Tell me about **GETCHARACTER**`,
          line: `<code>getCharacter</code> is a function you can use to get a reference to a character. It takes up to two arguments:

          **name** (*string*) - The character's name.

          **chars** (*array*) - Optional. The array of characters to search. Defaults to searching all characters on the disk.`
        },
        {
          option: `Tell me about **GETCHARACTERSINROOM**`,
          line: `<code>getCharactersInRoom</code> is a function you can use to get an array containing references to each character in a particular room. It takes one argument:

          **roomId** (*string*) - The unique identifier for the room.`
        },
        {
          option: `Tell me about **GETITEMINROOM**`,
          line: `<code>getItemInRoom</code> is a function you can use to get a reference to an item in a particular room. It takes two arguments:

          **itemName** (*string*) - The name of the item.

          **roomId** (*string*) - The unique identifier for the room.`
        },
        {
          option: `Tell me about **GETITEMININVENTORY**`,
          line: `<code>getItemInInventory</code> is a function you can use to get a reference to an item in the player's inventory. It takes one argument:

          **name** (*string*) - The name of the item.`
        },
        {
          option: `Tell me about **OTHER** functions`,
          line: `There are several other functions available in the engine! Feel free to take a peek at the source code (<a href="https://github.com/okaybenji/text-engine/blob/master/index.js" target="_blank">index.js</a>). It's designed to be open and simple to use and to customize.`
        },
      ],
    },
  ],
};
