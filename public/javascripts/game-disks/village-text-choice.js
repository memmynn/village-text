// This simple game disk can be used as a starting point to create a new adventure.
// Change anything you want, add new rooms, etc.
const village = {
  roomId: 'bizimEv', // Set this to the ID of the room you want the player to start in.
  rooms: [
    {
      id: 'base',
      name: 'Military Base',
      desc: ``,
      exits: [
        {
          dir: 'south',
          id: "northPath+1",
        }
      ],
    },
    {
      id: 'northPath+1',
      name: 'Path',
      img: ` 
     _________n.[____________].n_________
    |""_""_""_""||==||==||==||""_""_""_""]
    |"""""""""""||..||..||..||"""""""""""|
    |LI LI LI LI||LI||LI||LI||LI LI LI LI|
    |.. .. .. ..||..||..||..||.. .. .. ..|
    |LI LI LI LI||LI||LI||LI||LI LI LI LI|
 ,,;;,;;;,;;;,;;;,;;;,;;;,;;;,;;,;;;,;;;,;;,,
;;jgs;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`,
      desc: `North is the MILITARY BASE
      To west is TEA HOUSE GARDEN. .
      To east is BUTCHER SHOP [Mehmet].
      Path goes to south`,
      items:[
        {
          name: 'butcher shop',
          img: `          |____________________________|
          |____________________________|
          | ________   _____________   |
          |=|##||##|== |##|##|##|##|  =|
          |=|##||##| ==|##|##|##|##| ==|
          |=|==++==|= =|==+==+==+==|  =|
          |=|,-""-.| = | .^. | .^. | ==|
          |=||    || ==|/   \\|/   \\|  =|
          |=||    ||= _|)___(|)___(|_==|
          |=||o   || "---------------"=|
          |=||    ||==    ===    =   ==|
          |=||    ||  ==   ===   ==== =| hjw
          |_||____||___________________|`,
            },
          {
            name: 'tea house garden',
            desc: `It is where people gather and gossip while drinking tea.`, // Displayed when the player looks at the item.
            img: `                                 _________________
            _                     /\\                \`.
          _( )                   /  \\                 \`._             _ _
         ( (  )                .__.'                     \`-._        ( ( )
         (_  ))_    ,-.  . _ ,'/\`._                          \`--_,' (     )
         _((_)( )  (   )  \`._,'____\`--.._____________________,.-'/   (_ _) )
        ( ))|(_ ))(_(  ))   || |  |    |    |    |    |    |    |      |(( _)
       (( _)|  |     |      ||-|--|====|====|====|====|====|====|      |  |
         |  ______......----||_|  |    |    |    |    |    |    |----------''
      --'''': _:   _ :      \`-.|\`-|====|====|====|====|====|====|      :  :_
        (_)):(  ))( (  ))  ,': :\`-|____|____|____|____|____|____|  ~  _:(   )`
            }

      ],
      exits: [
        {
          dir: 'north',
          id: "base",
          block: `"Stop!" says the soldier.`
        },
        {
          dir: 'west',
          id: "teaHouseGarden",
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
      id: 'teaHouse',
        onEnter: () => {
          const cumhur = getCharacter("Cumhur", getCharactersInRoom(disk.roomId)) !== undefined
          if (!cumhur) {
            println('Owner [Cumhur] is not here.')
            // Look at a character.
            return
          } 
          println(`Owner [Cumhur] sits behind BENCH.`)
          const bench = getItemInRoom('bench', 'teaHouse').desc = 'Cumhur sits behind it.'
        },
      name: 'Tea House',
      desc: `
      Entered from DOOR [south].
      There is a BENCH.
      Behind bench there is a tea BOILER.
      There are two tables in this small tea house.
      FIRST TABLE near the door.
      SECOND TABLE in the middle of tea house.
      Sided with two big windows. 
      WEST WINDOW and EAST WINDOW
      `,
      items:[
          {
            name: 'bench',
            desc: `It is used for tea service.`, // Displayed when the player looks at the item.
            onLook: () => {
            const room = getRoom(disk.roomId);
            const items = (room.items || []).filter(item => item.isTakeable); //odadaki takeable itemler
          
            if (!items.length) {
              println(`There's nothing to take.`);
              return;
              }
            }
          },
          {
            name: 'west window',
            desc: `Facing the west side.`, // Displayed when the player looks at the item.
            onUse: () => println('Not possible to open.'),
            onLook: () => println('You see the starting of the pine trees. Some dense and shadowy pine forest.')
          },
          {
            name: 'east window',
            desc: `Facing the east side.`, // Displayed when the player looks at the item.
            onUse: () => println('Not possible to open.'),
            onLook: () => println('There are soldiers around the base building.')
          },
          {
          name: ['door', 'south door', 'door to south', 'door to garden', 'garden door','tea house door'],
          desc: `Door is open. You see the garden.`, // Displayed when the player looks at the item.
          onUse: () => {
              const door = getItemInRoom('tea house door', 'teaHouse');
              if(!teaHouseDoorClosed){
              println("You closed it. Type GO SOUTH to exit.")
              teaHouseDoorClosed = true
              door.desc = 'Closed.'
              door.img = ` 
  ______________
  |\\ ___________ /|
  | |  _ _ _ _  | |
  | | | | | | | | |
  | | |-+-+-+-| | |
  | | |-+-+=+%| | |
  | | |_|_|_|_| | |
  | |    ___    | |
  | |   [___] ()| |
  | |         ||| |
  | |         ()| |
  | |           | |
  | |           | |
  | |           | |
  |_|___________|_|  ejm`
            } else {
              println("You opened it. Type GO SOUTH to exit.")
              doorClosed2 = false
              door.desc = 'Open. You see the garden.'
              door.img = `______________
  |\\ ___________ /|
  | |  /|,| |   | |
  | | |,x,| |   | |
  | | |,x,' |   | |
  | | |,x   ,   | |
  | | |/    |%==| |
  | |    /] ,   | |
  | |   [/ ()   | |
  | |       |   | |
  | |       |   | |
  | |       |   | |
  | |      ,'   | |
  | |   ,'      | |
  |_|,'_________|_| ejm`;
                }
                return
              },
            
          },
        {
          name: 'first table',
          desc: `Near the door. People sit here for drinking tea and gossip.`, // Displayed when the player looks at the item.
          onUse: () => println('You sit')
        },
        {
          name: 'second table',
          desc: `In the middle of tea house.`, // Displayed when the player looks at the item.
          onUse: () => println('You sit')
        },
        {
          name: 'boiler',
          desc: `You can hear the boiling tea.`, // Displayed when the player looks at the item.
        },        
      ],
      exits: [
        {
          dir: 'south',
          id: 'teaHouseGarden',
        }
      ],
  },
    {
      id: 'teaHouseGarden',
        onEnter: () => {
          const cumhur = getCharacter("Cumhur", getCharactersInRoom(disk.roomId)) !== undefined
          if (!cumhur) {
            println('Owner [Cumhur] is not here.')
            // Look at a character.
            return
          } 
          println(`Owner [Cumhur] sits on SECOND TABLE near tea house door.`)
          const secondTable = getItemInRoom('second table', 'teaHouseGarden').desc = 'Cumhur sits here.'
        },
      name: 'Tea House Garden',
      desc: `
      Entered from EAST GATE [entrance from path] or from NORTH DOOR [Tea house door].
      There are three tables in this small garden.
      FIRST TABLE next to WEST GATE, close to path.
      SECOND TABLE next to NORTH DOOR [door to tea house]
      THIRD TABLE in the middle of the garden.
      You feel refreshed.
      To NORTH you see the the Tea House.
      To west, you see the pine forest and mountains behind the garden wall.
      `,
      items:[
        {
          name: ['east gate'],
          desc: 'You can see the village path through the gate.', // Displayed when the player looks at the item.
        },
        {
          name: 'first table',
          desc: `Near the garden gate on west.`, // Displayed when the player looks at the item.
          onUse: () => println('You sit')
        },
        {
          name: 'second table',
          desc: `Near the tea house door on north.`, // Displayed when the player looks at the item.
          onUse: () => println('You sit')
        },
        {
          name: ['third table '],
          desc: 'In the middle of tea house garden.', // Displayed when the player looks at the item.
          onUse: () => println('You sit')
        },
        {
          name: ['tea house door','door', 'north door', 'door to north', 'door to tea house'],
          desc: `Door is open. You see inside the tea house.`, // Displayed when the player looks at the item.
          onUse: () => {
              const door = getItemInRoom('tea house door', 'teaHouseGarden');
              if(!teaHouseDoorClosed){
              println("You closed it. Type GO NORTH to exit.")
              teaHouseDoorClosed = true
              door.desc = 'Closed.'
              door.img = ` 
  ______________
  |\\ ___________ /|
  | |  _ _ _ _  | |
  | | | | | | | | |
  | | |-+-+-+-| | |
  | | |-+-+=+%| | |
  | | |_|_|_|_| | |
  | |    ___    | |
  | |   [___] ()| |
  | |         ||| |
  | |         ()| |
  | |           | |
  | |           | |
  | |           | |
  |_|___________|_|  ejm`
            } else {
              println("You opened it. Type GO NORTH to exit.")
              doorClosed2 = false
              door.desc = 'Open. You see inside the tea house.'
              door.img = `______________
  |\\ ___________ /|
  | |  /|,| |   | |
  | | |,x,| |   | |
  | | |,x,' |   | |
  | | |,x   ,   | |
  | | |/    |%==| |
  | |    /] ,   | |
  | |   [/ ()   | |
  | |       |   | |
  | |       |   | |
  | |       |   | |
  | |      ,'   | |
  | |   ,'      | |
  |_|,'_________|_| ejm`;
                }
                return
              },
            
          },
        
      ],
      exits: [
        {
          dir: 'east',
          id: 'northPath+1',
        },
        {
          dir: 'north',
          id: 'teaHouse'
        },
        {
          dir: 'south',
          id: 'meatballDiner',
          block: 'You can\'t enter the Meatball Diner from this side.'
        },
      ],
  },
  {
      id: 'butcher',
      onEnter: () => {
        const mehmet = getCharacter("Mehmet", getCharactersInRoom(disk.roomId)) !== undefined
        if (!mehmet) {
          println(`Mehmet is not here.`) // Look at a character.
          return
        } 
        println(`Mehmet stands behind the display fridge.`)
      },
      name: 'Butcher',
      desc: `Belongs to Mehmet.
      You see a display FRIDGE.
      It has one door to SOUTH.
      Another door to WEST.`,
      items:[
        {
          name: ['fridge', 'display fridge'],
          desc: 'Some meat and chicken are displayed.', // Displayed when the player looks at the item.
          onLook: () => {
            const room = getRoom(disk.roomId);
            const items = (room.items || []).filter(item => item.isTakeable); //odadaki takeable itemler
          
            if (!items.length) {
              println(`There's nothing to take.`);
              return;
              }
          }
        },
        {
          name: ['west door'],
          desc: `Door is open. You can see the path.`, // Displayed when the player looks at the item.
          onUse: () => {
              const door = getItemInRoom('west door', 'butcher');
              if(!doorClosed3){
              println("You closed it. Type GO WEST to exit.")
              doorClosed3 = true
              door.desc = 'Closed.'
              door.img = ` 
   ______________
  |\\ ___________ /|
  | |  _ _ _ _  | |
  | | | | | | | | |
  | | |-+-+-+-| | |
  | | |-+-+=+%| | |
  | | |_|_|_|_| | |
  | |    ___    | |
  | |   [___] ()| |
  | |         ||| |
  | |         ()| |
  | |           | |
  | |           | |
  | |           | |
  |_|___________|_|  ejm`
            } else {
              println("You opened it. Type GO WEST to exit.")
              doorClosed3 = false
              door.desc = 'Open. You see the path.'
              door.img = `______________
  |\\ ___________ /|
  | |  /|,| |   | |
  | | |,x,| |   | |
  | | |,x,' |   | |
  | | |,x   ,   | |
  | | |/    |%==| |
  | |    /] ,   | |
  | |   [/ ()   | |
  | |       |   | |
  | |       |   | |
  | |       |   | |
  | |      ,'   | |
  | |   ,'      | |
  |_|,'_________|_| ejm`;
                }
                return
              },
        },
        {
          name: ['south door'],
          desc: `Door is open.`, // Displayed when the player looks at the item.
          onUse: () => {
              const door = getItemInRoom('south door', 'butcher');
              if(!doorClosed4){
              println("You closed it. Type GO SOUTH to exit.")
              doorClosed4 = true
              door.desc = 'Closed.'
              door.img = ` 
   ______________
  |\\ ___________ /|
  | |  _ _ _ _  | |
  | | | | | | | | |
  | | |-+-+-+-| | |
  | | |-+-+=+%| | |
  | | |_|_|_|_| | |
  | |    ___    | |
  | |   [___] ()| |
  | |         ||| |
  | |         ()| |
  | |           | |
  | |           | |
  | |           | |
  |_|___________|_|  ejm`
            } else {
              println("You opened it. Type GO SOUTH to exit.")
              doorClosed4 = false
              door.desc = 'Open. You see the crossroad.'
              door.img = `______________
  |\\ ___________ /|
  | |  /|,| |   | |
  | | |,x,| |   | |
  | | |,x,' |   | |
  | | |,x   ,   | |
  | | |/    |%==| |
  | |    /] ,   | |
  | |   [/ ()   | |
  | |       |   | |
  | |       |   | |
  | |       |   | |
  | |      ,'   | |
  | |   ,'      | |
  |_|,'_________|_| ejm`;
                }
                return
              },
            
          }
      ],
      exits: [
        {
          dir: 'south',
          id: 'northPath',
        },
        {
          dir: 'west',
          id: 'northPath+1',
        },
      ],
    },
    {
      id: 'crossRoad',
      name: 'Crossroad',
      desc: `To north-south and east direction.
      To west is meatball diner.`,
      exits: [
        {
          dir: 'north',
          id: "northPath+1",
        },
        {
          dir: 'west',
          id: "meatballDiner",
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
      id: 'meatballDiner',
      onEnter: () => {
        const ayşe = getCharacter("Ayşe", getCharactersInRoom(disk.roomId)) !== undefined
        if (!ayşe) {
          // Look at a character.
          return
        } 
        println(`Ayşe stands behind the service bench.`)
      },
      name: 'Meatball Diner',
      desc: `Ayşe's diner.
      Smells delicious meatballs.
      There is a BENCH for self service.
      You can see the GRILL behind the bench.
      There is one TABLE to sit and eat.
      It has a DOOR to EAST`,
      items:[
        {
          name: ['grill'],
          desc: 'For grilling meatballs.', // Displayed when the player looks at the item.
        },
        {
          name: 'bench',
          desc: `It has few stuff on it.`, // Displayed when the player looks at the item.
          onLook: () => {
          const room = getRoom(disk.roomId);
          const items = (room.items || []).filter(item => item.isTakeable); //odadaki takeable itemler
        
          if (!items.length) {
            println(`There's nothing to take.`);
            return;
            }
          }
        },
        {
          name: ['door', 'east door', 'door to east'],
          desc: `Door is open.`, // Displayed when the player looks at the item.
          onUse: () => {
              const door = getItemInRoom('door', 'meatballDiner');
              if(!doorClosed2){
              println("You closed it. Type GO EAST to exit.")
              doorClosed2 = true
              door.desc = 'Closed.'
              door.img = ` 
   ______________
  |\\ ___________ /|
  | |  _ _ _ _  | |
  | | | | | | | | |
  | | |-+-+-+-| | |
  | | |-+-+=+%| | |
  | | |_|_|_|_| | |
  | |    ___    | |
  | |   [___] ()| |
  | |         ||| |
  | |         ()| |
  | |           | |
  | |           | |
  | |           | |
  |_|___________|_|  ejm`
            } else {
              println("You opened it. Type GO EAST to exit.")
              doorClosed2 = false
              door.desc = 'Open. You see the crossroad.'
              door.img = `______________
  |\\ ___________ /|
  | |  /|,| |   | |
  | | |,x,| |   | |
  | | |,x,' |   | |
  | | |,x   ,   | |
  | | |/    |%==| |
  | |    /] ,   | |
  | |   [/ ()   | |
  | |       |   | |
  | |       |   | |
  | |       |   | |
  | |      ,'   | |
  | |   ,'      | |
  |_|,'_________|_| ejm`;
                }
                return
              },
            
          },
        {
          name: ['table '],
          desc: 'For dining.', // Displayed when the player looks at the item.
        },
      ],
      exits: [
        {
          dir: 'east',
          id: 'crossRoad',
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
          id: "fatmaHouse",
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
      id: 'fatmaHouse',
      name: 'Fatma\'s House',
      desc: `Made of mudbrick. Light comes from the window.
      A DOOR to NORTH.
      A GATE to SOUTH.
      A CHEST in corner of the room.
      A WINDOW to WEST.
      You know Fatma is a good person. During invasion she gave you some flour.`,
      items: [
        {
          name: ['window'],
          desc: `Open. You see the crossroad.`, // Displayed when the player looks at the item.
          onUse: () => {
            const window = getItemInRoom('window', 'fatmaHouse');
            if(!windowClosed){
              println("You closed it.")
              windowClosed = true
              window.desc = 'Closed.'
              window.img = ` 
   ______________
  |\\ ___________ /|
  | |  _ _ _ _  | |
  | | | | | | | | |
  | | |-+-+-+-| | |
  | | |-+-+=+%| | |
  | | |_|_|_|_| | |
  | |    ___    | |
  | |   [___] ()| |
  | |         ||| |
  | |         ()| |
  | |           | |
  | |           | |
  | |           | |
  |_|___________|_|  ejm` 
            } else {
              println("You opened it. Fresh air fills the room.")
              windowClosed = false
              window.desc = 'Open. You see the crossroad.'
              window.img = `______________
  |\\ ___________ /|
  | |  /|,| |   | |
  | | |,x,| |   | |
  | | |,x,' |   | |
  | | |,x   ,   | |
  | | |/    |%==| |
  | |    /] ,   | |
  | |   [/ ()   | |
  | |       |   | |
  | |       |   | |
  | |       |   | |
  | |      ,'   | |
  | |   ,'      | |
  |_|,'_________|_| ejm`;
                }
                return
              },
           
        }, // Called when the player uses the item.          
        {
          name: ['door','north'],
          desc: 'It leads to exit.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to exit.`), // Called when the player uses the item.
        },
        {
          name: ['gate', 'south'],
          desc: `A doorless gate to another room.`, // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH.`), // Called when the player uses the item.
          onLook: () => println(`You see kitchen bench through the gate. It leads to kitchen.`)

        },

        {
          name: ['chest'],
          desc: 'Looks old like most of the things in this village.', // Displayed when the player looks at the item.
          onUse: () => println(`Locked. You need a key.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'northPath',
        },
        {
          dir: 'south',
          id: 'fatmaKitchen',
        },
      ],
    },
    {
      id: 'fatmaKitchen',
      name: 'Kitchen',
      desc: `
      There is a bench and sink.
      On bench are some STUFF and FLOUR.`,
      items: [
        {
          name: ['stuff'],
          desc: `Some unnecessary stuff.
          
          There is a PLATE`,
          onLook: () => {
            if(plateSeen){
              return
            };
            plateSeen = true;
            const kitchen = getRoom('fatmaKitchen');
            kitchen.items.push({
              name: 'plate',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  //name 'wood' olan nesnenin indeksini al
                  const plateIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('plate');
                  //name 'wood' olan nesneyi sil
                  if (plateIndex > -1){
                    disk.inventory.splice(plateIndex, 1);
                  };
                  println(`You gave the plate.`);
                  plateGiven = true;
                } else {
                  println(`You can't use plate here.`);
                  // this item can only be used once
                };
              },
              desc: `A beautiful porcelain plate.`,
              onLook: () => {
                const plate = getItemInInventory('plate') || getItemInRoom('plate', 'fatmaKitchen');

                // let's also update the description
                plate.desc = `My mom will like this plate.`;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it for a better purpose.`);
                const stuff = getItemInRoom('stuff', 'fatmaKitchen')
                stuff.desc='Some unnecessary stuff, missing a plate.'
              },
            })
          }
        },
        {
          name: 'flour',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  println(`"Mom" you said. "Look what I bought for you"
                  "Oh that is great. I will cook bread with it." she smiles like sunshine.`)
                  flourGiven = true;
                  const flourIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('flour');
                  //name 'wood' olan nesneyi sil
                  if (flourIndex > -1){
                    disk.inventory.splice(flourIndex, 1);
                  }
                } else {
                  println(`Tastes like dust. I think mom can make use of it.`);
                  // remove the block
                }
              },
              isTakeable: true,
              onTake: () => {
                println(`You burrowed it.`);
                const kitchen = getRoom('fatmaKitchen')
                kitchen.desc = 'There is a bench and sink. On bench are some STUFF';
              }
        },
        {
          name: ['gate'],
          desc: 'Gate to other room.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to get to the other room.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'fatmaHouse',
        }
      ],
    },
    {
      id: 'erenHouse',
      name: 'Eren\'s House',
      desc: `Mud-brick.
      It has a GATE to NORTH.
      A DOOR to SOUTH.
      A SOFA and a TABLE.
      You and Eren, the owner of this house didn't get on well.
      No window on this house. So it is dark.`,
      items: [
        {
          name: 'sofa',
          desc: 'It is an ordinary, wooden sofa.', // Displayed when the player looks at the item.
          onUse: () => println(`You sit on it.`), // Called when the player uses the item.
        },
        {
          name: 'table',
          desc: `Placed in front of the sofa, made of pine.

          There is an ENVELOPE on the table`, // Displayed when the player looks at the item.
          onLook: () => {
            if (envelopeSeen || envelopeTaken) {
              // the key is already in the pot or the player's inventory
              return;
            }
            envelopeSeen = true;
            const erenHouse = getRoom('erenHouse');
            // put the silver key in the pot
            erenHouse.items.push({
              name: 'envelope',
              desc: `It reads "SECRET DON'T OPEN!"`,

              onUse: () => {
                  println(`You opened the envelope.`);
                  // remove the block
                  envelopeOpen = true;
                  const envelope = getItemInInventory('envelope') || getItemInRoom('envelope', 'erenHouse');
                  envelope.name = 'envelope (open)'
                  envelope.desc = `
                It reads:
                "Dear Eren,
                
                Thank you for your helps during the invasion.
                
                Find your reward in the village entrance to South.
                
                All the best,
                Commander"`;
                },
              onRead: () => {
                if(envelopeOpen){
                  println`
                Dear Eren,
                
                Thank you for your helps during the invasion.
                
                Find your reward in the village entrance to South.
                
                All the best,
                Commander`;
                } else{
                println(`SECRET DON'T OPEN!`)
                }
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                envelopeTaken = true
                // update the monstera's description, removing everything starting at the line break
                const table = getItemInRoom('table', 'erenHouse')
                table.desc = table.desc.slice(0, table.desc.indexOf('\n'));
              }
            })
          },
        },          
        {
          name: ['gate', 'north'],
          desc: `A doorless gate to another room.`, // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH.`), // Called when the player uses the item.
          onLook: () => println(`You see kitchen bench through the gate. It leads to kitchen.`)

        },
        {
          name: ['door','south'],
          desc: 'It leads to exit.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH to exit.`), // Called when the player uses the item.
        },
        
      ],
      exits: [
        {
          dir: 'south',
          id: 'northPath-1',
        },
        {
          dir: 'north',
          id: 'erenKitchen',
        },
      ],
    },
    {
      id: 'erenKitchen',
      name: 'Kitchen',
      desc: `
      There is a bench.
      On bench are some STUFF and FOOD.`,
      items: [
        {
          name: ['stuff'],
          desc: `Some unnecessary stuff.
          There is a KNIFE`,
          onLook: () => {
              if(knifeSeen){
              return
            }
            knifeSeen = true;
            const kitchen = getRoom('erenKitchen')
            kitchen.items.push({
              name: 'knife',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  //name 'wood' olan nesnenin indeksini al
                  const knifeIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('knife');
                  //name 'wood' olan nesneyi sil
                  if (knifeIndex > -1){
                    disk.inventory.splice(knifeIndex, 1);
                  };
                  println(`You gave the knife.`);
                  knifeGiven = true;
                } else {
                  println(`You can't use knife here.`);
                  // this item can only be used once
                };
              },
              desc: `My mom may use this for chopping vegetables.`,
              isTakeable: true,
              onTake: () => {
                println(`You stole it.`);
                const stuff = getItemInRoom('stuff', 'erenKitchen')
                stuff.desc = "Some unnecessary stuff."
                }
            })
          }
        },
        {
          name: 'food',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  println(`"Mom" you said. "Look what I bought for you"
                  "Oh that is great." she smiles like she missed meat for a thousand years.`)
                  foodGiven = true;
                  let isimler = ['food', 'roasted chicken']
                  for (let obj = 0; obj < disk.inventory.length; obj++){
                    for (let isim = 0; isim < isimler.length; isim++ ){
                      if (isimler[isim] === disk.inventory[obj].name){
                        disk.inventory.splice(obj, 1)
                      }
                    }
                  }
                } else {
                  println(`I won't eat them without my son.`);
                  // remove the block
                }
              },
              desc: `It's roasted chicken!`,
              onLook: () => {
                const roastedChicken = getItemInInventory('food') || getItemInRoom('food', 'erenKitchen');
                roastedChicken.name = "roasted chicken";

                // let's also update the description
                roastedChicken.desc = `Looks and smells so tasty.`;
                delete roastedChicken.onLook;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                const kitchen = getRoom('erenKitchen')
                kitchen.desc = 'There is a bench and sink. On bench are some STUFF';
              }
        },
        {
          name: ['gate'],
          desc: 'Gate to other room.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH to get to the sitting room.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'erenHouse',
        }
      ],
    },
    {
      id: 'northPath-1',
      name: 'Path',
      desc: `Path to east and west.
      To the north is Eren's house (you don't quite like Eren).
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
      id: 'two-Storey',
      name: 'Empty two-storey house',
      desc: `Not old, but dusty.
      There is a WINDOW. 
      A DOOR to exit [NORTH].
      Light enters from the window.
      There is a ROCKING CHAIR.
      There is a STAIRS leading up.
      `,
      items: [
        {
          name: ['window'],
          desc: `It is an ordinary window. Closed.`, // Displayed when the player looks at the item.
          onUse: () => println(`Window is stuck, you can't open it.`), // Called when the player uses the item
        },
        {
          name: ['door'],
          desc: `Open.`, // Displayed when the player looks at the item.
          onUse: () => println(`Door is stuck, you can't close it. Kind of like time has stopped here.`), // Called when the player uses the item
        },
        {
          name: ['stair'],
          desc: 'It leads to the second floor.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO UP to go upstairs.`), // Called when the player uses the item.
        },
        {
          name: ['rocking chair'],
          desc: 'It has two bullet marks on it.', // Displayed when the player looks at the item.
          onUse: () => println(`You sit and started rocking.`), // Called when the player uses the item.
          onTake: () => println(`Too heavy to carry.`)
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'northPath-1',
        },
        {
          dir: ['up', 'upstairs'],
          id: 'upStairs',
        }
      ],
    },
    {
      id: 'upStairs',
      name: 'Upstairs',
      desc: `This is the second floor.
      An empty room.
      There are two windows. 
      WEST WINDOW and EAST WINDOW.
      Light enters from those windows.
      `,
      items: [
        {
          name: ['west window', 'west'],
          desc: `Open on west side.
          There is a little piece of PAPER.`, // Displayed when the player looks at the item.
          onUse: () => println(`Stuck! You can't close it.`), // Called when the player uses the item.
          onLook: () => {
            if (noteSeen) {
              // the key is already in the pot or the player's inventory
              return;
            };
            noteSeen = true;
            const upStairs = getRoom('upStairs');

            // put the silver key in the pot
            upStairs.items.push({
              name: 'paper',
              desc: `It seems to be written by a child.`,
              onLook: () => {
                const paper = getItemInInventory('paper') || getItemInRoom('paper', 'upStairs');

                // let's also update the description
                paper.desc = `It reads 
                "Mommy, daddy, grannie I love you! 
                I'm so afraid of soldiers"`;
              },
              isTakeable: true,
              isReadable: true,
              onRead: () => {
                println(`Mommy, daddy, grannie I love you! 
                I'm so afraid of soldiers`);
              },
              onTake: () => {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const windowOnWest = getItemInRoom('west window', 'upStairs');
                windowOnWest.desc = windowOnWest.desc.slice(0, windowOnWest.desc.indexOf('\n'));
              },
            });
          },
          
        },
        {
          name: ['east window', 'east'],
          desc: `Broken on east side.
          It is closed with a WOOD.`, // Displayed when the player looks at the item.
          onUse: () => println(`Window is too small to pass through.`), // Called when the player uses the item.
          onLook: () => {

            if (woodShown) {
              // the key is already in the pot or the player's inventory
              return;
            }
            woodShown = true;
            const secondStairs = getRoom('upStairs');

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
                const windowOnEast = getItemInRoom('east window', 'upStairs');
                windowOnEast.desc = windowOnEast.desc.slice(0, windowOnEast.desc.indexOf('\n'));
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
          id: 'two-Storey',
        }
      ],
    },
    {
      id: 'unempHouse',
      name: 'Unemployed man\'s house',
      desc: `A warm village house of two rooms. 
      There is a sofa, a BASKET, some clothings here and there and a FIREPLACE.
      A DOOR to his bedroom [north].
      He came here last year. Couldn't find a job for so long. 
      Sometimes collects woods from the forest and sells them, like you.`,
      items: [
        {
          name: ['basket'],
          desc: 'Plastic. Filled with clothes. (To check whether he has a coat type USE BASKET)', // Displayed when the player looks at the item.
          
          onUse: () => {
            const basket = getItemInRoom('basket', 'unempHouse');
            if (!coatGiven){
              basket.desc = `You checked it. There are some clothes but no coat. He may feel cold without one.`;
            }else{
              basket.desc = `You checked it. There you see the coat. You feel at ease. He won't feel cold.`
              };
              println(basket.desc)
            },
        },
        {
          name: ['fireplace','fire'],
          desc: 'Extinguished fireplace. He seems to have no wood. Maybe I bring one.', // Displayed when the player looks at the item.
          onUse: () => {
            let wood = getItemInInventory('wood');
            if (!wood){
              return println("You have no wood to fire it.");
            } else {
              const fireplace = getItemInRoom('fireplace', 'unempHouse');
                // let's also update the description
                println('You placed wood near fireplace.')
                fireplace.desc = `Extinguished fireplace. There seems to have enough wood for today. 
                Maybe some good people put them...`;
                const woodIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('wood');
            //name 'wood' olan nesneyi sil
            if (woodIndex > -1){
              disk.inventory.splice(woodIndex, 1);
            };
            woodGivenToUnemp = true;
            }

          },
        },
        {
          name: 'door',
          desc: 'Door to bedroom.', // Displayed when the player looks at the item.
          onUse: () => println('Type GO TO NORTH, to enter try entering the bedroom.')
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'northPath-2',
        },
        {
          dir: ['north','door','bedroom'],
          id: 'unempBed',
        },
      ],
    },
    {
      id: 'unempBed',
      name: 'Bedroom',
      desc: `This is a dark room with no windows. 
      There is a BED on the ground. 
      DOOR leading to exit.`,
      items: [
        {
          name: ['bed'],
          onUse: () => println(`Better sleep in your own bed.`),
        },
        {
          name: 'door',
          desc: 'Door to exit.', // Displayed when the player looks at the item.
          onUse: () => println('Type GO SOUTH, to enter try quitting the bedroom.')
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'unempHouse',
        }
      ],
    },
    {
    id: 'northPath-2',
    name: 'Path',
    desc: `Path to east and west. On south you see the house of Mehmet [butcher].
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
    id: 'butcherHouse', // Unique identifier for this room. Entering a room will set the disk's roomId to this.
    name: 'Butcher\'s [Mehmet] House', // Displayed each time the player enters the room.
    desc: `This is a one room village house like your home. 
    There is a FIREPLACE. 
    Mehmet the butcher lives here. He used to be rich but after invasion most if not all of his cattle has been claimed by the Commander. Now he serves mostly for the Military Base, selling for very cheap.
    There is a door on the NORTH.`, // Displayed when the player first enters the room.
    items: [
      {
        name: 'door',
        desc: 'It leads NORTH.', // Displayed when the player looks at the item.
        onUse: () => println(`Type GO NORTH to try the door.`), // Called when the player uses the item.
      },
      {
        name: 'bed', // The player can refer to this item by either name. The game will use the first name.
        desc: `Near the fireplace. Who sleeps here would feel quite comfortable.`,
        onUse: () => println("Sleeping other people's bed is inappropriate."),
      },
      {
        name: 'fireplace',
        img:`________________________________________
 [________________________________________]
   ||_|_||_|_|_|_|_|_|_|_|_|_|_|_|_|_|_||
   |_|_|_|  |                  |  |_|_|_|
   ||_|_||  |                  |  ||_|_||
   |_|_|_|  |                  |  |_|_|_|
   ||_|_||  |                  |  ||_|_||
   |_|_|_|  |                  |  |_|_|_|
   ||_|_||  |                  |  ||_|_||
   |_|_|_|  |                  |  |_|_|_|
   ||_|_|| /_)_,)___),_)'_)__(_ \\ ||_|_||
