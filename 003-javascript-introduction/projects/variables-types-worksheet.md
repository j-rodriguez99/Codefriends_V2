100 + 4 evaluates to 104/Number
'a' + 'b' evaluates to 'ab'/string
'Bob' + 'Smith' evaluates to 'BobSmith'/string
'7' + '9' evaluates to '79'/string
'7' + 9 evaluates to '79'/string
'7' - 9 evaluates to -2/number
'abc' * 3 evaluates to NaN
7+2*3 evaluates to 13/number
(7+2)*3 evaluates to 27/number
(null+2)/3 evaluates to 2/3 number
const name; evaluates to - trick question, will get an error. 

snippet 12: 
const x = 7;
const y = 4;
const z = x * y;

z - 3 evaluates to 25/number

snippet 13 - 
const a = true;
const b = false;

a && b evaluates to false/boolean

snippet 14 - 
const a = true;
const b = false;
Evaluate this expression: a || b evaluates to true/boolean

snippet 15
let foo = 3;
foo++;
foo++;

Evaluate this expression: foo/2 = 2.5/number

snippet 16 
const age = 29.8;
const wholeAge = Math.floor(age);
const nextAge = Math.ceil(age);

Evaluate this expression: nextAge - wholeAge = 1/number

snippet 17
'5' + 3 - 3 = 50/number

snippet 18
let isRed = false;
isRed = !isRed;

Evaluate this expression: isRed = true/bolean

snippet 19
let isBlue = true;
let isBlue = !!isBlue;

Evaluate this expression: isBlue = trick question declaring twice.  

snippet 20 
const name = 'Sally';
const age = 25;

Evaluate this expression: name.length + age = 30/number

snippet 21 
const x = 10;
const y = 73.3;

const point = '[' + x + ', ' + y + ']';
Evaluate 'point: '+point = 
'point: [10, 73.3]' /string

snippet 22 
const numberOfSheep = 16;
const numberOfGoats = 3;

Evaluate this expression: numberOfGoats + numberOfSheep++ evaluates to 19/number (trick questions, assignment to const variable)

snippet 23 
const numberOfSheep = 16;
const numberOfGoats = 3;

Evaluate this expression: numberOfGoats - ++numberOfSheep evaluates to an error, assignemnt to const. 

snippet 24
const x;
const y = (x=7);

Evaluate this expression: y - Error, x must be defined. 
