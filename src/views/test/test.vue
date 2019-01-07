<template>
  <div id="container">

  </div>
</template>

<script>
    export default {
      name: "test",
      data(){
        return {

        }
      },
      methods:{
        getStyle(){
          let type = 5;
          let para = 3;
          (function(type, para){
            if(type == null){
              type = '0'
            }
            let div = document.createElement('div')
            div.innerHTML = type
            document.getElementById('container').appendChild(div)
          })(444, 4)
        },
        /**
         * 工厂方法
         * @param type
         * @param content
         */
        factoryFunc(type, content){
          var Factory = function(type, content){
            if(!( this instanceof Factory )) {
              return new Factory(type, content)
            }else{
              if(this instanceof Factory){
                console.log('this instanceof Factory');
              }
              if(Factory.isPrototypeOf(this)){
                console.log('this isPrototypeOf Factory');
              }
              if(Factory === this){
                console.log('this');
              }

              let s = new this[type](content) //this 为factory实例 ; this[type]为java方法 ; new java(content)
              return s
            }
          }
          Factory.prototype = {
            java(content){
              this.content = content;
              (function(content){
                let div = document.createElement('div')
                div.innerHTML = content
                document.getElementById('container').appendChild(div)
              })(content)
              this.content = content
            },
            javascript(content){
              this.content = content
              ;(function(content){
                let div = document.createElement('div')
                div.innerHTML = content
                document.getElementById('container').appendChild(div)
              })(content)
            },
            ui(content){
              this.content = content
              ;(function(content){
                let div = document.createElement('div')
                div.innerHTML = content
                document.getElementById('container').appendChild(div)
              })(content);
            }
          }
          Factory(type, content)

        },
        testForEach(){
          var arr = [{id: '1', value: '111'}, {id: '2', value: '222'}, {id: '3', value: '333'}]
          arr.forEach(item => {
            if(item.id == 3){
              item.value= '4444'
            }
          })
          let div = document.createElement('div')
          div.innerHTML = JSON.stringify(arr)
          document.getElementById('container').appendChild(div)
        }
      },
      mounted(){
        this.testForEach();
      }
    }
</script>

<style scoped>

</style>