_____lc|_|_|/)______)_____)______( \\|_|_|_|_____
""""/______________________________________\\""""
"""[________________________________________]""""
""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""
""""""""""""""""""""""""""""""""""""""""""""""""""""`,
        desc: `It is not burning so it is cold here.`,
        //isTakeable: true, // Allows the player to take the item.
        onUse: () => {
          let wood = getItemInInventory('wood');
          if (!wood){
            println("You have no wood to put.");
            return
          }else{
            println("You had better keep your woods for your child and mom.")
          };
        },
      }
    ],
    exits: [
      {
        dir: 'north', // "dir" can be anything. If it's north, the player will type "go north" to get to the room called "A Forest Clearing".
        id: 'northPath-2',
      },
    ],
  },
  {
      id: 'graveYardEntrance',
      name: 'Graveyard Entrance',
      desc: `It has long walls.
      A WALKWAY to WEST.
      To SOUTH is the GATE to exit.
      There are some GRAVE STONEs here and there.`,
      img:`                 _( )_  ) )'_//\\  \\    _( )_ .     
  _       .      |___|\\/#(.--'_/"\\ \\  /|___|        .     _ 
_( )_            |_|_|\\ ,/        \\ \\//|_|_|            _( )_
|___|/\\/\\/\\/\\/\\/\\|___|      _____  \\  (|___|/\\/\\/\\/\\/\\/\\|___|
|_|_|/\\/\\/\\/\\/\\/\\|_|_|     |R.I.P|  \\  |_|_|/\\/\\/\\/\\/\\/\\|_|_|
|___|/\\/\\/\\/\\/\\/\\|___|     |_____|     |___|/\\/\\/\\/\\/\\/\\|___|
|_|_|/\\/\\/\\/\\/\\/\\|_|_|(  [_________] ~"|_|_|/\\/\\/\\/\\/\\/\\|_|_|
|___|/\\/\\/\\/\\/\\/\\|___|~  ~~"^"^"^"~~   |___|/\\/\\/\\/\\/\\/\\|___|
|_|_|/\\/\\/\\/\\/\\/\\|_|_|     _-      _-  |_|_|/\\/\\/\\/\\/\\/\\|_|_|
|___|/\\/\\/\\/\\/\\/\\|___| _-      _-      |___|/\\/\\/\\/\\/\\/\\|___|
|_lc|/\\/\\/\\/\\/\\/\\|_|_|   _-         _- |_|_|/\\/\\/\\/\\/\\/\\|_|_|
[_____]~~"^""^"~~[_____]         _-    [_____]~~"^""^"~~[_____]
~~"^"~~          ~~"^"~~      _-       ~~"^"~~          ~~"^"~~                           `,
      items: [
        {
          name: 'first grave stone',
          desc: `"Mustafa
          Husband of Fatma
          May he rest in peace.
          Died: 2031"`,
          img: `           _____/       \\\\_____
          |  _     ___   _    ||
          | | \\     |   | \\  ||
          | |  |    |   |  |  ||
          | |_/     |   |_/   ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |      Mustafa      ||
          | Husband of Fatma  ||
          |    Died: 2031     ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
          onLook: () => {
          const firstStone = getItemInRoom('first', 'graveYardEntrance');
          firstStone.name = "Hasan's Grave Stone";           
          }
        },
        {
            name: 'second grave stone',
            desc: `"Hüseyin
            Husband of Aliye
            Died: 2031"`,
            img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |      Hüseyin     ||
          | Husband of Aliye ||
          |    Died: 2031    ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
            onLook: () => {
            const secondStone = getItemInRoom('second', 'graveYardEntrance');
            secondStone.name = "Hüseyin's Grave Stone";           
            },
          },
          {
            name: 'third grave stone',
            desc: `"Aliye
            Wife of Hüseyin
            May she rest in peace.
            Died: 2031"`,
            img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |       Aliye      ||
          |  Wife of Hüseyin ||
          |     Died: 2031   ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
            onLook: () => {
            const thirdStone = getItemInRoom('third', 'graveYardEntrance');
            thirdStone.name = "Aliye's Grave Stone";           
            },
          },
          {
            name: 'fourth grave stone',
            desc: `Not quite readable.`,
            img: `              __.....__
            .'         ':,
           /  __  _  __  \\\\
           | |_)) || |_))||
           | | \\\\ || |   ||
           |             ||   _,
           |             ||.-(_{}
           |             |/    \`
           |        ,_ (\\;|/)
         \\\\|       {}_)-,||\`
         \\\\;/,,;;;;;;;,\\|//,
        .;;;;;;;;;;;;;;;;,
       \\,;;;;;;;;;;;;;;;;,//
      \\\\;;;;;;;;;;;;;;;;,//
     ,\';;;;;;;;;;;;;;;;'
    jgs;;;;;;;;;;;'''\`
`,
            onLook: () => {
            const fourthStone = getItemInRoom('fourth', 'graveYardEntrance');
            fourthStone.name = "Unreadable Grave Stone";           
            },
          },
          
        
      ],
      exits: [
        {
          dir: 'south',
          id: "northPath-3",
        },
        {
          dir: 'north',
          id: 'mountain',
          block: `There is wall at north.`
        },
        {
          dir: 'west',
          id: 'graveWest',
        },
        {
          dir: 'east',
          id: 'mountain',
          block: `There is wall at east.`
        },
      ],
    },
    {
      id: 'graveWest',
      name: 'Graveyard (West Side)',
      desc: `Here is more GRAVE STONEs than entrance.
      This is the end of the graveyard. 
      To North, West and South is graveyard walls.
      A WALKWAY to EAST.`,
      items: [
        {
          name: 'first grave stone',
          desc: `"Metin
          Never married.
          Died when 18.
          May he rest in peace.
          Died: 2031"`,
          img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |                  ||
          |  name goes here  ||
          |                  ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
          onLook: () => {
          const firstStone = getItemInRoom('first', 'graveWest');
          firstStone.name = "Metin's Grave Stone";           
          }
        },
        {
            name: 'second grave stone',
            desc: `"Seda
            Wife of Emin, mother of Ahmet.
            May she rest in peace.
            Died: 2032"
            This is where your beloved wife rests.`,
            img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |                  ||
          |  name goes here  ||
          |                  ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
            onLook: () => {
            const secondStone = getItemInRoom('second', 'graveWest');
            secondStone.name = "Your wife's Grave Stone";           
            },
          },
          {
            name: 'third grave stone',
            desc: `Ömer-Faruk
            Our beloved son. Died during the invasion.
            May he rest in peace.
            Died: 2031`,
            img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |                  ||
          |  name goes here  ||
          |                  ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
            onLook: () => {
            const thirdStone = getItemInRoom('third', 'graveWest');
            thirdStone.name = "Ömer Faruk's Grave Stone";           
            },
          },
          {
            name: 'fourth grave stone',
            desc: `Aleyna
            You will always be loved and missed.
            May you find peace.
            Died: 2032`,
            img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |                  ||
          |  name goes here  ||
          |                  ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
            onLook: () => {
            const fourthStone = getItemInRoom('fourth', 'graveWest');
            fourthStone.name = "Aleyna's Grave Stone";           
            },
          },
          {
            name: 'fifth grave stone (old grave stone)',
            desc: `"Melda
            We miss you mom.
            Died when she was 68.
            May she rest in peace.
            Died: 2023"`,
            img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |                  ||
          |  name goes here  ||
          |                  ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
            onLook: () => {
            const firstStone = getItemInRoom('fifth', 'graveWest');
            firstStone.name = "Melda's Grave Stone";           
            }
          },
          {
              name: 'sixth grave stone',
              desc: `"Grannie Fatma
              Mother of Melisa and Ufuk.
              May she rest in peace.
              Died: 2028"
              This is where mother of Melisa [YOUR WIFE'S BEST FRIEND] rests.`,
              img: `           _____/      \\\\_____
          |  _     ___   _   ||
          | | \\     |   | \\  ||
          | |  |    |   |  | ||
          | |_/     |   |_/  ||
          | | \\     |   |    ||
          | |  \\    |   |    ||
          | |   \\. _|_. | .  ||
          |                  ||
          |  name goes here  ||
          |                  ||
  *       | *   **    * **   |**      **
   \\))ejm97/.,(//,,..,,\\||(,,.,\\\\,.((//
`,
              onLook: () => {
              const secondStone = getItemInRoom('sixth', 'graveWest');
              secondStone.name = "Grannie Fatma's Grave Stone [Mother of your wife's best friend]";           
              },
            },
            {
              name: 'seventh grave stone',
              desc: `Not quite readable.`,
              img: `    __)(
                _____/  //   ___
               /        \\\\  /  \\\\__
               |  _     //  \\     ||
               | | \\    \\\\  / _   ||
               | |  |    \\\\/ | \\  ||
               | |_/     |/  |  | ||
               | | \\     /|  |_/  ||
               | |  \\    \\|  |     >_ )
               | |   \\. _|\\  |    < _|=
               |          /_.| .  \\/
       *       | *   **  / * **  |\\)/)    **
        \\))ejm97/.,(//,,..,,\\||(,wo,\\ ).((//
                                  -  \\)`,
              onLook: () => {
              const thirdStone = getItemInRoom('seventh', 'graveWest');
              thirdStone.name = "Unreadable Grave Stone";           
              },
            },
            
      ],
      exits: [
        {
          dir: 'east',
          id: "graveYardEntrance",
        },
        {
          dir: 'north',
          id: 'mountain',
          block: `There is wall at north.`
        },
        {
          dir: 'west',
          id: 'mountain',
          block: `There is wall at west.`
        },
        {
          dir: 'south',
          id: 'mountain',
          block: `There is wall at south. Behind wall, you see the unemployed man's house.`
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
          id: "carpenterHouse",
        },
        {
          dir: 'north',
          id: 'graveYardEntrance',
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
      id: 'carpenterHouse',
      name: 'Carpenter\'s [Yusuf] House',
      desc: `Mostly wooden.
      A GATE to SOUTH.
      A DOOR to NORTH.
      A TELEVISION on table.
      No window on this house. So it is dark.
      Carpenter has moved here after the invasion. You and village people don't quite like him. He serves the military base.`,
      items: [
        {
            name: ['television', 'tv' ],
            img: `______________
| /~~~~~~~~ ||||
||          |..|
||          |  |
| ________ / O |
~~~~~~~~~~~~~~~ `,
            desc: `         
            An old TV. State provides them to legal sellers. Nowadays no one has television except a lucky minority.`, // Displayed when the player looks at the item.
            onUse: () => {
              
              if(tvOpen1){
                println('You turned off the television');
                tvOpen1 = false;
                return;
              };
              tvOpen1 = true;
              return println("You turned on the TV. Channel 1. This is the only channel since two years. Full of government propaganda.");
            },          
        },
        {
          name: ['gate', 'south'],
          desc: `A doorless gate to another room.`, // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH.`), // Called when the player uses the item.
          onLook: () => println(`You see the bedroom through the gate. It leads to bedroom.`)

        },
        {
          name: ['door','north'],
          desc: 'It leads to exit.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to exit.`), // Called when the player uses the item.
        },
        {
          name: ['table'],
          desc: 'Looks very stylish. Probably the carpenter carved it for himself.', // Displayed when the player looks at the item.
          onUse: () => println(`There is Television on it. Also you can't use it.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'northPath-3',
        },
        {
          dir: 'south',
          id: 'carpenterBedroom',
        },
      ],
    },
    {
      id: 'carpenterBedroom',
      name: 'Carpenter Yusuf\'s Bedroom',
      desc: `This is a dark room with no windows. Good for sleeping.
      There is a BED and a coffee table. 
      GATE leading to house entrance room.`,
      items: [
        {
          name: ['bed'],
          onUse: () => println(`Better sleep in your own bed.`),
        },
        {
          name: ['coffee table'],
          onUse: () => println('You don\'t have coffee to put on it.') 
        },
        {
          name: 'gate',
          desc: 'Gate to entrance.', // Displayed when the player looks at the item.
          onUse: () => println('Type GO NORTH, to return the entrance.')
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'carpenterHouse',
        }
      ],
    },
    {
      id: 'park',
      name: 'Park',
      desc: `To SOUTH is carpentry.
      To EAST is woods.
      On WEST is a path.
      There is a BENCH.`,
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
          block: 'Entrance is on the east side.'
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
            woodGiven = true;
          } else if (room.id === 'unempHouse') {
            //name 'wood' olan nesnenin indeksini al
            const woodIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('Wood');
            //name 'wood' olan nesneyi sil
            if (woodIndex > -1){
              disk.inventory.splice(woodIndex, 1);
            };
            println(`You put the wood near fireplace. Hope he will keep warm.`);
            woodGivenToUnemp = true;
          }else {
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
                  woodGiven = true;
                  if(foodGiven){
                    questEnd('bring wood & food to home')
                  }
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
      id: 'gardenHouse',
      name: 'Garden House',
      img:`
      
                                   _______________________      |
                                  |  ________   ________  |     |
                                  | |        | |    ___ | |     |
                                  | |        | |  ,',.('| |     |
                                  | |        | | :  .'  | |     |
                                  | |        | | :) _  (| |     |
                                  | |        | |  \`:_)_,| |     |
                                  | |________| |________| |     |
                                  |  ________   ________  |     |
                                  | |        | |        | |     |
                                  | |        | |        | |     |
                                  | |        | |        | |     |
                                  | |        | |        | |     |
                                  | |        | |        | |     |
                                  | |________| |________| |     |
                                  |_______________________|     |
                                                                |
                                                                |
                   _____________________________________________|
                                                                \`.
                                                                  \`.
                                                                    \`.
                                                                      \`.
                     ..::::::::::::' .:::::::::::::::                   \`.
                 ..:::::::::::::::' .:::::::::::::::'                     \`
             ..:::::::::::::::::' .:::::::::::::::::
         ..::::::::::::::::::::' .:::::::::::::::::'
     ..::::::::::::::::::::::' .:::::::::::::::::::
 ..:::::::::::::::::::::::::' .:::::::::::::::::::'
..........................  ......................
:::::::::::::::::::::::::' .:::::::::::::::::::::'
:::::::::::::::::::::::' .:::::::::::::::::::::::
::::::::::::::::::::::' .:::::::::::::::::::::::'
::::::::::::::::::::' .:::::::::::::::::::::::::
:::::::::::::::::::' .:::::::::::::::::::::::::'                   SSt/JaWa`,
      desc: `Abandoned.
      It has two WINDOWS facing the garden [NORTH].
      One WINDOW facing [WEST].
      One DOOR [NORTH].
      So dusty.`,
      items: [
        {
          name: ['windows'],
          desc: 'You see the garden with green grass.', // Displayed when the player looks at the item.
          onUse: () => {println("You closed it")},
          onTake: () => {
            println(`Looks hard to break and take.`);
            // update the monstera's description, removing everything starting at the line break
          },
           // Called when the player uses the item.
        },
        {
          name: ['window'],
          desc: 'You see the garden with green grass.', // Displayed when the player looks at the item.
          onUse: () => {println("You closed it")},
          onTake: () => {
            println(`Looks hard to break and take.`);
            // update the monstera's description, removing everything starting at the line break
          },
           // Called when the player uses the item.
        },
        {
          name: 'door',
          img: ` ______________
|\\ ___________ /|
| |  /|,| |   | |
| | |,x,| |   | |
| | |,x,' |   | |
| | |,x   ,   | |
| | |/    |%==| |
| |    /] ,   | |
| |   [/ ()   | |
| |       |   | |
| |       |   | |
| |       |   | |
| |      ,'   | |
| |   ,'      | |
|_|,'_________|_| ejm`,
          desc: 'Open. You see the garden with green grass.', // Displayed when the player looks at the item.
          onUse: () => {
            const door = getItemInRoom('door', 'gardenHouse');
            if(!doorClosed){
            println("You closed it. Type GO NORTH to exit.")
            doorClosed = true
            door.desc = 'Closed.'
            door.img = ` 
 ______________
|\\ ___________ /|
| |  _ _ _ _  | |
| | | | | | | | |
| | |-+-+-+-| | |
| | |-+-+=+%| | |
| | |_|_|_|_| | |
| |    ___    | |
| |   [___] ()| |
| |         ||| |
| |         ()| |
| |           | |
| |           | |
| |           | |
|_|___________|_|  ejm` 
          } else {
            println("You opened it. Type GO NORTH to exit.")
            doorClosed = false
            door.desc = 'Open. You see the garden with green grass.'
            door.img = `______________
|\\ ___________ /|
| |  /|,| |   | |
| | |,x,| |   | |
| | |,x,' |   | |
| | |,x   ,   | |
| | |/    |%==| |
| |    /] ,   | |
| |   [/ ()   | |
| |       |   | |
| |       |   | |
| |       |   | |
| |      ,'   | |
| |   ,'      | |
|_|,'_________|_| ejm`;
              }
              return
            },
         
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'garden',
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
          desc: 'Mildly rotten eggplant. Still edible.', // Displayed when the player looks at the item.
          onUse: () => {const room = getRoom(disk.roomId);
          if (room.id === 'bizimEv') {
            //name 'wood' olan nesnenin indeksini al
            const foodIndex = disk.inventory.map(function(e) {return e.name[0];}).indexOf('Rotten vegetable');
            //name 'wood' olan nesneyi sil
            if (foodIndex > -1){
              disk.inventory.splice(foodIndex, 1);
            };
            println(`You gave the eggplant to mom.`);
            foodGiven = true;
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
          id: 'carpentry',
        },
        {
          dir: 'east',
          id: 'mountain',
          block: "You can't climb mountain."
        },
      ],
    },
    {
      id: 'carpentry',
      name: 'Carpentry workshop',
      desc: `There is a WORKBENCH.
      A WINDOW on [SOUTH]. 
      There are some WOODs here and there.
      Entrance on [EAST].`,
      items: [
        {
          name: 'workbench',
          desc: 'Big and fit for timbers.', // Displayed when the player looks at the item.
          onUse: () => println('You don\'t know how to use the bench.')
        },
        {
          name: ['Window'],
          desc: 'Little and rectangular, facing south.', // Displayed when the player looks at the item.
          onUse: () => println('You see the village path.')
        },
        {
          name: 'wood',
          desc: 'Semi product wood.', // Displayed when the player looks at the item.
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
                  woodGiven = true;
                } else {
                println(`You can't use wood here.`);
                // this item can only be used once
                  }
            },
            desc: `It's a wood from carpentry workshop.`,
            onLook: () => {
              const wood = getItemInInventory('wood') || getItemInRoom('wood');

              // let's also update the description
              wood.desc = `It will be enough for today if burned on fireplace.`;
            },
            isTakeable: true,
            onTake: () => {
              println(`You took the wood.`);
            }
           // Called when the player uses the item.
        },{
          name: 'wood',
          desc: 'Semi product wood.', // Displayed when the player looks at the item.
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
                  woodGiven = true;
                } else {
                println(`You can't use wood here.`);
                // this item can only be used once
                  }
            },
            desc: `It's a wood from carpentry workshop.`,
            onLook: () => {
              const wood = getItemInInventory('wood') || getItemInRoom('wood');

              // let's also update the description
              wood.desc = `It will be enough for today if burned on fireplace.`;
            },
            isTakeable: true,
            onTake: () => {
              println(`You took the wood.`);
            }
           // Called when the player uses the item.
        },{
          name: 'wood',
          desc: 'Semi product wood.', // Displayed when the player looks at the item.
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
                  woodGiven = true;
                } else {
                println(`You can't use wood here.`);
                // this item can only be used once
                  }
            },
            desc: `It's a wood from carpentry workshop.`,
            onLook: () => {
              const wood = getItemInInventory('wood') || getItemInRoom('wood');

              // let's also update the description
              wood.desc = `It will be enough for today if burned on fireplace.`;
            },
            isTakeable: true,
            onTake: () => {
              println(`You took the wood.`);
            }
           // Called when the player uses the item.
        },{
          name: 'wood',
          desc: 'Semi product wood.', // Displayed when the player looks at the item.
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
                  woodGiven = true;
                } else {
                println(`You can't use wood here.`);
                // this item can only be used once
                  }
            },
            desc: `It's a wood from carpentry workshop.`,
            onLook: () => {
              const wood = getItemInInventory('wood') || getItemInRoom('wood');

              // let's also update the description
              wood.desc = `It will be enough for today if burned on fireplace.`;
            },
            isTakeable: true,
            onTake: () => {
              println(`You took the wood.`);
            }
           // Called when the player uses the item.
        },{
          name: 'wood',
          desc: 'Semi product wood.', // Displayed when the player looks at the item.
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
                  woodGiven = true;
                } else {
                println(`You can't use wood here.`);
                // this item can only be used once
                  }
            },
            desc: `It's a wood from carpentry workshop.`,
            onLook: () => {
              const wood = getItemInInventory('wood') || getItemInRoom('wood');

              // let's also update the description
              wood.desc = `It will be enough for today if burned on fireplace.`;
            },
            isTakeable: true,
            onTake: () => {
              println(`You took the wood.`);
            }
           // Called when the player uses the item.
        },

      ],
      exits: [
        {
          dir: 'east',
          id: 'marketPlace',
        }
      ],
    },
    {
      id: 'road',
      name: 'Road to city',
      desc: `It's asphalt. On EAST direction. 
      To WEST is path to village.
      Mountain on [NORTH] and [SOUTH].
      SOLDIER in front of you.`,
      img: `@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@@@@@@@@@@@@@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@*   #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  %@@@@@@@@@@@@@@  ,  @@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@* ,@@@@@@@@@@@@@@@@#    @@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@     @@.@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@  @@@@@@@@   @  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@( / #@@  @@@@@     .@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@   &*%(/@@@@@@@@@@@@@*  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@  *    @ @@@@@@@@@@@, @@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@   @/, @@@@@@@@@@@@@ #  #  & %@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@ . @@@@@@@@@@@@@*       ,     @@  @@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@#@@@#  @@@.  @(@@@@@@@@@@@@ @#@        %@ &*  @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@/     @@@@@@@@@@@@@  @ @@@@@@@/@@  @@  @@@@@@% @@   @@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@ .@@@@@@@@@@@@@@@@@@@@@@@@@@/@@@@@@@@@@@@@@ &@/@@@@.   @@@@@@@@@@@
@@@@@@@@@@@*,  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@/&.@@ * @@@@@@@@@@
@@@@@@@@@@@ . @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@% @@@@@@@ @ @ @@@@@@@@@@
@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%  @@@@@@@@@#(  @@@@@@@@@
@@@@@@@@@  @ @@@@@@@@@@@@@@@@@@@.&@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@    @@@@@@@@
@@@@@@@    , @@@@@@@@@@@@@@@@@@@@@@@*& @@@@@@@@@@@@@@@@  /@@@@@@@@@@@ .((@@@@@@@
@@@@( @@( # @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@ * @@@@@@@@@@@ .@ @@@@@@@
@@@@@@@@@@@@ ( @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@ * @@@@@@@@@@@  @  @@@@@@
@@@.@   * @@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@*, @@@@@ &@@@@@@@@@@@@@ @ @@@@@@
@@       @@@@@@@@@@ /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @  &@@@@@@@@@@@@@@/ @@@@@@
@@     @@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @   @@ *@@@@@@@@  @@@@@
@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,.@  @ @@@@@@@ % @@@@
@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ #@@@@@@@@@@@    . @@@@@  ,*@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ *@@@@@@@@@@&%  @@@@@% @@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@( @@@@@@@. @  @(%@@@
@@@@@@@@@@@@@@@@@@@@@* ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@ %., @@@@`,
      exits: [
        {
          dir: 'south',
          id: 'mountainY5',
          block: 'You can\'t climb it.'
        },
        {
          dir: 'north',
          id: 'mountainY4',
          block: 'You can\'t climb it.'
        },
        {
          dir: 'west',
          id: 'path-2',
        },
        {
          dir: 'east',
          id: 'roadToCity',
          block: '"STOP!" says the soldier.'
        },
      ],
    },
    {
      id: 'path-2',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      To EAST you see the road to city and a patrolling soldier.
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
          id: 'road',
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
          img:`
                 .--._.-""-;
       _.---\`\`\`\`\`\`---\/    '.   _.\`.
    .-'  _,'\`\`\`'-...'   _ .-'.'    '-.
    '   .'        '. . '      '.      \`'.
   ' .\`'        _. '\`'-.         '.   . ''-._
    '.     .'          '.  . ' ' '.\`       '._
     '. .'     .::""-: .''.        ' .   . ': ""-.
  '    ..' .        '.        . '.               "-.
  : . .'      '.                   '                "-.
 ;  .:             .'              '.   
   : '.       . .'                  '._        
 ;__:   '.   .' _.:---""---.._'_.:---""---.._'_.:------.._'                           
   \\     '. :                             
    '.     '.-._                           
      '.    :                              
        '.  :                              
          '-:                              
            '._  
              ||:___|'-.-'-.-'-.-'-.-'-.-'-.--'-.-'-.--'-.-_|`,
          onUse: () => println(`Better sleep in your own bed.`),
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
      One side of the path [NORTH], is the CARPENTRY WORKSHOP.
      Other side of the path [SOUTH] is the HOUSE OF MUHTAR`,
      items: [
        {
          name: ['carpenter\'s workshop','carpentry', 'carpentry workshop'],
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
          block: 'Entrance is on the east side.',
        },
        {
          dir: 'west',
          id: 'path',
        },
        {
          dir: 'east',
          id: 'path-2',
        },
      ],
    },
    {
      id: 'bizimEv', // Unique identifier for this room. Entering a room will set the disk's roomId to this.
       // Displayed each time the player enters the room.
      // Displayed when the player first enters the room.
      onEnter: () => {
        const room = getRoom('bizimEv');

        if (room.visits === 1) {
          println(`       _ _ _                  
      (_) | |                 
__   ___| | | __ _  __ _  ___ 
\\ \\ / / | | |/ _\` |/ _\` |/ _ \\
 \\ V /| | | | (_| | (_| |  __/
  \\_/ |_|_|_|\\__,_|\\__, |\\___|
                    __/ |     
                   |___/      
                   ~         ~~          __
                   _T      .,,.    ~--~ ^^
             ^^   // \\                    ~
                  ][O]    ^^      ,-~ ~
               /''-I_I         _II____
            __/_  /   \\ ______/ ''   /'\\_,__
              | II--'''' \\,--:--..,_/,.-{ },
            ; '/__\\,.--';|   |[] .-.| O{ _ }
            :' |  | []  -|   ''--:.;[,.'\\,/
            '  |[]|,.--'' '',   ''-,.    |
              ..    ..-''    ;       ''. ' 
                          A game by Memmynn`, 'img');
          room.name = 'Home'
          room.desc = `This is a one room village house. 
          You hear the crackling of the FIREPLACE. 
          You live with your MOTHER and your SON here. 
          There is a door on the NORTH. 
          Type ITEMS to see what is here.`;
          println(room.name)
          println(room.desc)
        }
      },
      items: [
        {
          name: 'door',
          desc: 'It leads NORTH.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to try the door.`), // Called when the player uses the item.
        },
        {
          name: 'bed', // The player can refer to this item by either name. The game will use the first name.
          desc: `There is a bed next the wall. You sleep there.`,
          onUse: () => {if(woodGiven && foodGiven){
            println("Now your home is warm and your son is full. You can go to sleep.");
            return
          }
          println(`You are not feeling sleepy now.`)
          }
        },
        {
          name: 'fireplace',
          img:`    ________________________________________
   [________________________________________]
     ||_|_||_|_|_|_|_|_|_|_|_|_|_|_|_|_|_||
     |_|_|_|  |                  |  |_|_|_|
     ||_|_||  |                  |  ||_|_||
     |_|_|_|  |                  |  |_|_|_|
     ||_|_||  |                  |  ||_|_||
     |_|_|_|  |                  |  |_|_|_|
     ||_|_||  |                  |  ||_|_||
     |_|_|_|  |                  |  |_|_|_|
     ||_|_|| /_)_,)___),_)'_)__(_ \\ ||_|_||
_____lc|_|_|/)______)_____)______( \\|_|_|_|_____
""""/______________________________________\\""""
"""[________________________________________]""""
""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""
""""""""""""""""""""""""""""""""""""""""""""""""""""`,
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
          block: `Your mom says: "Where do you go son?"
          She has things to TALK before you leave.`
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
          id: 'ayşeHouse',
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
      id: 'ayşeHouse',
      name: `Ayşe's House`,
      desc: `It is bigger compared to many village houses.
      There is a SOFA.
      In front of sofa is a TABLE.
      A door on [NORTH] to exit.
      A big window facing the path [NORTH].
      `,
      items: [
        {
          name: 'door',
          desc: 'Leads to exit.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH to try exit.`), // Called when the player uses the item.
        },
        {
          name: 'window',
          onUse: () => println(`Stuck. You can't open it.`), // Called when the player uses the item.
        },
        {
          name: 'sofa',
          desc: 'It is a wooden sofa.', // Displayed when the player looks at the item.
          onUse: () => println(`You sit on it.`), // Called when the player uses the item.
        },
        {
          name: 'table',
          desc: `Used for preparing meatballs. Ayşe is the owner of the Meatball Diner.

          There is SOMETHING on the table`, // Displayed when the player looks at the item.
          onLook: () => {
            if (kofteSeen || kofteTaken) {
              // the key is already in the pot or the player's inventory
              return;
            }
            kofteSeen = true;
            const ayşeHouse = getRoom('ayşeHouse');
            // put the silver key in the pot
            ayşeHouse.items.push({
              name: 'something',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  println(`"Mom" you said. "Look what I bought for you"
                  "Oh that is great." she smiles like she missed meat a century.`)
                  foodGiven = true;
                  let isimler = ['meatballs', 'something']
                  for (let obj = 0; obj < disk.inventory.length; obj++){
                    for (let isim = 0; isim < isimler.length; isim++ ){
                      if (isimler[isim] === disk.inventory[obj].name){
                        disk.inventory.splice(obj, 1)
                      }
                    }
                  }
                } else {
                  println(`I won't eat them alone.`);
                  // remove the block
                }
              },
              desc: `It's raw meatballs!`,
              onLook: () => {
                const meatballs = getItemInInventory('something') || getItemInRoom('something', 'ayşeHouse');
                meatballs.name = "meatballs";

                // let's also update the description
                meatballs.desc = `Looks tasty. Mom and son will enjoy it.`;

                const table = getItemInRoom('table', 'ayşeHouse')
                table.desc = table.desc.replace('SOMETHING', 'MEATBALLS');
                // remove this method (we don't need it anymore)
                delete meatballs.onLook;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                kofteTaken = true
                // update the monstera's description, removing everything starting at the line break
                const table = getItemInRoom('table', 'ayşeHouse')
                table.desc = table.desc.slice(0, table.desc.indexOf('\n'));
              },
            });
          },
        },
        
      ],
      exits: [
        {
          dir: 'north',
          id: 'path1',
        },
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
                  woodGiven = true;
                  if(foodGiven){
                    questEnd('bring wood & food to home')
                  }
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
                  woodGiven = true;
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
      id: 'grocerHouse',
      name: 'Grocer\'s House',
      desc: `Mostly wooden.
      A GATE to NORTH.
      A DOOR to SOUTH.
      A TELEVISION on a CHEST.
      You and Zafer, the owner of this house used to play together near the forest when you were children.
      No window on this house. So it is dark.`,
      items: [
        {
          name: ['television', 'tv'],
          desc: `Placed on a chest.`, // Displayed when the player looks at the item.
          onUse: () => println(`Doesn't turn on. Maybe broken.`), // Called when the player uses the item.          
        },
        {
          name: ['gate', 'north'],
          desc: `A doorless gate to another room.`, // Displayed when the player looks at the item.
          onUse: () => println(`Type GO NORTH.`), // Called when the player uses the item.
          onLook: () => println(`You see kitchen bench through the gate. It leads to kitchen.`)

        },
        {
          name: ['door','south'],
          desc: 'It leads to exit.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH to exit.`), // Called when the player uses the item.
        },
        {
          name: ['chest'],
          desc: 'Looks old like most of the things in this village.', // Displayed when the player looks at the item.
          onUse: () => println(`There is Television on it. First you will have to lift the tv to open the chest.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'path2',
        },
        {
          dir: 'north',
          id: 'kitchen',
        },
      ],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      desc: `
      There is a bench and sink.
      On bench are some STUFF and FOOD.`,
      items: [
        {
          name: ['stuff'],
          desc: `Some unnecessary stuff.
          
          There is a FORK`,
          onLook: () => {
            if(forkSeen){
              return
            };
            forkSeen = true;
            const kitchen = getRoom('kitchen');
            kitchen.items.push({
              name: 'fork',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  //name 'wood' olan nesnenin indeksini al
                  const forkIndex = disk.inventory.map(function(e) {return e.name;}).indexOf('fork');
                  //name 'wood' olan nesneyi sil
                  if (forkIndex > -1){
                    disk.inventory.splice(forkIndex, 1);
                  };
                  println(`You gave the fork.`);
                  forkGiven = true;
                } else {
                  println(`You can't use fork here.`);
                  // this item can only be used once
                };
              },
              desc: `Stolen fork.`,
              onLook: () => {
                const fork = getItemInInventory('fork') || getItemInRoom('fork', 'kitchen');

                // let's also update the description
                fork.desc = `My mom will like this.`;
              },
              isTakeable: true,
              onTake: () => {
                println(`You stole it.`);
                const stuff = getItemInRoom('stuff', 'kitchen')
                stuff.desc.slice(0, stuff.desc.indexOf('\n'))
              },
            })
          }
        },
        {
          name: 'food',
              onUse: () => {
                const room = getRoom(disk.roomId);
                if (room.id === 'bizimEv') {
                  println(`"Mom" you said. "Look what I bought for you"
                  "Oh that is great." she smiles like she missed meat a century.`)
                  foodGiven = true;
                  let isimler = ['food', 'grilled chops']
                  for (let obj = 0; obj < disk.inventory.length; obj++){
                    for (let isim = 0; isim < isimler.length; isim++ ){
                      if (isimler[isim] === disk.inventory[obj].name){
                        disk.inventory.splice(obj, 1)
                      }
                    }
                  }
                } else {
                  println(`I won't eat them without my son.`);
                  // remove the block
                }
              },
              desc: `It's grilled chops!`,
              onLook: () => {
                const chops = getItemInInventory('food') || getItemInRoom('food', 'kitchen');
                chops.name = "grilled chops";

                // let's also update the description
                chops.desc = `Looks and smells so delicious.`;
                delete chops.onLook;
              },
              isTakeable: true,
              onTake: () => {
                println(`You took it.`);
                const kitchen = getRoom('kitchen')
                kitchen.desc = 'There is a bench and sink. On bench are some STUFF';
              }
        },
        {
          name: ['gate'],
          desc: 'Gate to sitting room.', // Displayed when the player looks at the item.
          onUse: () => println(`Type GO SOUTH to get to the sitting room.`), // Called when the player uses the item.
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'grocerHouse',
        }
      ],
    },
    {
      id: 'path2',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      [NORTH] of the path is grocer's house [ZAFER].
      Other side of the path [SOUTH] is the lone old lady's house`,
      
      exits: [
        {
          dir: 'south',
          id: 'oldLadyHouse',
        },
        {
          dir: 'north',
          id: 'grocerHouse',
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
      id: 'oldLadyHouse',
      name: `Old Lady's House`,
      desc: `[NORTH] Door leading to path.
      Little WINDOW facing [EAST].
      A BED and a TABLE.`,
      
      items:[
          {
            name: ['window'],
            desc: 'You can see Ayşe\'s house.', // Displayed when the player looks at the item.
          },
          {
            name: ['table'],
            desc: 'Given by the Commander as a gift for her helps during invasion.', // Displayed when the player looks at the item.
          },
          {
            name: ['door'],
            desc: `Old door.
            
            It has some RUNES on it.`, // Displayed when the player looks at the item.
            onUse: () => {
              println(`Type GO NORTH to exit.`);
            },
          },
          {
            name: ['bed'],
            onUse: () => {
              println(`Better sleep in your bed.`);
            },
          },
      ],
      exits: [
        {
          dir: 'north',
          id: 'path2',
        },
      ],
    },
    {
      id: 'path3',
      name: 'Path',
      desc: `It's the village path. On WEST and EAST direction. 
      [NORTH] of the path is grocery.
      Other side of the path [SOUTH] is Melisa's house`,
      exits: [
        {
          dir: 'south',
          id: 'melisaHouse',
        },
        {
          dir: 'north',
          id: 'grocery',
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
      id: 'melisaHouse',
      onEnter: () => {
        const melisa = getCharacter("Melisa", getCharactersInRoom(disk.roomId)) !== undefined
        if (!melisa) {
          // Look at a character.
          return
        } 
        println(`Melisa is here.`)
      },
      name: 'Melisa\'s house',
      desc : `A tiny sweet house. 
      She was your wife's best friend when she was alive.
      It has a DOOR to NORTH.
      One WINDOW facing west.
      A SOFA and a COFFEE TABLE.
      On coffee table a PHOTO.
      `,
      items:[
        {
          name: ['door'],
          desc: 'Leads to exit.', // Displayed when the player looks at the item.
          onUse: () => println('Type GO NORTH to exit the house.')
        },
        {
          name: ['window'],
          desc: `Faces west.`, // Displayed when the player looks at the item.
          onLook: () => {println('You can see the entrance to village through window.')
            }
        },
        {
          name: ['sofa'],
          desc: `Comfortable. Your wife and Melisa used to sit and gossip.`, // Displayed when the player looks at the item.
          onUse: () => {
            println(`You sit on it.`);
          },
        },
        {
          name: ['coffee table'],
          desc: `From Syria with ornoments. 
          
          There is a PHOTO on it`,
          onUse: () => {
            println(`You have nothing to put on the table.`);
          },
        },
        {
          name: ['photo'],
          desc: `You and your wife with Melisa. All you smile. Your wife carries your baby.`,
          onUse: () => {
            println(`You looked at the photo for a little bit.`);
          },
          isTakeable: true,
          onTake: () => {
            const table = getItemInRoom('coffee table', 'melisaHouse')
            table.desc = table.desc.slice(0, table.desc.indexOf('\n'));
            println('You took the nice photo of yours.')
          },
          onLook: () => {
            const photo = getItemInInventory('photo') || getItemInRoom('photo', 'melisaHouse');
            photo.name = "your happy photo";

            // let's also update the description
            photo.desc = `It was an awesome moment. If only you could know what would happen next year.`;
            delete photo.onLook;
          },
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'path3',
        },
      ],
    },
    {      
      id: 'grocery',
      onEnter: () => {
        const zafer = getCharacter("Zafer", getCharactersInRoom(disk.roomId)) !== undefined
        if (!zafer) {
          // Look at a character.
          return
        } 
        println(`Zafer sits behind the desk.`)
      },
      name: 'Grocery',
      desc : `Zafer's grocery. 
      It has one door to SOUTH.
      Another door to WEST.
      There is a DESK, and behind the desk there is a SHELF.`,
      items:[
        {
          name: ['desk'],
          desc: 'It has a bullet mark on it.', // Displayed when the player looks at the item.
        },
        {
          name: ['shelf'],
          desc: `It has very few stuff on it.`, // Displayed when the player looks at the item.
          onLook: () => {
          const room = getRoom(disk.roomId);
          const items = (room.items || []).filter(item => item.isTakeable); //odadaki takeable itemler
        
          if (!items.length) {
            println(`There's nothing to take.`);
            return;
            }
          }
        },
        {
          name: ['south door'],
          desc: `Old door with bullet marks on it.`, // Displayed when the player looks at the item.
          onUse: () => {
            println(`Type GO SOUTH to exit.`);
          },
        },
        {
          name: ['west door'],
          onUse: () => {
            println(`Type GO WEST to exit.`);
          },
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'path3',
        },
        {
          dir: 'west',
          id: 'southPath',
        },
      ],
    },
    {
      id: 'southPath',
      name: 'Path',
      desc: `It's the village path. On EAST, NORTH and SOUTH direction. 
      On west is the BAKERY. On NORTHEAST is the GROCERY.`,
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
        {
          dir: 'northeast',
          id: 'grocery',
        },
      ],
    },
    {
      id: 'bakery',
      onEnter: () => {
        const fatma = getCharacter("Fatma", getCharactersInRoom(disk.roomId)) !== undefined
        if (!fatma) {
          // Look at a character.
          return
        } 
        println(`Fatma stands behind the desk.`)
      },
      name: 'Bakery',
      desc: `It is hot inside.
      It smells fresh bakery and bread.
      You can see the stone OVEN behind.
      There is a DESK.
      There is a SHELF for bread and bakery.
      It has a DOOR to EAST`,
      items:[
        {
          name: ['oven', 'stone oven'],
          desc: 'There you can see some burning woods.', // Displayed when the player looks at the item.
        },
        {
          name: ['desk'],
          desc: 'It is ashy and floury.', // Displayed when the player looks at the item.
        },
        {
          name: ['shelf'],
          desc: `It has few stuff on it.`, // Displayed when the player looks at the item.
          onLook: () => {
          const room = getRoom(disk.roomId);
          const items = (room.items || []).filter(item => item.isTakeable); //odadaki takeable itemler
        
          if (!items.length) {
            println(`There's nothing to take.`);
            return;
            }
          }
        },
        {
          name: ['door', 'east door', 'door to east'],
          desc: `Open door with bullet marks on it.`, // Displayed when the player looks at the item.
          onUse: () => {
              const door = getItemInRoom('door', 'bakery');
              if(!doorClosed1){
              println("You closed it. Type GO EAST to exit.")
              doorClosed1 = true
              door.desc = 'Closed.'
              door.img = ` 
   ______________
  |\\ ___________ /|
  | |  _ _ _ _  | |
  | | | | | | | | |
  | | |-+-+-+-| | |
  | | |-+-+=+%| | |
  | | |_|_|_|_| | |
  | |    ___    | |
  | |   [___] ()| |
  | |         ||| |
  | |         ()| |
  | |           | |
  | |           | |
  | |           | |
  |_|___________|_|  ejm` 
            } else {
              println("You opened it. Type GO EAST to exit.")
              doorClosed1 = false
              door.desc = 'Open. You see the path.'
              door.img = `______________
  |\\ ___________ /|
  | |  /|,| |   | |
  | | |,x,| |   | |
  | | |,x,' |   | |
  | | |,x   ,   | |
  | | |/    |%==| |
  | |    /] ,   | |
  | |   [/ ()   | |
  | |       |   | |
  | |       |   | |
  | |       |   | |
  | |      ,'   | |
  | |   ,'      | |
  |_|,'_________|_| ejm`;
                }
                return
              },
            
          },
      ],
      exits: [
        {
          dir: 'east',
          id: 'southPath',
        },
      ],
    },
    {
      id: 'southPath-1',
      name: 'Village entrance',
      desc: `It's the village entrance path. On NORTH and SOUTH direction. 
      Village to [NORTH].
      To [SOUTH] is forest`,
      exits: [
        {
          dir: 'south',
          id: 'forestEntrance',
        },
        {
          dir: 'north',
          id: 'southPath',
        },
        {
          dir: 'west',
          id: 'rocks',
          block: `There is a big rock, you can't climb that.`
        },
        {
          dir: 'east',
          id: 'melisaHouse',
          block: `Melisa's house. You see a window on house's wall. But you can't enter from here.`
        },
      ],
    },
  ],
  characters: [
    {
      name: 'Cumhur',
      roomId: 'teaHouse',
      desc: `She looks old and tired. 
      You know she is tired especially since last year after the accident.`, // printed when the player looks at the character
      // optional callback, run when the player talks to this character
      onTalk: () => println(`"Bring some food and wood sonnie."`),
      // things the player can discuss with the character
      topics: [
        
      ],
    },
    {
      name: 'Ayşe',
      roomId: 'meatballDiner',
      desc: `She looks old and tired. 
      You know she is tired especially since last year after the accident.`, // printed when the player looks at the character
      // optional callback, run when the player talks to this character
      onTalk: () => println(`"Bring some food and wood sonnie."`),
      // things the player can discuss with the character
      topics: [
        
      ],
    },
    {
      name: 'Fatma',
      roomId: 'bakery',
      desc: `She is a chubby and lovely lady in thirties.`, // printed when the player looks at the character
      // optional callback, run when the player talks to this character
      onTalk: () => println(`"Hi there!" she says.`),
      // things the player can discuss with the character
      topics: [
        {
          option: `**HELLO**.`,
          onSelected() {
            println(`Hello Fatma.`)
            },
            line: `How can I help you Emin?`,
          removeOnRead: true,
        },
        {
          option: `Tell me about **MILITARY BASE**`,
          line: `It was the school building once. I dislike the soldiers.`,
          prereqs: ['hello'],
          removeOnRead: true,
        },
        {
          option: `Tell me about **INVASION**`,
          line: `I provided food to village people during the invasion...`,
          prereqs: ['hello'],
          removeOnRead: true,
        },
        {
          option: `Let's talk about **COMMANDER**`,
          line: `He is a tyrant.`,
          prereqs: ['hello'],
          removeOnRead: true
        },
        {
          option: `What happened during the **ACCIDENT**`,
          line: `A soldier slapped your child in the face. Your wife shouted at the soldier.`,
          prereqs: ['hello'],
          removeOnRead: true
        },
        {
          option: `Let's talk about **FOREST**`,
          line: `You can find something there to sell maybe.
          I will give you one bread for a wood. `,
          prereqs: ['hello']
        },
        {
          option: `How are your **SALES**?`,
          line: `Fine, fine. I sell bread to the military base for higher prices...`,
          prereqs: ['hello'],
          removeOnRead: true,
        },
        {
          option: `Who is the **UNEMPLOYED** man?`,
          line: `He is a lost soul. Experienced a bad event like most of us. I give him bread for free.`,
          prereqs: ['hello'],
          removeOnRead: true,
        },
        {
          option: `How can I **HELP** him?`,
          line: `He needs to feel warm. You can bring him a coat and some woods`,
          prereqs: ['hello', 'unemployed'],
          removeOnRead: true,
        },           
      ],
    },
    {
      name: 'Zafer',
      desc: [`Short, in his fourties.`],
      roomId: 'grocery',      
      topics: [
        {
          option: `**HELLO**.`,
          onSelected() {
            println(`Hello Zafer.`)
            },
            line: `Oh hi...`,
          removeOnRead: true,
        },
        {
          option: `Tell me about **INVASION**`,
          line: `All my family died during the first attack...`,
          prereqs: ['hello'],
          removeOnRead: true,
        },
        {
          option: `Let's talk about **COMMANDER**`,
          line: `He is a very good guy. Better not to talk about him in public.`,
          prereqs: ['hello'],
          removeOnRead: true
        },
        {
          option: `What happened during the **ACCIDENT**`,
          line: `Your wife shouted at a soldier.`,
          prereqs: ['hello'],
          removeOnRead: true
        },
        {
          option: `Let's talk about **FOREST**`,
          line: `You can find some berries and woods in the forest.
          I will give you two bread for a handful of berries and one bread for two woods. `,
          prereqs: ['hello']
        },
        {
          option: `How is doing the **GROCERY**?`,
          line: `Well not bad at all. I can make my life outta here...`,
          prereqs: ['hello'],
          removeOnRead: true,
        },
      ],
    },
    {
      name: ['Mother', 'mom', 'my mother', 'my mom', 'mommy', 'my mommy', 'mommie', 'my mommie'],
      roomId: 'bizimEv',
      desc: `She looks old and tired. 
      You know she is tired especially since last year after the accident.`, // printed when the player looks at the character
      // optional callback, run when the player talks to this character
      onTalk: () => println(`"I love you my son." she says.`),
      // things the player can discuss with the character
      topics: [
        {
          option: `I **LOVE** you too mom. Do you need anything?`,
          removeOnRead: true,
          onSelected() {
            println(`"The home needs to be warm. Also he looks hungry." she says.`)
            // add a special item to the player's inventory
          },
        },
        {
          option: `**OKAY**`,
          removeOnRead: true,
          prereqs: ['love'],
          onSelected() {
            // add a special item to the player's inventory
            disk.quests.push({
              name : 'keep the home warm',              
            });
            println(`NEW QUEST!`);
            disk.quests.push({
              name : 'keep the boy full',              
            });
            const room = getRoom('bizimEv');
            const exit = getExit('north', room.exits);
            delete exit.block;
          },
        }
      ],
    },
    {
      name: ['son', 'my son', 'sonnie', 'boy', 'my boy', 'my sonnie'],
      roomId: 'bizimEv',
      desc: `Your son of 5 years. 
      He looks weaker than before.`,
      onTalk: () => println(`"I'm hungry dad." he says.`),
      topics: [
        {
          option: `I will get you tasty **FOOD**.`,
          line: `"Oh really! I would love to eat some roasted chicken!"`,
          removeOnRead: true,
        },
        {
          option: `I **LOVE** you son.`,
          line: `"I love you daddy!" his eyes shine.`,
          prereqs: ['food'],
          removeOnRead: true
        }
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
          line: `Your wife died during the accident.`,
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
      name: 'soldier',
      img: `
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@@@@@@@@@@@@@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@*   #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  %@@@@@@@@@@@@@@  ,  @@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@* ,@@@@@@@@@@@@@@@@#    @@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@     @@.@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@  @@@@@@@@   @  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@( / #@@  @@@@@     .@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@   &*%(/@@@@@@@@@@@@@*  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@  *    @ @@@@@@@@@@@, @@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@   @/, @@@@@@@@@@@@@ #  #  & %@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@ . @@@@@@@@@@@@@*       ,     @@  @@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@#@@@#  @@@.  @(@@@@@@@@@@@@ @#@        %@ &*  @@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@/     @@@@@@@@@@@@@  @ @@@@@@@/@@  @@  @@@@@@% @@   @@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@ .@@@@@@@@@@@@@@@@@@@@@@@@@@/@@@@@@@@@@@@@@ &@/@@@@.   @@@@@@@@@@@
      @@@@@@@@@@@*,  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@/&.@@ * @@@@@@@@@@
      @@@@@@@@@@@ . @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@% @@@@@@@ @ @ @@@@@@@@@@
      @@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%  @@@@@@@@@#(  @@@@@@@@@
      @@@@@@@@@  @ @@@@@@@@@@@@@@@@@@@.&@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@    @@@@@@@@
      @@@@@@@    , @@@@@@@@@@@@@@@@@@@@@@@*& @@@@@@@@@@@@@@@@  /@@@@@@@@@@@ .((@@@@@@@
      @@@@( @@( # @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@ * @@@@@@@@@@@ .@ @@@@@@@
      @@@@@@@@@@@@ ( @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@ * @@@@@@@@@@@  @  @@@@@@
      @@@.@   * @@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@*, @@@@@ &@@@@@@@@@@@@@ @ @@@@@@
      @@       @@@@@@@@@@ /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @  &@@@@@@@@@@@@@@/ @@@@@@
      @@     @@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @   @@ *@@@@@@@@  @@@@@
      @@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,.@  @ @@@@@@@ % @@@@
      @@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ #@@@@@@@@@@@    . @@@@@  ,*@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ *@@@@@@@@@@&%  @@@@@% @@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@( @@@@@@@. @  @(%@@@
      @@@@@@@@@@@@@@@@@@@@@* ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@ %., @@@@`,
      desc: [`Tall.`, `He looks cool. Like a robot cool.`, `"Does this guy has a choice?" you ask when you look at him.`],
      roomId: 'crossRoad',
      onTalk: () => println(`"Hi sir!" you say.`),
      topics: [
        {
          option: `Can I **ASK** you something?`,
          onSelected() {
            println(`"What?" he says.`)
            },
          removeOnRead: true,
        },
        {
          option: `Tell me about this **PATH**`,
          line: `Nothing to talk about this path.`,
          prereqs: ['ask'],
          removeOnRead: true,
        },
        {
          option: `Let's talk about **COMMANDER**`,
          line: `Stop asking silly questions?`,
          prereqs: ['ask'],
          removeOnRead: true
        },
        {
          option: `What happened during the **ACCIDENT**`,
          line: `I'm not allowed to talk about it!`,
          prereqs: ['ask'],
          removeOnRead: true
        },
        {
          option: `Let's talk about **FOREST**`,
          line: `You can go around the forest villager.`,
          prereqs: ['ask']
        },
      ],
    },
    {
      name: 'soldier',
      img: `
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@@@@@@@@@@@@@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@*   #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  %@@@@@@@@@@@@@@  ,  @@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@* ,@@@@@@@@@@@@@@@@#    @@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@     @@.@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@  @@@@@@@@   @  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@( / #@@  @@@@@     .@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@   &*%(/@@@@@@@@@@@@@*  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@  *    @ @@@@@@@@@@@, @@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@   @/, @@@@@@@@@@@@@ #  #  & %@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@ . @@@@@@@@@@@@@*       ,     @@  @@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@#@@@#  @@@.  @(@@@@@@@@@@@@ @#@        %@ &*  @@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@/     @@@@@@@@@@@@@  @ @@@@@@@/@@  @@  @@@@@@% @@   @@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@ .@@@@@@@@@@@@@@@@@@@@@@@@@@/@@@@@@@@@@@@@@ &@/@@@@.   @@@@@@@@@@@
      @@@@@@@@@@@*,  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@/&.@@ * @@@@@@@@@@
      @@@@@@@@@@@ . @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@% @@@@@@@ @ @ @@@@@@@@@@
      @@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%  @@@@@@@@@#(  @@@@@@@@@
      @@@@@@@@@  @ @@@@@@@@@@@@@@@@@@@.&@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@    @@@@@@@@
      @@@@@@@    , @@@@@@@@@@@@@@@@@@@@@@@*& @@@@@@@@@@@@@@@@  /@@@@@@@@@@@ .((@@@@@@@
      @@@@( @@( # @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@ * @@@@@@@@@@@ .@ @@@@@@@
      @@@@@@@@@@@@ ( @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@@ * @@@@@@@@@@@  @  @@@@@@
      @@@.@   * @@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@*, @@@@@ &@@@@@@@@@@@@@ @ @@@@@@
      @@       @@@@@@@@@@ /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @  &@@@@@@@@@@@@@@/ @@@@@@
      @@     @@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @   @@ *@@@@@@@@  @@@@@
      @@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,.@  @ @@@@@@@ % @@@@
      @@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ #@@@@@@@@@@@    . @@@@@  ,*@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ *@@@@@@@@@@&%  @@@@@% @@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@( @@@@@@@. @  @(%@@@
      @@@@@@@@@@@@@@@@@@@@@* ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@ %., @@@@`,
      desc: [`Tall.`, `He looks cool. Like a robot cool.`, `"Does this guy has a choice?" you ask when you look at him.`],
      roomId: 'road',
      onTalk: () => println(`"Hi sir!" you say.`),
      topics: [
        {
          option: `Can I **ASK** you something?`,
          onSelected() {
            println(`"What?" he says.`)
            },
          removeOnRead: true,
        },
        {
          option: `Tell me about this **ROAD**`,
          line: `Road to Mugla City.`,
          prereqs: ['ask'],
          removeOnRead: true,
        },
        {
          option: `Let's talk about **COMMANDER**`,
          line: `Why are you asking silly questions?`,
          prereqs: ['ask'],
          removeOnRead: true
        },
        {
          option: `What happened during the **ACCIDENT**`,
          line: `Bad things happen. Long live the Army!`,
          prereqs: ['ask'],
          removeOnRead: true
        },
        {
          option: `Let's talk about **FOREST**`,
          line: `People are allowed to forest but we are not allowed.`,
          prereqs: ['ask']
        },
      ],
    },
  ],
};

