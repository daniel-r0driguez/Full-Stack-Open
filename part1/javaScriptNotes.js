// JavaScript | Section 1b

// Variables
console.log('Variables\n=====================');
/*
 * There are a number of ways to define variables.
 * For example, keywords 'var', 'let' and 'const' are all ways to define a JavaScript variable.
 * 'const' and 'let' are the most recommended as they have block scope, necessary for preventing bugs.
 */
const X = 5;
let y = 10;

console.log(X,y);

// In JavaScript, the data type of a variable can be changed on execution.
y = 'hello';

console.log(X,y);
/////////////////////////////////////////////////////
// Arrays
console.log('\nArrays\n=============');
/*
 * The way arrays work in JavaScript is similar to the way they work in Java, except less strict syntax.
 * When you assign a variable to an array, it is similar to an object reference in Java.
 * If you assign a variable to another array variable, then both variables point to the same array.
 */
const arr1 = [1,2,3];

const arr2 = arr1;

// Modifying the array both arr1 and arr2 point to.
// Note: even though arr1 and arr2 are constant variables, you can still modify the object they point to. This is very similar in behavior to how final object references in Java work.
arr2.push(5);

console.log(arr1);
/////////////////////////////////////////////////////
// Objects
console.log('\nObjects\n===================');
/*
 * There are a few different ways of defining objects in JavaScript.
 * One very common way is using object literals.
 */

// Example object literal declaration
const OBJECT1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PHD'
};

const OBJECT2 = OBJECT1;

OBJECT2.name = 'Billy';

console.log(OBJECT1.name);

// The values of the properties (member variables) can be of any type.
// They can be integers, strings, arrays, objects, etc...
// You can even add properties to objects on the fly by either using dot notation or brackets:
OBJECT1.address = 'Helsinki';
OBJECT1['secret number'] = 12341;

console.log(OBJECT1.address);

// Objects in JavaScript can also have methods, however this course will not dive too deep into this feature.
// Objects can also be defined using so-called constructor functions, similar to Java.
// However, JavaScript does not have classes in the same sense as object oriented-programming languages.
/////////////////////////////////////////////////////
// Functions
console.log('\nFunctions\n=======================')
/*
 * The arrow function has already been discussed
 */
// Example arrow function.
const sum = (p1, p2) => {
    console.log('Entering sum function');
    console.log(p1);
    console.log(p2);
    console.log('Exiting sum function');
    return p1 + p2;
}

const result = sum(9, 1);
console.log(result);

// If there is just a single parameter, the parentheses can be excluded from the definition
const square = p => {
    console.log(p);
    return p * p;
}

// If the function only contains a single expression, then the braces are not needed.
const square2 = p => p * p;

// The arrow function feature was only added recently to JavaScript with version ES6.
// Before that, you had to use the 'function' keyword.

// THere are two ways to reference functions.
// 1. Giving a name in a function declaration.
function product(a, b)
{
    return a * b
}

// 2. Using a function expression. In this case, there is no need to give the function a name and the definition may reside among the rest of the code.
const average = function(a, b)
{
    return (a + b) / 2;
}

// In this course however, all functions will be defined using the arrow syntax.


