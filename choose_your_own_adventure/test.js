
// Use this file to test the functionality of particular functions, classes, etc. 

const a = ['b', 'o', 'b'];

const w = ['b', 'o', 'b']; 

const z = ['b', 'o', 'c'];

const l = ['b', 'o', 'b', 'b', 'o', 'b'];

if (a === w){console.log('it works')}
else {console.log('wtf?')}

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

if (compareArray(a, c)) {console.log('It returned true')}
else {console.log('It returned false')};  

