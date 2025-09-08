#### 1) What is the difference between var, let, and const?

Answer: var is function-scoped or global-scoped if it is outside of a function. redeclarable and can be updated. As it can be redeclarable, there is always a fear of unintentional variable redeclaration. hoisted to the top of the scope so variables declared with var can be used before being initialized. Introduced in ES6, let is block-scoped ({}). can be reassigned but can't be redeclared in the same block of scoped. let cannot be used before being initialized. const are also block-scoped but cannot be reassigned or redeclared. It has to be initialized at declaration. For arrays and objects declared with const, properties and elements are modifiable, but the reference is constant.

#### 2) What is the difference between map(), forEach(), and filter()?

Answer: map() iterates on an array and returns a new array with transformed elements or data. does not modify the original array. forEach() iterates over an array and executes a function (callback) for each element. does not return a new array (returns undefined). Often used for console or updating external state . filter() iterates over an array and returns a new array with only the elements that pass the condition. does not modify the original array. It is used for getting a subset of data.

#### 3) What are arrow functions in ES6?

Answer: Arrow functions are a short way to write functions. They don’t have their own “this” keyword. So this is lexically inherited from the surrounding scope. also cannot be used in constructors, as the “new” keyword won’t work. Don't have an arguments object. A rest parameter is used instead.

#### 4) How does destructuring assignment work in ES6?

Answer: Destructuring allows unpacking elements or values from arrays or properties from objects into distinct variables. We can unpack array elements based on their position.

example:

const [a, b] = [15, 20]; here a = 15, b =20

Skipping element: const [a, ,b] = [1, 2,3] , here a = 1, b=3

rest: const [a ,...b] = [15,20,30]  , here a = 15, b = [20,30]

We can get properties from an object and assign them to same-named variables.

Example:

const {name, price} = {name:’alu’ , price:25} , here name = ’alu’ , price=25

Rename variable: const {name:product} = {name:’alu’ , price:25}, here product = ’alu’

Default values: const {name=”alu” :product} = { price:25}, here name = “alu”, price=25

Default values with renaming:const { name: product = "alu", price = 35 } = { price: 25 } , here product= ’alu’ , price=25

#### 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals, or template strings, use backticks instead of quotes which are used in string concatenation.

can do multi-line strings without \n, and expressions can be embedded by ${expression}.

example:

using string concatenation:

const name = “fahad”

console.log(”hello “+name), output: hello fahad

using template literal:

const name = “fahad”

console.log(`hello ${name}`), output: hello fahad
