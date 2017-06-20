<template>
  <div class="cartcontrol">
    <transition>
      <div class="cart-decrease"
           v-show="food.count>0"
           @click="decreaseCart($event)">
        <span class="inner inner1 icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div
      class="cart-add icon-add_circle"
      @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart($event) {
        // 阻止pc端默认事件触发
        if (!$event._constructed) {
          return;
        }
        if (!this.food.count) {
          /* 当我们利用对象的动态特性给对象挂载不存在的字段的时候,对象属性发送变化,
           vue是监测不到的,所以我们得使用vue.set方法 */
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$bus.emit('add', event.target);
        // 把点击+号的事件源传入父组件
        this.$emit('event', event.target);
      },
      decreaseCart($event) {
        // 阻止pc端默认事件触发
        if (!$event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
      &.v-enter-active, &.v-leave-active
        transition: all 0.4s linear
      &.v-enter, &.v-leave-active //刚进入和离开后的状态
        opacity: 0
        transform: translateX(24px)
        .inner1
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 14px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
