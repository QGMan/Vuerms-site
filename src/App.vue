<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">        
        <!-- 使用elementUI中的一个button -->
        <!-- <el-button type="success">成功按钮</el-button> -->
        <router-view></router-view>
    </div>
</template>

<script>
// es6的export default{ 写法等同于 module.exports={
export default{
    // es6的写法 data() 等同于es5的 data:function()
    data(){
        return{
            name:'heima'
        }
    },methods:{

    }
}
</script>

<style>
    
</style>