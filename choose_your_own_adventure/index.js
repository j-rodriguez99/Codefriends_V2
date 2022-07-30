
(async () => {

// Import the prompt sync module in order to ask the users questions and save the answers into variables. 
const prompt = require('prompt-sync')();

let name = prompt('What is your name? ');

if (!name) {name = 'Dr. Mystery'}

console.log(`\nMadison Avenue, a street lined with frail leafless trees, sat undeveloped for over a century. Save for the white house. 
As the rest of the city grew, Madison was eventually developed. Despite the hard, dry, lifeless soil, ${name}'s family moved into the neighborhood. After all,
those silly rumors about the white house at the end of the street, created a great buying opportunity.\n`);  

// I create a class named Die that is then able to produce different dice objects. 

class Die {
  constructor (sides) { 
    this.sides = sides; 
  }

  roll () {
    let chance =  Math.floor(Math.random() * this.sides + 1);
    console.log(`Rolling a ${this.sides} sided die. You rolled a ${chance}!`);
    return chance; 
    }
};

const d4 = new Die(4); 
const d6 = new Die(6);
const d8 = new Die(8);  
const d20 = new Die(20); 

// A function that rolls for your attributes. It rolls a d6 4 times and takes the sum of the 3 highest rolls. 

const rollForStat = () => {
  console.log('');
  const numStat = []; 
  numStat[0] = d6.roll();
  numStat[1] = d6.roll();
  numStat[2] = d6.roll();
  numStat[3] = d6.roll();
  numStat.sort(function (a, b){return b - a});
  const lowest = numStat.pop(); 
  console.log (`Your lowest roll ${lowest} was removed \n`);   
  const statNumber = numStat.reduce((acc, current) => {return acc + current}); 
  console.log(`Your ability score roll is ${statNumber}.`);
  return statNumber;
}

console.log(`Your stats are determined by rolling 4 six-sided dice. The sum of your 3 highest rolls can then be assigned to an attribute. \nAlternatively, you can choose to take the default stats. Deafault stats are 12, 10, and 10. Let's see what your made of ${name}?\n`);

// An array to hold the three stat values. Starting values are default stats.  
let yourStats = [12, 10, 10];

// Import the Toggle class that has a constructor method which takes an object as an argument. 
const { Toggle } = require('enquirer');

const ready = new Toggle({
  message: 'Would you like to roll for stats or take default stats?',
  enabled: 'Roll',
  disabled: 'Default'
});

// The object ready that was created by the imported toggle class has a run method. Use it to choose default stats or to execute the rollForStat function.

await ready.run()
.then(answer => {
  if (answer === true) {
  yourStats[0] = rollForStat(); 
  yourStats[1] = rollForStat();
  yourStats[2] = rollForStat();
  console.log(`\nYour 3 stat roles are ${yourStats[0]}, ${yourStats[1]}, and ${yourStats[2]}`);
  }
  else {console.log('\nThe overly cautious don\'t often make exciting heroes!');
  console.log(`\nYour 3 stat roles are ${yourStats[0]}, ${yourStats[1]}, and ${yourStats[2]}`);
  }
})
.catch(console.error); 

// Assign your stat rolls to the attribute of your choice. 
let strength;
let vitality;
let intelligence; 
const attributeArray = ['Strength', 'Vitality', 'Intelligence']; 

const { Select } = require('enquirer');
 
const attributeOne = new Select({
  name: 'attribute one',
  message: `Assign ${yourStats[0]} to the attribute of your choice.`,
  choices: attributeArray
});
 
await attributeOne.run()
  .then(answer => {
    if (answer === 'Strength') {strength = yourStats[0]}
    else if (answer === 'Vitality') {vitality = yourStats[0]}
    else {intelligence = yourStats[0]}
  })
  .catch(console.error);

if (strength) {attributeArray.splice(0, 1)} 
if (vitality) {attributeArray.splice(1, 1)} 
if (intelligence) {attributeArray.splice(2, 1)}

const attributeTwo = new Select({
  name: 'attribute two',
  message: `Assign ${yourStats[1]} to the attribute of your choice.`,
  choices: attributeArray
});

await attributeTwo.run()
.then(answer => {
  if (answer === 'Strength') {strength = yourStats[1]}
  else if (answer === 'Vitality') {vitality = yourStats[1]}
  else {intelligence = yourStats[1]}
})
.catch(console.error);

if (!strength) {strength = yourStats[2]}
else if (!vitality) {vitality = yourStats[2]}
else {intelligence = yourStats[2]}

//Neighborhood kid type question. 
const neighborhoodKidType = new Select({
  name: 'neighborhood kid type',
  message: `\nWhat neighborhood kid type are you? Your Strength attribute is ${strength}. Your Vitality attribute is ${vitality}. Your Intelligence attribute is ${intelligence}. The Four Square Champs gets +2 vitality. The Bookworm gets +2 intelligence. The athlete gets +2 strength. The Breaker gets +1 intelligence and +1 strength. The video game slayer gets +1 intelligence and +1 vitality. The double dutch legend gets +1 vitality and +1 strength`,
  choices: ['Four Square Champion', 'Bookworm', 'Athlete', 'Bboy/Bgirl/Breaker', 'Video Game Slayer', 'Double Dutch Legend']
});

await neighborhoodKidType.run()
.then(answer => {
  if (answer === 'Four Square Champion') {vitality+=2;}
  else if (answer === 'Bookworm') {intelligence+=2;}
  else if (answer === 'Athlete') {strength+=2;}
  else if (answer === 'Bboy/Bgirl/Breaker') {intelligence++; strength++;}
  else if (answer === 'Video Game Slayer') {intelligence++; vitality++;}
  else {vitality++; strength++;}
})
.catch(console.error);

// Each skill check (lifting boxes, investigating something, etc.) requires a d20 roll. The modifier determines how much is added to your roll based on your attributes.
const strengthModifier = Math.floor((strength -10)/2);
const vitalityModifier = Math.floor((vitality -10)/2);
const intelligenceModifier = Math.floor((intelligence -10)/2);  

console.log(`Your final Strength score is ${strength} giving you a strength modifier of ${strengthModifier}!\nYour final Vitality score is ${vitality} giving you a vitality modifier of ${vitalityModifier}!\nYour final Intelligence score is ${intelligence} giving you an intelligence modifier of ${intelligenceModifier}!\n`);

console.log('Character Creation is now complete. Successfully accomplishing certain tasks (a skill check) will be based on your attribute scores and on how well you perform the action (represented by rolling a 20 sided die and adding the relevent attribute modifier). A difficult task my require a higher skill check outcome to succeed!\n');

console.log(`The days have been growing shorter. The sun had already set on Madison Avenue. Even though it was barely 6:15, the last of the light was quickly retreating.\n`)


// Select prompt that provides story and allows you to choose your difficulty setting. 

let spiritLife;
let difficulty; 

const locationZero = new Select({
  name: 'location zero',
  message: `You receive a frantic phone call from Rocio, a friend of your younger sister. She informs you that on a dare, your sister climbed the fence at the deadend and entered the haunted white house. She says it's been fifteen minutes and no one has heard from her. You immediately run to the house, climb the fence, and go after your sister. You feel a chill run down your spine as you approach the rotting wooden steps. You notice a grotesque gargoyle-esque door knocker that hangs on the thick panel door ... the door is slightly ajar. You enter!\n\n ~~Choose your difficulty setting~~\nNormal is recommended.`,
  choices: ['Easy', `Normal`, 'Hard', 'Legendary']
});

await locationZero.run()
  .then((answer) => {
    if (answer === 'Easy'){difficulty = 15; spiritLife = 4;}
    else if (answer === `Normal`){difficulty = 19; spiritLife = 4;}
    else if (answer === `Hard`){difficulty = 20; spiritLife = 5;}
    else {difficulty = 25; spiritLife = 7;}
  })
  .catch(console.error);


// Include all arrays that will be used as question here. Also include the player location variable that determines what prompts to run.  

let playerLocation = 'entrance';
let spiritLocation = 'basement';
const locationsArray = ['entrance', 'sitting room', 'red room', 'dining room', 'kitchen', 'study', 'bathroom', 'upstairs', 'bedroom']; 
const entranceArray = ['Attempt to move the boxes, it appears there may be a door behind them.', 'Take the door to the left of the entrance', 'Head for the basement', 'Go upstairs', 'Leave the house, she\'s on her own']; 
const sittingArray = ['Go through the red door', 'Investigate the creepy looking bookshelf', 'Look closer at the puddle', 'Go through the thick door.'];
const redArray = ['Take the rotting door', 'Go through the door that does not completely close', 'Grad a drink', 'Take the red door'];
const secretArray = ['Search the room', 'Head back the way you came in.'];
const diningArray = ['Take a closer look at the ornate china cabinet', 'Go through the door that leads to the foyer.', 'Head through the white door.'];
const kitchenArray = ['Go through the white door.', 'Take the fancy looking brown door.', 'Maybe my sister left a message with the magnet letters'];
const studyArray = ['Go through the fancy brown door', 'Take the door that doesn\'t completely close', 'Take the flismy door', 'Help feed the ghoul']; 
const bathroomArray = ['Take the rotting door', 'Go through the flimsy door', 'Turn off the shower', 'Turn off the sink']; 
const upstairsArray = ['Go through the wooden door', 'Look over the wooden railing into the room below', 'Go back downstairs'];
const bedroomArray = ['Head to the double parlor', 'Take a look at the photos that hang over the bureau', 'Investigate the laundry shoot'];


// variables needed in while loop.

let sister;
let attackString = 'Attempt to attack the spirit';
let boxes;
let key; 
let ghoul;
let damage;
let torch; 
let summon;  
let spiritHealth = spiritLife;
let previousDoor = `You yell your sister's name repeatedly. The eerie creaking of an old house is the only response you receive`;
let ghoulMessage = ` In another corner sits a ghoul looking creature. It's shambling mass paces back and forth never getting close to some painted symbols on the hard wood floor. It calls to you as soon as you enter. 'The spirit, it took that ones life force. I don't mind, I prefer dead flesh. Bring the body, throw it past the markings, feed me. We be friends?'`  
let health = vitality;  
let drinkingGame = 3; 
let randomShower = ' The shower is running.';
let randomSink = ' Someone left the sink\'s faucet running.';
let bookTest = 17;
let lockedDoor = 29;
const correctPuzzle = ['h', 'e', 'l', 'p', ' ', 'm', 'e', ' ', 'g', 'o', 'd'];
const correctPuzzle2 = ['g', 'o', 'd', ' ', 'h', 'e', 'l', 'p', ' ', 'm', 'e'];

// Declare the variables that will be assigned to each location's select prompt. 
let mainEntrance;
let sittingRoom;
let redRoom;
let secretRoom; 
let diningRoom;
let kitchen;
let study;
let bathroom;
let upstairs; 
let bedroom;   

// function needed to remove a string from an array regardless of what index it is in.
// works even if enquirer has transformed array of strings into an array of objects.

const removeString = (arrayName, string) => {
  for (let w = 0; w < arrayName.length; w++){
    if (arrayName[w].name === string || arrayName[w] === string){
      arrayName.splice(w, 1);
      w--;
    }
  }
} 

// function needed to compare two arrays for one of the puzzles. arrays must be identical or it returns false. 

const compareArray = (array1, array2) => {
  if (array1.length === array2.length) {
    for (let i = 0; i < array1.length; i++)
    {
      if (array1[i] !== array2[i]) {return false}; 
    }
  }
  else {return false}

return true; 
};


// Start of while loop. 
while (!sister) {

removeString(sittingArray, attackString);
removeString(entranceArray, attackString);
removeString(redArray, attackString);
removeString(diningArray, attackString);
removeString(studyArray, attackString);
removeString(kitchenArray, attackString);
removeString(bathroomArray, attackString);
removeString(upstairsArray, attackString);
removeString(bedroomArray, attackString);


// This section is determines if the spirit is still alive. Whether or not it is in the same location as you and who attacks first. It also adds the attack option to the various prompts below.
if (spiritHealth < 1) {
  console.log('\nThe spirit appears to have been wounded, it retreats into the shadows from which it came.\n')
  spiritLocation = 'hide';
  spiritHealth = spiritLife;
}

if (playerLocation === spiritLocation) {

  console.log(`\nA specter is in the room with you! It moves through the shadows of the room looking for an opportunity to strike. Roll a 20 sided dice and add your intelligence modifier of ${intelligenceModifier} to see who acts first.\n`);
  
  if (d20.roll() + intelligenceModifier > 15){console.log(`You quickly study the way the spirit moves through the shadows and are able to act before it attacks!`)
  }
  else {
    console.log(`\nYour health is currently ${health}. Roll 1 six sided dice to see how much damage the spirit inflicts.`)
    health = health - d6.roll();
    console.log(`\nBefore you can react the specter's ghostly hands swipe at you. You feel some of your life force drain from your body. Your health is now ${health}.\n`)
  }
    
  entranceArray.push(attackString);
  sittingArray.push(attackString);
  redArray.push(attackString);
  diningArray.push(attackString);
  studyArray.push(attackString);
  kitchenArray.push(attackString);
  bathroomArray.push(attackString);
  upstairsArray.push(attackString);
  bedroomArray.push(attackString);
}

if (health < 1){console.log('I ... cough, couldn\'t save her!\n\n ~ GAMEOVER ~ ');
    process.exit();
}

// re-assign all select objects.

  mainEntrance = new Select({
    name: 'main entrance',
    message: `\nYou find yourself in a foyer of sorts. Your eyes are immediately drawn across the room to the dim flickering light emitted by a candle sitting on the banister of a staircase leading upstairs. ${previousDoor}. A door sits to the left of the entrance, a pile of boxes are to the right of the entrance. A door that leads to the basement is on the far end of the foyer.\n`,
    choices: entranceArray
  });
   
  sittingRoom = new Select({
    name: 'sitting room',
    message: `\nYou are now in a dusty sitting room. There seems to be some wetness pooling by a plain looking door. There is also a thick brown door. You see a bookshelf filled with books and cobwebs. Lastly, there is also a red door. ${previousDoor}`, 
    choices: sittingArray
  });

  redRoom = new Select({
    name: 'red room',
    message: `\nA bar and some stools sit in front of a few shelves. They hold mostly rum and whiskey. In this room there is a red door, another door that appears to be rotting, and a door that doesn't seem to close completely. ${previousDoor}`, 
    choices: redArray
  });

  secretRoom = new Select({
    name: 'secret room',
    message: `\nThe passage way leads to a secret room. The only way out is the way you came in.`, 
    choices: secretArray
  });

  diningRoom = new Select({
    name: 'dining room',
    message: `\nYou are in a large dining room. There is the door that leads back to the foyer and a white door. There is also a large and incredibly ornate china cabinet in the room. ${previousDoor}`, 
    choices: diningArray
  });

  kitchen = new Select({
    name: 'kitchen',
    message: `\nYou are in the kitchen. There is a fancy looking brown door and a white door. There is also some old and faded letter magnets on a tacky green refrigerator. ${previousDoor}`, 
    choices: kitchenArray
  });

  study = new Select({
    name: 'study',
    message: `\nYou enter a room with an ornate carpet on the floor. There is a large desk in one corner of the room.${ghoulMessage} ${previousDoor}`, 
    choices: studyArray
  });

  bathroom = new Select({
    name: 'bathroom',
    message: `\nYou enter a bathroom. There is a rotting door and a flimsy door in the room.${randomShower}${randomSink} ${previousDoor}`, 
    choices: bathroomArray
  });

  upstairs = new Select({
    name: 'upstairs',
    message: `\nYou are now in a double parlour. One half of the double parlour is inaccessible due to a partially collapsed roof. You see a wooden door and a railing that overlooks a room below. ${previousDoor}`, 
    choices: upstairsArray
  });

  bedroom = new Select({
    name: 'bedroom',
    message: `\nYou enter a large bedroom. There is a wooden beurea with what appears like family photos hanging above it. There is also a laundry shoot at the far end of the room. ${previousDoor}`, 
    choices: bedroomArray
  });

// player prompts based on player location variable. 

if (playerLocation === 'entrance'){

  await mainEntrance.run()
  .then((answer) => {
    if (answer === 'Attempt to move the boxes, it appears there may be a door behind them.'){
      if (d20.roll() + strengthModifier > 11){console.log('The boxes were a bit heavy than expected but you were able to move them aside');
        boxes = 'moved'; 
        entranceArray[0] = 'Take the thick door to the right of the entrance that was revealed by moving the boxes'}
      else {console.log('These boxes are heavier than they appear\n')}
    }
    else if (answer === 'Take the thick door to the right of the entrance that was revealed by moving the boxes') {console.log('');
      playerLocation = 'sitting room'; 
      previousDoor = 'You entered through the thick door'}

    else if (answer === 'Take the door to the left of the entrance'){playerLocation = 'dining room';
    previousDoor = 'You entered through the door that leads to the foyer'}

    else if (answer === 'Head for the basement'){
      console.log(`\nAs you begin to descend the basement steps, you feel something violently grab you just above the ancle. You fall down the stairs and hit your head hard on the concrete floor. As all fades to black, you hear a voice that sounds like the howling of the wind say,\n\nYOU SHOULD HAVE NEVER DISTURBED OUR SLUMBER!\n`);
      process.exit();  
    }
    else if (answer === 'Go upstairs'){ playerLocation = 'upstairs'; previousDoor = 'You came from downstairs'}
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)
      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
        else {damage = d8.roll() + strengthModifier;}
      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else {
    console.log(`\nYou spend the rest of your days wondering what happened to your sister.`);
    process.exit();
    }
  })
  .catch(console.error);

}
//end of if portion - location === entrance 
  

else if (playerLocation === 'sitting room'){

  await sittingRoom.run()
  .then(answer => {
    if (answer === 'Go through the red door'){playerLocation = 'red room'; previousDoor = 'You entered through the red door';}
    
    else if (answer === 'Investigate the creepy looking bookshelf'){
        if (d20.roll() + intelligenceModifier > bookTest){console.log('You notice some inconsitencies in the way the classification number of the books are cataloged. As you place the books in their correct location, the book shelf sputters aside revealing a secret passage way');
        sittingArray[1] = 'Enter the secret passage way!'}
        else {console.log('There is something off about this bookshelf. If only I could figure it out.\n'); bookTest--;}
    }

    else if (answer === 'Look closer at the puddle') {console.log('As you approach the door you begin to feel disoriented. You put your hand on the door and immediately feel a bone deep chill');
      sittingArray[2] = 'Enter the cold door'
    }

    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)

      if (!torch){damage = d4.roll() + strengthModifier;} 
      else {damage = d8.roll() + strengthModifier;}

      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
      
    else if (answer === 'Enter the cold door'){console.log('You feel increasingly out of sorts as you enter. You believe you see an empty rocking chair swaying back and forth in the corner.Suddingly the door you entered slams shut behind you. Everything begins to fade.');
      process.exit();
    }

    else if (answer === 'Enter the secret passage way!') {playerLocation = 'secret room';}
      
    else {
      if (boxes){
        playerLocation = 'entrance'; previousDoor = 'You entered through the thick door'}
      else {console.log('Something heavy is on the otherside of this door. I\'ll have to find another way')}
    }
  })

  .catch(console.error);
  }
// end of playerLocation === 'sitting room' else if. 

else if (playerLocation === 'red room'){

  await redRoom.run()
  .then(answer => {
    if (answer === 'Take the rotting door'){playerLocation = 'bathroom'; previousDoor = 'You entered through the rotting door.'}
    else if (answer === 'Go through the door that does not completely close'){
      playerLocation = 'study'; previousDoor = 'You entered through the door that does not completely close.';
    }
    else if (answer === 'Grad a drink'){
      if (d20.roll() + vitalityModifier > drinkingGame){health+=2; drinkingGame+=4;
        console.log(`You pour yourself a shot of whiskey. Your health score increases by two and is now ${health}. It's intoxicatingly good. Got to be careful with this stuff.`);} 
      else {console.log('\nYou\'ve had a bit too much. You imagine a vest wearing old man saying \"just one more\" as he pours you another drink. You drink and feel your eye lids getting heavy. You drift to sleep never to awaken again!');
        process.exit();}
    }
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)

      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
      else {damage = d8.roll() + strengthModifier;}

      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else  {playerLocation = 'sitting room'; previousDoor = 'You entered through the red door.'}  
  })
  .catch(console.error);
}
// end of playerLocation === red room section. Secret room is never attacked by the spirit. 

