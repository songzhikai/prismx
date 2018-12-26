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
  },
  /**
   * 寄生式继承
   */
  inheritObject(){

    function superclass(name){
      this.name = name
      this.colors = ['red', 'blue', 'green']
    }
    superclass.prototype.getName = function(){
      console.log(this.name)
    }

    function subclass(name, time){
      //构造函数式继承
      superclass.call(this, name)
      this.time = time
    }

    inheritPrototype(subclass, superclass)
    subclass.prototype.getTime = function(){
      console.log(this.time);
    }

    function inheritPrototype(subclass, superclass){
      //复制一份父类的原型副本保存在变量中
      let p = inheritObject(superclass.prototype)
      //修正因为重写自雷导致自雷的constructor属性被修改
      p.constructor = subclass
      //设置子类的原型
      subclass.prototype = p
    }

    function inheritObject(obj){
      //声明一个过渡对象
      function F(){}
      F.prototype = obj
      return new F();
    }

    //测试方法
    var ins1 = new subclass('js book', 2013)
    ins1.colors.push('black')
    var ins2 = new subclass('css book', 2014)
    console.log('ins2.colors', ins2.colors)
    console.log('ins1.getName()', ins1.getName())
    console.log('ins2.getTime()', ins2.getTime())

  },
  getWoman(){
    function People(){
      this.type='人'
      this.colors = ['red', 'green']
    }

    People.prototype.changeColor=function(color){
      this.colors.push(color)
    }
    People.prototype.showType=function(){
      alert(this.type);
    }
    function Woman(){
      this.sex='女';
      this.age=34;
      // this.type='女生';//如果这里定义了type属性，就不会层级查找，最后在People找到该属性
    }
    function Man(){

    }
    Woman.prototype=new People();
    Man.prototype=new People();
    var w=new Woman();
    w.changeColor('yellow')
    var man=new Man();
    console.log('大家好,我的种类是:'+w.colors+",我的年龄是:"+w.age+",我的性别是:"+w.sex);
    console.log('大家好,我的种类是:'+man.colors);
//输出结果:
//大家好，我的种类是：女生，我的年龄是:34，我的性格是:女
  },
  newWriteFunc(){
    //采用基于委托的写法
    var superObj={
      init:function(name){
        this.name=name;
      },
      getName:function(){
        return this.name;
      }
    };
    var subObj=Object.create(superObj);
    subObj.setup=function(name,age){
      this.init(name);
      this.age=age;
    };
    subObj.sayHello=function(){
      return 'hello '+this.name;
    };
    subObj.getAge=function(){
      return this.age;
    };
    var b1=Object.create(subObj);
    b1.setup('bobo',28);
    console.log(b1.sayHello()); //hello bobo
    console.log(b1.getAge()); //28

    var b2=Object.create(subObj);
    b2.setup('leishao',27);
    console.log(b2.sayHello()); //hello leishao
    console.log(b2.getAge()); //27

  }
}

export default Util
