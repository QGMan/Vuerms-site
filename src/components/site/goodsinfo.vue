<template>
    <div class="tmpl">
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section" v-if="ginfo.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                    <div class="magnifier" id="magnifier1">
                                            <div class="magnifier-container">
                                                <div class="images-cover"></div>
                                                <!--当前图片显示容器-->
                                                <div class="move-view"></div>
                                                <!--跟随鼠标移动的盒子-->
                                            </div>
                                            <div class="magnifier-assembly">
                                                <div class="magnifier-btn">
                                                    <span class="magnifier-btn-left">&lt;</span>
                                                    <span class="magnifier-btn-right">&gt;</span>
                                                </div>
                                                <!--按钮组-->
                                                <div class="magnifier-line">
                                                    <ul class="clearfix animation03">
                                                        <li v-for="item in ginfo.imglist" :key="item.id">
                                                            <div class="small-img">
                                                                <img :src="item.original_path" />
                                                            </div>
                                                        </li>
                                                                                                          
                                                    </ul>
                                                </div>
                                                <!--缩略图-->
                                            </div>
                                            <div class="magnifier-view"></div>
                                            <!--经过放大的图片显示容器-->
                                        </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1 v-text="ginfo.goodsinfo.title"></h1>
                                <p class="subtitle" v-text="ginfo.goodsinfo.sub_title"></p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo" v-text="ginfo.goodsinfo.goods_no"></dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ginfo.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{ginfo.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <!-- 添加物品功能 -->
                                            <div class="stock-box">
                                                <!-- 可最多或最好限制 -->
                                                <el-input-number v-model="buyCount"  :min="1" :max="ginfo.goodsinfo.stock_quantity">
                                                </el-input-number>
                                            </div>

                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{ginfo.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button class="add" @click="addCar">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a v-bind="{class: isContent?'selected':''}" href="javascript:;" @click="changeIsContent(true)" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a v-bind="{class: !isContent?'selected':''}" href="javascript:;" @click="changeIsContent(false)">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                        </Affix>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" v-if="isContent">
                                <!-- 展示商品内容 -->
                                <span v-html="ginfo.goodsinfo.content"></span>
                            </div>

                            <div class="tab-content" v-if="!isContent">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" 
                                                nullmsg="请填写评论内容！" v-model="txtContent"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input type="button" value="提交评论" class="submit" @click="submitComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">
                                            暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span v-text="item.user_name"></span>
                                                    <span>{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p v-text="item.content"></p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                            <el-pagination
                                            @size-change="pageSizeChange"
                                            @current-change="pageIndexChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[1,10, 20, 30, 50]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalCount">
                                          </el-pagination>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in ginfo.hotgoodslist">
                                        <div class="img-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                  {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | datefmt('YYYY-MM-DD')}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 按需导入iview这个框架中的affix组件
import Affix from 'iview/src/components/affix';

import {key,vm} from "../../kits/vm.js";


// 导入jquery插件文件
import '../../../statics/site/js/jqplugins/imgzoom/magnifier.js';

import {setItem} from "../../kits/localStorage.js";


    export default {
        components:{
            Affix // 将Affix组件注册到goodsinfo.vue的私有组件中
        },
        data() {
            return {
                buyCount:1,
                // 控制商品详情和评论的两个tab标签的背景色
                isContent:true,             
                txtContent:'', //评论内容
                pageIndex:1,
                pageSize:1,
                totalCount:0,
                commentList:[], //负责存储服务器返回的评论数据 
                // 定义ginfo存储的时候 /site/goods/getgoodsinfo/:goodsid返回来的message数据
                ginfo:{}
            }
        },
        created(){
            this.getgInfo();

            // 调用获取评论数据
            this.getCommentList();
               //页面创建时触发一次localstorage  vuex 事件
        
        },
        watch:{
            // 当url的参数的发生改变的时候，会触发这个watch的重新执行
            '$route':function(){
                // 当触发了这个方法就重新获取到最新的数据
                this.getgInfo();
            }
        },
        methods: { 
            addCar(){
                // vm.$emit(key,this.buyCount)
                // this.buyCount+=buyCount;

                //触发vuex 事件
                this.$store.dispatch("changebuyCount",this.buyCount);

                setItem({gid:this.$route.params.goodsid,bcount:this.buyCount})

            },
            // 当用户点击分页组件中的分页页码的时候触发
            pageIndexChange(val){
                // val 代表当前用户选择的页码
                this.pageIndex = val;

                // 重新获取数据
                this.getCommentList();
            },
            // 当用户选择分页组件中的页容量时候触发
            pageSizeChange(val){
                // val代表当前用户选择的页容量数值
                this.pageSize = val;

                 // 重新获取数据
                 this.getCommentList();
            },
            // 分页获取当前商品的评论数据
            getCommentList(){
                var goodsid = this.$route.params.goodsid;
                this.$http.get('/site/comment/getbypage/goods/'+goodsid+'?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize)
                .then(res=>{
                    // 商品评论数据数组赋值
                    this.commentList = res.data.message;

                    // 分页组件的总条数变量赋值
                    this.totalCount = res.data.totalcount;
                });
            },
            // 提交评论
            submitComment(){
                // 1.0 判断如果文本框中没值，提醒用户
                if(this.txtContent.length<=0){
                    this.$message.error('评论信息必须填写');
                    return;
                }

                // 2.0 将this.txtContent提交到接口： /site/validate/comment/post/goods/:goodsid
                var goodsid = this.$route.params.goodsid;
                this.$http.post('/site/validate/comment/post/goods/'+goodsid,"commenttxt="+this.txtContent)
                .then(res=>{
                    // 3.0 清空文本框信息
                    this.txtContent = ''; 
                    // 4.0 刷新当前商品的评论数据即可
                    this.getCommentList();
                });
            },
            // 控制tab的切换
            changeIsContent(iscontent){
                this.isContent = iscontent;
            },
            getgInfo(){
                // 获取到url传入的商品id
                var goodsid = this.$route.params.goodsid;
                // 请求当前商品的详细数据,其中包括：goodsinfo：代表商品的标题，图文信息，价格等内容
                // imgList: 当前商品的相册图片数组
                // hotgoodslist:代表推荐的商品数据
                this.$http.get('/site/goods/getgoodsinfo/'+goodsid)
                .then(res=>{
                    this.ginfo = res.data.message;

                    // 等图片数据加载回来以后再去执行插件的初始化操作
                    setTimeout(()=>{
                     $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
                 },100);
                });
            }
        }
    }
</script>
<style scoped>
    /* 导入jquery组件的css样式 */
    @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
</style>