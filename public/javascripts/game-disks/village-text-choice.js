// This simple game disk can be used as a starting point to create a new adventure.
// Change anything you want, add new rooms, etc.
const village = {
  roomId: 'bizimEv', // Set this to the ID of the room you want the player to start in.
  rooms: [
    {
      id: 'northPath+1',
      name: 'Path',
      desc: `That goes to south.
      To west is tea house. North is the military base.
      To east is butcher [Zafer].`,
      exits: [
        {
          dir: 'north',
          id: "base",
        },
        {
          dir: 'west',
          id: "teaHouse",
        },
        {
          dir: 'south',
          id: "crossRoad",
        },
        {
          dir: 'east',
          id: 'butcher',
        },
      ],
    },
    {
      id: 'crossRoad',
      name: 'Crossroad',
      desc: `To north-south and east direction.
      To west is meatball diner. To south east is grocery. There is butcher on north east.`,
      exits: [
        {
          dir: 'north',
          id: "northPath+1",
        },
        {
          dir: 'west',
          id: "diner",
        },
        {
          dir: 'south east',
          id: "grocery",
        },
        {
          dir: 'north east',
          id: 'butcher',
        },
        {
          dir: 'east',
          id: 'northPath',
        },
        {
          dir: 'south',
          id: 'southPath',
        },
      ],
    },
    {
      id: 'northPath',
      name: 'Path',
      desc: `Path to east and west.
      To the north is butcher.
      On south is baker Fatma's house.`,
  
      exits: [
        {
          dir: 'south',
          id: "grocery",
        },
        {
          dir: 'north',
          id: 'butcher',
        },
        {
          dir: 'west',
          id: 'crossRoad',
        },
        {
          dir: 'east',
          id: 'northPath-1',
        },
      ],
    },
    {
      id: 'northPath-1',
      name: 'Path',
      desc: `Path to east and west.
      To the north is buthcher Eren's house.
      On south is a two-storey house. No one lives there. `,
  
      exits: [
        {
          dir: 'south',
          id: "two-Storey",
        },
        {
          dir: 'north',
          id: 'erenHouse',
        },
        {
          dir: 'west',
          id: 'northPath',
        },
        {
          dir: 'east',
          id: 'northPath-2',
        },
      ],
    },
    {
    id: 'northPath-2',
    name: 'Path',
    desc: `Path to east and west. On south you see the house of butcher.
    To the north is unemployed man's house. `,

    exits: [
      {
        dir: 'south',
        id: "butcherHouse",
      },
      {
        dir: 'north',
        id: 'unempHouse',
      },
      {
        dir: 'west',
        id: 'northPath-1',
      },
      {
        dir: 'east',
        id: 'northPath-3',
      },
    ],
  },
    {
      id: 'northPath-3',
      name: 'Path',
      desc: `Path to west. On south you see the HOUSE OF CARPENTER [Yusuf].
      To east is the park.
      To the north is graveyard. `,

      exits: [
        {
          dir: 'south',
          id: "carpenter's house",
        },
        {
          dir: 'north',
          id: 'graveYard',
        },
        {
          dir: 'west',
          id: 'northPath-2',
        },
        {
          dir: 'east',
          id: 'park',
        },
      ],
    },
    {
      id: 'park',
      name: 'Park',
      desc: 'There is a BENCH',
      items: [
        {
          name: 'Bench',
          img: `
  .=gp.
 .'/$$$$
 || "TP"
 ||          .:
 ||       .-' |
 ||    .-'    |
 ||    |      !____
 ||    |   .-'  .-'
 ||    '.____.-'(
 ||     |  /  /__.
 ||      )(
|::|    /__i           fsc
|::|
          `,
          onUse: () => {
            println(`You sit on bench.`);
          },
          
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'carpenter',
          block: 'No door to enter from this side.'
        },
        {
          dir: 'north',
          id: 'mountain',
          block: "You can't climb the mountain."
        },
        {
          dir: 'west',
          id: 'northPath-3',
        },
        {
          dir: 'east',
          id: 'woods',
        },
      ],
    },
    {
      id: 'woods',
      name: 'Woods',
      desc: `There are trees around.
      You see marketplace on SOUTH.
      Mountain on [NORTH].
      Mountain on [EAST].
      On [WEST] is a park.`,
      items: [
        {
          name: 'wood',
          onUse: () => {const room = getRoom(disk.roomId);
          if (room.id === 'bizimEv') {
            //name 'wood' olan nesnenin indeksini al
            const woodIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('Wood');
            //name 'wood' olan nesneyi sil
            if (woodIndex > -1){
              disk.inventory.splice(woodIndex, 1);
            };
            println(`You put the wood on fire. This will keep the home warm.`);
          } else {
            println(`Better bring home. Mom will burn it in the fireplace.`);
            // this item can only be used once
            };
          },
          isTakeable: true,
          onTake: () => {
            println(`You took the wood.`);
            // update the monstera's description, removing everything starting at the line break
          },
           // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'marketPlace',
        },
        {
          dir: 'north',
          id: 'mountain',
          block: "You can't climb the mountain."
        },
        {
          dir: 'west',
          id: 'park',
        },
        {
          dir: 'east',
          id: 'mountain',
          block: "You can't climb mountain."
        },
      ],
    },
    {
      id: 'garden',
      name: 'Garden',
      img: `
      _______| |_______
     //////////////////
    //////////////////  
    |     _ _        |    |
    |[_] |   |  [_]  |[_] |
    |    |   |       |    |
    |    |   |       |    |
................................
..........................................
......................................................
      `,
      desc: ` 
      Garden has FENCES.
      On [SOUTH] is the HOUSE.
      On [NORTH] is the PATH.
      `,
      items: [
        {
          name: ['Fences','fence'],
          desc: 'Wooden fences. It has one loose WOOD.', // Displayed when the player looks at the item.
          onUse: () => println(`Too long to climb.`),
          onLook: () => {
            if (woodtakenOrShown3) {
              // the key is already in the pot or the player's inventory
              return;
            };
            const garden = getRoom('garden');
            
            // put the silver key in the pot
            garden.items.push({
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
              desc: `Fence wood.`,
              onLook: () => {
                const wood = getItemInInventory('wood') || getItemInRoom('wood');

                // let's also update the description
                wood.desc = `It will be enough for today if burned on fireplace.`;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const fences = getItemInRoom('Fences', 'garden');
                fences.desc = "Fences. Lacking a bid wooden piece of it.";
              },
            });
            woodtakenOrShown3 = true; // Called when the player uses the item.
          },
        },
        {
          name: ['house', 'abandoned house', 'abandoned', 'south'],
          img: `
  _______| |_______
 //////////////////
//////////////////  
|     _ _        |    |
|[_] |   |  [_]  |[_] |
|    |   |       |    |
|    |   |       |    |`,
          desc: 'Abandoned village house. Many people left the village and their houses.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH to try enter the house.`), // Called when the player uses the item.
        },
        {
          name: ['path', 'road', 'north'],
          desc: 'Village path on west and east direction.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to go to the path.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'gardenHouse',
        },
        {
          dir: 'north',
          id: 'path-2',
        },
      ],
    },
    {
      id: 'marketPlace',
      name: 'Marketplace',
      desc: `Empty now. The marketplace is open on fridays. 
      There are some ROTTEN VEGETABLEs on the ground.
      You see path on SOUTH.
      Woods on [NORTH].
      Mountain on [EAST].
      On [WEST] is carpenter.`,
      items: [
        {
          name: ['Rotten vegetable','vegetable', 'eggplant', 'rotten', 'aubergine'],
          desc: 'Mildly rotten. Still edible.', // Displayed when the player looks at the item.
          onUse: () => {const room = getRoom(disk.roomId);
          if (room.id === 'bizimEv') {
            //name 'wood' olan nesnenin indeksini al
            const foodIndex = disk.inventory.map(function(e) {return e.name[0];}).indexOf('Rotten vegetable');
            //name 'wood' olan nesneyi sil
            if (foodIndex > -1){
              disk.inventory.splice(foodIndex, 1);
            };
            println(`You gave the eggplant to mom.`);
          } else {
            println(`Better bring home. Mom and son are hungry.`);
            // this item can only be used once
            };
          },
          isTakeable: true,
          onTake: () => {
            println(`You took the rotten eggplant.`);
            // update the monstera's description, removing everything starting at the line break
            vegetableTaken = true;
          },
           // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'path-2',
        },
        {
          dir: 'north',
          id: 'woods',
        },
        {
          dir: 'west',
          id: 'carpenter',
          block: "Locked and looks no one there."
        },
        {
          dir: 'east',
          id: 'mountain',
          block: "You can't climb mountain."
        },
      ],
    },
    {
      id: 'path-2',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      One side of the path [NORTH], is the MARKETPLACE.
      Other side of the path [SOUTH] is an abandoned GARDEN HOUSE`,
      items: [
        {
          name: ['Marketplace','bazaar', 'market'],
          desc: 'Empty now. Marketplace only open on fridays.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to visit the marketplace.`), // Called when the player uses the item.
        },
        {
          name: ['house','abandoned house', 'abandoned', 'garden', 'garden house'],
          img: `
      ____||____
     ///////////
    ///////////  
    |    _    |  |
    |[] | | []|[]|
    |   | |   |  |
...................
........................
.............................`,
          desc: 'It is a big garden of an abandoned village house.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH to enter garden.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'garden',
        },
        {
          dir: 'north',
          id: 'marketPlace',
        },
        {
          dir: 'west',
          id: 'path-1',
        },
        {
          dir: 'east',
          id: 'path-3',
        },
      ],
    },
    {
      id: 'muhtarBedroom',
      name: 'Muhtar\'s Bedroom',
      desc: `This is a dark room with no windows. 
      There is a BED and a CHEST. 
      DOOR leading to exit.`,
      items: [
        {
          name: ['bed'],
          onUse: () => println(`You don't feel sleepy now.`),
        },
        {
          name: ['chest'],
          onUse: () => println('Locked. You need key.') 
        },
        {
          name: 'door',
          desc: 'Door to exit.', // Displayed when the player looks at the item.
          onUse: () => println('Type GO NORTH, to enter try quitting the bedroom.')
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'muhtarEv',
        }
      ],
    },
    {
      id: 'muhtarEv',
      name: 'Muhtar\'s House',
      desc: `A warm village house of two rooms. 
      There is a sofa, a WARDROBE, FIREPLACE and TELEVISION.
      A DOOR to his bedroom [south].
      Muhtar lives here. But not here now. Better quit.`,
      items: [
        {
          name: ['wardrobe'],
          desc: 'An old wardrobe, probably filled with clothes and some paperwork of muhtar. USE WARDROBE to open it.', // Displayed when the player looks at the item.
          
          onUse: () => 
          {
            const wardrobe = getItemInRoom('wardrobe', 'muhtarEv');
            if (letterTaken){
              wardrobe.desc = `You opened it. There are clothes.`;
            }else{
              wardrobe.desc = `You opened it. There are clothes.
              You see a PAPER.`
              };
              println(wardrobe.desc)
            if (letterTaken || letterShown) {
              // the key is already in the pot or the player's inventory
              return ;
            };
            const muhtarEv = getRoom('muhtarEv');

            // put the silver key in the pot
            muhtarEv.items.push({
              name: 'paper',
              onRead: () => {
                println(`
                Dear Muhtar,
                
                We will take over the village in 10 days.
                
                All the best,
                Commander`);
              },
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
                paper.desc = `Official paper.`;
              },
              isTakeable: true,
              isReadable: true,
              onTake: () => {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const wardrobe = getItemInRoom('wardrobe', 'muhtarEv');
                wardrobe.desc = `You opened it. There are clothes.`;
                letterTaken = true;
              },
              
            });
            letterShown = true;
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
 ______________
| /~~~~~~~~ ||||
||          |..|
||          |  |
| ________ / O |
 ~~~~~~~~~~~~~~~ `,
          desc: `         
          An old TV. Nowadays no one has television except a lucky minority.`, // Displayed when the player looks at the item.
          onUse: () => {
            
            if(tvOpen){
              println('You turned off the television');
              tvOpen = false;
              return;
            };
            tvOpen = true;
            return println("You turned on the TV. Channel 1. This is the only channel since two years. Full of government propaganda.");
          },
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'path-1',
        },
        {
          dir: ['south','door','bedroom'],
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
          desc: 'It belongs to a guy called Yusuf. Providing wooden stuff to the military base.', // Displayed when the player looks at the item.          onUse: () => println(`Type GO NORTH to enter carpenter's workshop.`), // Called when the player uses the item.
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
          block: 'Entrance on the other side.',
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
      Type ITEMS to see what is here.`, // Displayed when the player first enters the room.
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
          id: 'path',
        },
      ],
    },
    {
      id: 'AliEv',
      name: 'House of Ali',
      desc: `An old house.
      Light enters from the WINDOW.
      DOOR to south.
      Your best friend Ali lives here.
      ALİ is here now.      
      `,
      onEnter: () => println(`"Hi bastard" says Ali`),
      items: [
        {
          name: ['window'],
          desc: `You can see the street from window.`, // Displayed when the player looks at the item.
          onUse: () => println(`You opened and fresh air passed through.`), // Called when the player uses the item.          
        },
        {name: ['door'],
        desc: `Door to exit.`, // Displayed when the player looks at the item.
        onUse: () => println(`Type GO TO SOUTH to exit.`), // Called when the player uses the item.          
        },
      ],
      exits: [
        {
          dir: ['south', `door`],
          id: 'path',
        },
      ],
    },
    {
      id: 'path',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      One side of the path [NORTH], is the HOUSE of Ali.
      Other side of the path [SOUTH] is your home`,
      items: [
        {
          name: ['House of Ali', 'Door'],
          img:`
      ______
   ,-' ;  ! \`-.
  / :  !  :  . \\
 |_ ;   __:  ;  |
 )| .  :)(.  !  |
 |"    (##)  _  |
 |  :  ;\`'  (_) (
 |  :  :  .     |
 )_ !  ,  ;  ;  |
 || .  .  :  :  |
 |" .  |  :  .  |
 |mt-2_;----.___|`,
          
          onUse: () => println(`You knocked the door. "Door is open!" said someone.`), // Called when the player uses the item.
        }
      ],
        exits: [
        {
          dir: 'south',
          id: 'bizimEv',
        },
        {
          dir: 'north',
          id: 'AliEv',
        },
        {
          dir: 'west',
          id: 'path1',
        },
        {
          dir: 'east',
          id: 'path-1',
        },
      ],
    },
    {
      id: 'path1',
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
          id: 'path',
        },
        {
          dir: 'west',
          id: 'path2',
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
            if (woodtakenOrShown) {
              // the key is already in the pot or the player's inventory
              return;
            };
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
              },
            });
            woodtakenOrShown = true;
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
          id: 'path1',
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
      WEST WINDOW and EAST WINDOW.
      Light enters from those windows.
      `,
      items: [
        {
          name: ['west window', 'west'],
          desc: `Broken on west side.
          It is closed with a WOOD.`, // Displayed when the player looks at the item.
          onUse: () => println(`Window is too small to pass through.`), // Called when the player uses the item.
          onLook: () => {
            if (woodtakenOrShown1) {
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
                const windowOnWest = getItemInRoom('west window', 'secondStairs');
                windowOnWest.desc = windowOnWest.desc.slice(0, windowOnWest.desc.indexOf('\n'));
              },
            });
            woodtakenOrShown1 = true;
          },
          
        },
        {
          name: ['east window', 'east'],
          desc: `Broken on east side.
          It is closed with a WOOD.`, // Displayed when the player looks at the item.
          onUse: () => println(`Window is too small to pass through.`), // Called when the player uses the item.
          onLook: () => {

            if (woodtakenOrShown2) {
              // the key is already in the pot or the player's inventory
              return;
            }

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
                const windowOnEast = getItemInRoom('east window', 'secondStairs');
                windowOnEast.desc = windowOnEast.desc.slice(0, windowOnEast.desc.indexOf('\n'));
              },
            });
            woodtakenOrShown2 = true;

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
    {
      id: 'path2',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      [NORTH] of the path is grocer's house.
      Other side of the path [SOUTH] is the lone old lady's house`,
      
      exits: [
        {
          dir: 'south',
          id: 'oldHouse',
        },
        {
          dir: 'north',
          id: 'grocerHouse',
          block: 'Door is closed and no one seems to be home',
        },
        {
          dir: 'west',
          id: 'path3',
        },
        {
          dir: 'east',
          id: 'path1',
        },
      ],
    },
    {
      id: 'path3',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      [NORTH] of the path is grocery.
      Other side of the path [SOUTH] is the meatball diner Melisa's house`,
      exits: [
        {
          dir: 'south',
          id: 'melisaHouse',
        },
        {
          dir: 'north',
          id: 'grocery',
          block: 'Door is closed and no one seems to be home',
        },
        {
          dir: 'west',
          id: 'southPath',
        },
        {
          dir: 'east',
          id: 'path2',
        },
      ],
    },
    {
      id: 'southPath',
      name: 'Path',
      desc: `It's the village path. On EAST, NORTH and SOUTH direction. 
      On west is the bakery.`,
      exits: [
        {
          dir: 'south',
          id: 'southPath-1',
        },
        {
          dir: 'north',
          id: 'crossRoad',
        },
        {
          dir: 'west',
          id: 'bakery',
        },
        {
          dir: 'east',
          id: 'path3',
        },
      ],
    },
  ],
  characters: [
    {
      name: ['Mother', 'mom', 'my mother', 'my mom', 'mommy', 'my mommy', 'mommie', 'my mommie'],
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
      name: ['son', 'my son', 'sonnie', 'boy', 'my boy', 'my sonnie'],
      roomId: 'bizimEv',
      desc: `Your son of 5 years. 
      He looks weaker than before.`,
      onTalk: () => println(`"I'm hungry dad." he says. 
      And you know that is true.`),
      topics: [
        
      ],
    },
    {
      name: 'Ali',
      desc: [`Tall, in his thirties.`, `A handsome asshole.`],
      roomId: 'AliEv',
      onTalk: () => println(`"Hey dick head," Ali says;"I wish you were arrested by the soldiers."`),
      topics: [
        {
          option: `I wish you were **DEAD** during accident.`,
          onSelected() {
            println(`"HAHAHAH!" you both laugh.`)
            },
          removeOnRead: true,
        },
        {
          option: `Tell me about **INVASION**`,
          line: `It was two years ago. Really bad times...`,
          prereqs: ['dead'],
          removeOnRead: true,
        },
        {
          option: `Let's talk about **COMMANDER**`,
          line: `He is the commander of village's military base.
          During invasion, so many died in the village.`,
          prereqs: ['dead'],
          removeOnRead: true
        },
        {
          option: `What happened during the **ACCIDENT**`,
          line: `Your wife died.`,
          prereqs: ['dead'],
          removeOnRead: true
        },
        {
          option: `Let's talk about **FOREST**`,
          line: `You can find wood in the forest.`,
          prereqs: ['dead']
        },
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