else if (playerLocation === 'secret room'){
  await secretRoom.run()
  .then(answer => {
  if (answer === 'Search the room'){console.log('You find a torch and some matches. This should help keep the shawdows away! Torch added to your inventory. Your attack damage against the spirit has increased!');
    secretArray.splice(0,1);
    torch = 'added to inventory';
  }
  else  {playerLocation = 'sitting room'; previousDoor = 'You returned to the sitting room after exploring the secret passage.'}  
})
.catch(console.error);
}
// end of playerLocation === secret room section. 

else if (playerLocation === 'dining room'){

  await diningRoom.run()
  .then(answer => {
    if (answer === 'Take a closer look at the ornate china cabinet'){console.log(`It's just a fancy china cabinet.`);
      diningArray.splice(0,1);}
    else if (answer === 'Go through the door that leads to the foyer.'){playerLocation = 'entrance';
    previousDoor = 'You entered from the door to the left of the entrance'
    }
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)

      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
      else {damage = d8.roll() + strengthModifier;}

      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else  {playerLocation= 'kitchen'; previousDoor = 'You entered from the white door';}  
  })
  .catch(console.error);
  }

// end of playerLocation === dining room. 

else if (playerLocation === 'kitchen'){

  await kitchen.run()
  .then(answer => {
    if (answer === 'Go through the white door.'){playerLocation = 'dining room'; previousDoor = 'You entered through the white door';}
    else if (answer === 'Take the fancy looking brown door.'){playerLocation = 'study'; previousDoor = 'You came from the fancy brown door';}
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)
      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
        else {damage = d8.roll() + strengthModifier;}
      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else  { playerLocation = 'magnet puzzle';}  
  })
  .catch(console.error);
  }
  // end of player location === kitchen. 
 
  else if (playerLocation === 'magnet puzzle'){

  playerLocation = 'kitchen';

const { Sort } = require('enquirer');
const puzzle = new Sort({
  name: 'colors',
  message: 'Press shift and the up or down arrow keys to move a letter or space. Try and spell out the message from top to bottom.',
  hint: 'Have faith',
  numbered: true,
  choices: ['o', ' ', 'e', 'l', 'p', ' ', 'g', 'd', 'h', 'm', 'e']
});
 
await puzzle.run()
  .then(function(answer) {
    if (compareArray(answer, correctPuzzle) || compareArray(answer, correctPuzzle2)){
      console.log('\nA key appears in your left hand. What could this be for? You quickly stuff it into your pocket.');
      key = 'aquired';
      kitchenArray.splice(2,1); 
    }
    else {console.log('I don\'t think that was the message.'); }
  })
  .catch(console.error);
  }
