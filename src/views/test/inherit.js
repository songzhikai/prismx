const Util = {
  getCar(){
    function Vehicle(make){
      this.make = make
    }

    Vehicle.prototype.Make = function(){
      console.log('my name is '+this.make);
    }

    let vehicle = new Vehicle('vehicle')
    vehicle.Make()

    function Car(make){
      Vehicle.call(this, make)
    }
    Car.prototype = new Vehicle()
    let car = new Car('car')
    car.Make()

  },
  getPerson(){
    //父类 Person
    function Person() {
      this.sayName = function() {
        return this.name;
      }
    }

    //子类 Chinese
    function Chinese(name) {
      //借助 call 实现继承
      Person.apply(this);
      this.name = name;

      this.ch = function() {
        alert('我是中国人');
      }
    }

    //子类 America
    function America(name) {
      //借助 call 实现继承
      Person.apply(this);
      this.name = name;

      this.am = function() {
        alert('我是美国人');
      }
    }


    //测试
    var chinese = new Chinese('成龙');
    //调用 父类方法
    console.log(chinese.sayName());   //输出 成龙

    var america = new America('America');
    //调用 父类方法
    // america.am();
    console.log(america.sayName());   //输出 America
  }
}

export default Util
