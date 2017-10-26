<template>
    <div class="tmpl">
        <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>

        <!-- 1.0 顶部（分类，轮播，推荐） -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="(item,index) in ginfo.catelist" :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span v-text="item.title"></span>
                                        <p>
                                            <span v-for="subitem in item.subcates">{{subitem.title}} &nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <!-- 一级分类 -->
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <!-- 子分类 -->
                                            <dd>
                                                <a v-for="subitem in item.subcates" href="/goods/43.html">
                                                    {{subitem.title}}
                                                </a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <!-- 利用elementUI的走马灯组件进行替换 -->
                                <el-carousel :interval="5000" arrow="always">
                                    <!-- el-carousel-item 代表每一页 -->
                                    <el-carousel-item v-for="item in ginfo.sliderlist" :key="item.id">
                                        <img height="343" :src="item.img_url" alt="">
                                        <h3>{{ item.title }}</h3>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in ginfo.toplist" :key="index">
                                <div class="img-box">
                                    <label>{{index + 1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">
                                        {{item.title}}
                                    </a>
                                    <span>{{item.add_time | datefmt('YYYY-MM-DD') }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>


        <!-- 2.0 分类商品列表 -->
        <div class="section">
            <div v-for="(item,index) in clist" :key="index">
            <!--子类-->
            <div class="main-tit">
                <h2 v-text="item.catetitle"></h2>
                <p>
                    <a v-for="subitem in item.level2catelist" :key="subitem.subcateid" 
                    href="/goods/43.html">{{subitem.subcatetitle}}</a>                  

                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">

                        <li v-for="item in item.datas" :key="item.artID">
                            <a href="/goods/show-91.html">
                                <div class="img-box">
                                <router-link v-bind="{to:'/site/goodsinfo/'+item.artID}">
                                    <img :src="item.img_url">
                                </router-link>
                                </div>
                                <div class="info">
                                    <h3 v-text="item.artTitle"></h3>
                                    <p class="price">
                                        <b>¥{{item.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s v-text="item.market_price"></s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 定义一个对象 ginfo 用来存储接口：/site/goods/gettopdata/goods返回的message对象
                ginfo: {},
                clist:[]  // 用来存储接口site/goods/getgoodsgroup 中返回的messsage数据
            }
        },
        created() {
            this.getginfo();
            this.getclist();
        },
        methods: {
            // 获取商品的数据
            getginfo() {
                this.$http.get('/site/goods/gettopdata/goods').then(res => {
                    // 判断状态提示

                    // 赋值
                    this.ginfo = res.data.message;
                });
            },

            getclist(){
                this.$http.get('/site/goods/getgoodsgroup')
                .then(res=>{
                    this.clist = res.data.message;
                });
            }
        }
    }
</script>

<style>
    /* 修改轮播的高度 */

    .el-carousel__container {
        height: 343px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 50px;
        margin: 0;
    }
</style>