// end of magnet puzzle game. 

else if (playerLocation === 'study'){

  await study.run()
  .then(answer => {
    if (answer === 'Go through the fancy brown door'){playerLocation = 'kitchen'; previousDoor = 'You entered through the fancy brown door';}
    else if (answer === 'Take the door that doesn\'t completely close'){playerLocation = 'red room'; previousDoor = 'You came from the door that completely close';}
    else if (answer === 'Take the flismy door'){playerLocation = 'bathroom'; previousDoor = 'You came from the flimsy door'}
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)
      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
        else {damage = d8.roll() + strengthModifier;}
      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else  { 
          if (d20.roll() + strengthModifier > 10) {console.log('You are able to drag the body closer to the arcane symbols. You lift the body slightly and push it over the symbols into the ghoul\'s corner. It immediately starts ripping into the dead flesh with it\'s teeth. It stops mid bite to look up at you lovingly and then continues digging into the corpse.');
            ghoul = 'fed';
            studyArray.splice(3, 1);
            ghoulMessage = `The ghoul smiles broadly and says 'hello friend. hello!'`
          }
          else {console.log('The body is a bit difficult to grab a hold of. I\'m sure if I try again I\'ll be able to drag it over')} 
        }
           
  })
  .catch(console.error);
  }

// end of player location === study. 
//'Take the rotting door', 'Go through the flimsy door', 'Turn off the shower', 'Turn off the sink'

