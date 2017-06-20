<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasser" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasser() {
        let result = []; // 最终所有星星存放的数组
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0; // 小数
        let integer = Math.floor(score); // 整数
        for (let i = 0; i < integer; i++) { // 全心
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);  // 半心
        }
        while (result.length < LENGTH) {  // 补齐空心
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./star.styl"
</style>
