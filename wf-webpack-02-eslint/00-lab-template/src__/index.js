// Test Babel (stage 4) using Object spread
  const b = {one: 1, two:2}
  const o = {...b}
  console.log(o) // > {one: 1, two:2}


// Test Babel Polyfill
  const includeTwo = [1,2,3].includes(2)
  console.log(includeTwo) // > true


// Test Babel @babel/plugin-proposal-class-properties
  class Bork {
    //Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    };

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    };
  }

  let myBork = new Bork;

  //Property initializers are not on the prototype.
  console.log(myBork.__proto__.boundFunction); // > undefined

  //Bound functions are bound to the class instance.
  console.log(myBork.boundFunction.call(undefined)); // > "bork"

  //Static function exists on the class.
  console.log(Bork.staticFunction()); // > "babelIsCool"


// Test React
  import './react-app';;