else if (playerLocation === 'bathroom'){

  await bathroom.run()
  .then(answer => {
    if      (answer === 'Take the rotting door'){playerLocation = 'red room';}
    else if (answer === 'Go through the flimsy door'){playerLocation = 'study';}
    else if (answer === 'Turn off the shower'){console.log('The shower is now off.');
      randomShower = '';
      bathroomArray.splice(2,1);
  } 
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)
      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
        else {damage = d8.roll() + strengthModifier;}
      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else  {console.log('The faucet is now off.');
    randomSink = '';
    removeString(bathroomArray, 'Turn off the sink');}  
  })
  .catch(console.error);
}

// end of player location === bathroom. 

// 'Go through the wooden door', , 

else if (playerLocation === 'upstairs'){


  await upstairs.run()
  .then(answer => {
    if      (answer === 'Go through the wooden door'){
      console.log('\n *** It\'s locked! ***');
      upstairsArray[0] = 'Break down the locked wooden door';
      upstairsArray.push('Use a key to open the wooden door');
    }
    else if (answer === 'Look over the wooden railing into the room below'){console.log('\nYou see a room with an ornate carpet on the floor. There is a large desk in one corner of the room. It\'s hard to make it out from here but was that a person lurking in the shadows of the corner of the room?');
    }
    else if (answer === 'Go back downstairs'){playerLocation = 'entrance'; previousDoor = 'You came from upstairs.';
    }
     
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)
      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
        else {damage = d8.roll() + strengthModifier;}
      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else if (answer === 'Break down the locked wooden door'){
      lockedDoor = lockedDoor - (d4.roll() + strengthModifier);
      if (lockedDoor < 1) {upstairsArray[0] = 'Go through the busted down door.'; console.log('You broke down the door!');
      removeString(upstairsArray, 'Use a key to open the wooden door');}
      else if (lockedDoor < 9) {console.log('The door is starting to crack and splinter open.')}
      else {console.log('The door is taking damage based on your roll and your strength modifier. It is however reinforced and can\'t easily be busted open');} 
    } 
    else if (answer === 'Go through the busted down door.'){playerLocation = 'bedroom'; previousDoor = 'You came from the door that leads to the double parlour.';
    }
    else if (answer === 'Use a key to open the wooden door'){
      if (key) {playerLocation = 'bedroom'; previousDoor = 'You came from the door that leads to the double parlour.';
      removeString(upstairsArray, 'Break down the locked wooden door');}
      else {console.log('\nYou don\'t have a key to this door')}
    } 
    else {playerLocation = 'bedroom'; previousDoor = 'You came from the door that leads to the double parlour.';}
  })
  .catch(console.error);
}

