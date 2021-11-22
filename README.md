# Decimal & binary calculator
Decimal and binary calculator created in typescript by using object oriented programing. Available at https://romantic-yalow-48a510.netlify.app
## Technology 
* HTML
* Webpack
* Typescript
* Sass
## How it works ?
Deciaml calculator and binary are extending abstract class `Calc`


## `Calc (Abstract class)`
Abstract Class which is responsible for main logic behind calculator
### ***Constructor***
* `calcContainer` - container with calculator, needed his childs (boxes with values in  `update()` in order to update calc summary values) and apply event by which user can change arrays with numbers - `TopRowNumberArray` and `BotRowNumberArray` (`init()` method)
* `resultNumberArray` - array with numbers that are calculated by adding numbers with the same index from two arrays - `TopRowNumberArray` and `BotRowNumberArray`. Base on this array in `update()` method the result in calc (blue boxes) will be dispalyed. 
* `TopRowNumberArray` and `BotRowNumberArray` - arrays with numbers, which are holding numbers entered by user 
### ***Methods***
* **Abstract** `changeNumber()` - changing number, this method is running always when user click on value box.
* **Abstract** `addNumber()` - adding numbers in two arrays
* `update()` - method that is displaying result in calculator (blue boxes), go through the whole array and putting values into corresponding places in results (blue boxes)
* `check()` - this method create two arrays (firstNumberArray and secondNumberArray),
     at the end it will create third array (resultNumberArray) by adding two previous arrays(firstNumberArray and secondNumberArray)
* `init()` - initialization of calculator - add click event on calculator container in order to change resultNumberArra    

## `BinaryCalc (Extends Calc class)`
Class for binary calculator 
### ***Methods***
* `addNumber()` - this method is adding numbers from two rows in calculator with the same index, at the end this method is returning array final values.
* `changeNumber()` - displaying specific value in specific field (blue box) in calculator
## `DecimalCalc (Extends Calc class)`
Class for decimal calculator
### ***Methods***
* `showTooltip()` - display tool tip container with specific text
* `hideTooltip()` - remove above tooltip
* `changeNumber()` - set content editable on selected field (red) in calculatr in order to allow user to change number
* `addNumber()` - calculating summary array which is the result of adding the numbers from two arrays
* `check()` - check if the values entered by the user are numbers
* `init()` - initialization, add click event on calc operator with callback function in order display result of entered numbers 
## Project scripts
### ***Install dependencies by `npm i`***
### Production Build - `npm run build`
### Dev Build - `npm run build-dev`
### Dev Build with file changes listener - `npm run watch`
### Dev server on port 3001 - `npm start`
