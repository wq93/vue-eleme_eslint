<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}元</span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}元</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="changeFavorite">
          <i
            class="icon-favorite"
            :class="{'active':favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li
              class="pic-item"
              v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  // 获取缓存没有写
  // import {saveToLocal, loadFromLocal} from 'common/js/store';
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  export default {
    // props传递数据出错 暂时用data代替
    data() {
      return {
        seller: {
          'name': '粥品香坊（回龙观）',
          'description': '蜂鸟专送',
          'deliveryTime': 38,
          'score': 4.2,
          'serviceScore': 4.1,
          'foodScore': 4.3,
          'rankRate': 69.2,
          'minPrice': 20,
          'deliveryPrice': 4,
          'ratingCount': 24,
          'sellCount': 90,
          'bulletin': '粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。',
          'supports': [
            {
              'type': 0,
              'description': '在线支付满28减5'
            },
            {
              'type': 1,
              'description': 'VC无限橙果汁全场8折'
            },
            {
              'type': 2,
              'description': '单人精彩套餐'
            },
            {
              'type': 3,
              'description': '该商家支持发票,请下单写好发票抬头'
            },
            {
              'type': 4,
              'description': '已加入“外卖保”计划,食品安全保障'
            }
          ],
          'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
          'pics': [
            'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180'
          ],
          'infos': [
            '该商家支持发票,请下单写好发票抬头',
            '品类:其他菜系,包子粥店',
            '北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340',
            '营业时间:10:00-20:30'
          ]
        },
        favorite: false
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      // watch监听seller这个数据，一旦seller数据发生变化，就立即调用seller内部定义的方法，
      // 这里是this._initScroll()和this._initPics()
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      // 当我们来回切换goods,ratings,seller模块时,BScoll的执行顺序是:
      // 最开始执行mounted周期,创建this.scroll对象,高度并没有被计算正确
      // 紧接着会执行到watch调用方法走else重新计算高度
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120; // 每个图片的宽度
          let margin = 6; // 每个图片的margin
          let width = (picWidth + margin) * this.seller.pics.length - margin; // 这一列图片的宽度
          this.$refs.picList.style.width = width + 'px'; // 设置一列图片的宽度
          this.$nextTick(() => {
            if (!this.picScroll) { // this.$refs.picWrapper固定宽度的父盒子
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true, // 横向滚动
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      changeFavorite() {
        this.favorite = !this.favorite;
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .desc
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .star
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .text
          display: inline-block
          margin-right: 12px
          line-height: 18px
          vertical-align: top
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
      .favorite
        position: absolute
        width: 50px
        right: 11px
        top: 18px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
      .supports
        .support-item
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          &:last-child
            border-none()
        .icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .info
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        line-height: 14px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 14px
      .info-item
        padding: 16px 12px
        line-height: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
        &:last-child
          border-none()
</style>