// end of player location === upstairs 


//, 'Take a look at the photos that hang over the bureau', 'Investigate the laundry shoot'

else if (playerLocation === 'bedroom'){

  await bedroom.run()
  .then(answer => {
    if      (answer === 'Head to the double parlor'){playerLocation = 'upstairs';}
    else if (answer === 'Take a look at the photos that hang over the bureau'){
      console.log(`You see a photo of a man, a woman, and three young boys. There is a dusty journal on the bureau as well. The last entry reads - "A man shouldn't have to bury his sons. And now she's gone. Says my obsession has consumed me. I'll find a way to bring them back.`);
      bedroomArray.splice(1,1); 
    }
    else if (answer === attackString){
      console.log(`\nRolling damage - damage is based on your roll and your strength modifier of ${strengthModifier}.`)
      if (!torch){ 
        damage = d4.roll() + strengthModifier;} 
        else {damage = d8.roll() + strengthModifier;}
      console.log(`You attack for ${damage} damage.`)
      spiritHealth = spiritHealth - damage;
    }
    else if (answer === 'Investigate the laundry shoot')  {
      
      removeString(bedroomArray, 'Investigate the laundry shoot');
      bedroomArray.push('Carefully hug the wall around the collapsed floor in order to investigate the laundry shoot');
     
      if (d20.roll() + intelligenceModifier + strengthModifier > 18) {
      console.log(`As you approach the laundry shoot, the floor begins to collapse around you. Your quick thinking and fast reflexes allow you to avoid the fall.`)
      }
      
      else {if (ghoul){playerLocation = 'study';
            console.log('You don\'t notice the floor collapsing around you until it\'s too late! You fall into the corner of the study below. The ghoul unfraid of the falling debris catches you as you fall.')
            ghoulMessage = ' The ghoul says, \"You can always count on me friend.\" Did you find me more food?';
            previousDoor = 'You fell from the bedroom above.'
          } else {console.log('You don\'t notice the floor collapsing around you until it\'s too late! You fall into the corner of the study below. The monstrous ghoul creature waiting below pounces on you while you are still disoriented from the fall. He says, \"I\'m so hungry\" as he crushes your head against the floor boards'); 
            process.exit();}
      }
      
    }
    else if (answer === 'Take the laundry shoot into another room.'){
      // missing code here. 
      console.log('You find yourself in the basement. Your eyes adjust to the darkness to find your sister huddled in the corner. Your run over, grab her hand and book it up the basement steps. Something reaches up for your ancle as you run up the stairs to the foyer but your sister kicks it away.');
      console.log('\n ~~~ CONGRATULATIONS HERO! YOU HAVE SURVIVED THE HORRORS OF THE WHITE HOUSE. YOUR SISTER IS SAFE! ~~~ \n')
      sister='saved';
    }
    else {
    console.log('You find your sister\'s bracelet in the laundry shoot. The laundry shoot is large enough for you to fit in. I think this leads to another room!')
      removeString(bedroomArray, 'Carefully hug the wall around the collapsed floor in order to investigate the laundry shoot');
      bedroomArray.push('Take the laundry shoot into another room.');
    }

  })
  .catch(console.error);
}

// end of player location === bedroom.

else {console.log('Use this later for other location options, if needed.')}

//If the player and the spirit are not in the same location, give a 25% chance that the spirit arrives in the player's location.

if (playerLocation !== spiritLocation){
  summon = Math.floor(Math.random() * 100 + 1)

  if (summon <= difficulty){spiritLocation = playerLocation;}

};

// while loop close. 
}

// async close.
})()

