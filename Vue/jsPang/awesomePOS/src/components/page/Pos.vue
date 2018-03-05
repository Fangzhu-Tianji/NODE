<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" class="pos_order" id="order_list">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="点餐" name="first">
                        <el-table :data="tableData" border style="width:100%;" v-if="activeName === 'first'">
                            <el-table-column prop="goodsName" label="商品"></el-table-column>
                            <el-table-column prop="count" label="数量" width="70"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                            <el-table-column label="操作" width="100" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="order_info">
                            <span class="small">数量：</span>{{totalCount}}&nbsp;&nbsp;&nbsp;&nbsp;<span class="small">价格：</span>{{totalMoney}}
                        </div>
                        <div class="order_btn">
                            <el-button type="warning" @click="putList">挂单</el-button>
                            <el-button type="danger" @click="delAllGoods">删除</el-button>
                            <el-button type="success" @click="checkout">结账</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="挂单" name="second">
                        <el-table :data="tableGua" border style="width:100%;" v-if="activeName === 'second'">
                            <el-table-column prop="goodsName" label="商品"></el-table-column>
                            <el-table-column prop="count" label="数量" width="70"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="外卖" name="third">
                        <el-table :data="tableWai" border style="width:100%;" v-if="activeName === 'third'">
                            <el-table-column prop="goodsName" label="商品"></el-table-column>
                            <el-table-column prop="count" label="数量" width="70"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="17">
                <div class="often_goods">
                    <h2 class="title">常用商品</h2>
                    <div class="often_wrap">
                        <ul class="clearfix">
                            <li class="list" v-for="goods in oftenGoods" :key="goods.id" @click="addOrderList(goods)">
                                <span>{{goods.goodsName}}</span>
                                <span class="price">￥{{goods.price}}元</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="goods_type">
                    <el-tabs>
                        <el-tab-pane label="汉堡">
                            <ul class="wrap clearfix">
                                <li class="list" v-for="food in type0Goods" :key="food.id" @click="addOrderList(food)">
                                    <span class="food_img">
                                        <img :src="food.goodsImg" alt="" width="100%">
                                    </span>
                                    <div class="info">
                                        <span class="food_name">{{food.goodsName}}</span>
                                        <span class="food_price">￥{{food.price}}元</span>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="小食">
                            <ul class="wrap clearfix">
                                <li class="list" v-for="food in type1Goods" :key="food.id" @click="addOrderList(food)">
                                    <span class="food_img">
                                        <img :src="food.goodsImg" alt="" width="100%">
                                    </span>
                                    <div class="info">
                                        <span class="food_name">{{food.goodsName}}</span>
                                        <span class="food_price">￥{{food.price}}元</span>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="饮料">
                            <ul class="wrap clearfix">
                                <li class="list" v-for="food in type2Goods" :key="food.id" @click="addOrderList(food)">
                                    <span class="food_img">
                                        <img :src="food.goodsImg" alt="" width="100%">
                                    </span>
                                    <div class="info">
                                        <span class="food_name">{{food.goodsName}}</span>
                                        <span class="food_price">￥{{food.price}}元</span>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="套餐">
                            <ul class="wrap clearfix">
                                <li class="list" v-for="food in type3Goods" :key="food.id" @click="addOrderList(food)">
                                    <span class="food_img">
                                        <img :src="food.goodsImg" alt="" width="100%">
                                    </span>
                                    <div class="info">
                                        <span class="food_name">{{food.goodsName}}</span>
                                        <span class="food_price">￥{{food.price}}元</span>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Pos',
    data () {
        return {
            activeName: 'first',
            totalCount: 2,
            totalMoney: 25,
            tableData: [{
                goodsName: '可乐大杯',
                price: 7,
                count: 1,
                goodsId: 7
            },
            {
                goodsName: '香辣鸡腿堡',
                price: 18,
                count: 1,
                goodsId: 1
            }],
            tableGua: [],
            tableWai: [{
                goodsName: '可乐大杯',
                price: 7,
                count: 1,
                goodsId: 7
            },
            {
                goodsName: '香辣鸡腿堡',
                price: 18,
                count: 1,
                goodsId: 1
            }],
            oftenGoods:[],
            type0Goods:[],
            type1Goods:[],
            type2Goods:[],
            type3Goods:[],
            oftenGoodsJson: [{"goodsId":1,"goodsName":"香辣鸡腿堡","price":18},{"goodsId":2,"goodsName":"田园鸡腿堡","price":15},{"goodsId":3,"goodsName":"和风汉堡","price":15},{"goodsId":4,"goodsName":"大包薯条","price":18},{"goodsId":5,"goodsName":"脆皮炸鸡腿","price":20},{"goodsId":6,"goodsName":"魔法鸡块","price":20},{"goodsId":7,"goodsName":"可乐大杯","price":10},{"goodsId":8,"goodsName":"雪顶咖啡","price":18},{"goodsId":9,"goodsName":"儿童欢乐套餐","price":25},{"goodsId":10,"goodsName":"快乐全家桶","price":99}],
            typeGoodsJosn: [[{"goodsId":1,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg","goodsName":"香辣鸡腿堡","price":18},{"goodsId":2,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg","goodsName":"田园鸡腿堡","price":15},{"goodsId":3,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg","goodsName":"和风汉堡","price":15}],[{"goodsId":4,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg","goodsName":"大包薯条","price":18},{"goodsId":5,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg","goodsName":"脆皮炸鸡腿","price":20},{"goodsId":6,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg","goodsName":"魔法鸡块","price":20}],[{"goodsId":7,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg","goodsName":"可乐大杯","price":10},{"goodsId":8,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg","goodsName":"雪顶咖啡","price":18}],[{"goodsId":9,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg","goodsName":"儿童欢乐套餐","price":25},{"goodsId":10,"goodsImg":"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg","goodsName":"快乐全家桶","price":99}]]
        }
    },
    created ()  {
        // axios请求数据
        // axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        // .then(response => {
        //     this.oftenGoods = response.data;
        // })
        // .catch(error => {
        //     console.log(error);
        // });
        // axios.get('http://jspang.com/DemoApi/typeGoods.php')
        // .then(response => {
        //     this.type0Goods = response.data[0];
        //     this.type1Goods = response.data[1];
        //     this.type2Goods = response.data[2];
        //     this.type3Goods = response.data[3];
        // })
        // .catch(error => {
        //     console.log(error);
        // });
        this.oftenGoods = this.oftenGoodsJson;
        this.type0Goods = this.typeGoodsJosn[0];
        this.type1Goods = this.typeGoodsJosn[1];
        this.type2Goods = this.typeGoodsJosn[2];
        this.type3Goods = this.typeGoodsJosn[3];
        if(localStorage.getItem('putList')) {
            this.tableGua = JSON.parse(localStorage.getItem('putList'));
        }
    },
    mounted: () => {
        var orderHeight = document.body.clientHeight;
        document.getElementById('order_list').style.height = orderHeight + 'px';
    },
    methods: {
        handleClick (tab, event) {
            // console.log(tab);
            // console.log(event);
            this.activeName = tab.name;
        },
        //添加订单列表的方法
        addOrderList (goods) {
            console.log(goods)
            //判断是否这个商品已经存在于订单列表
            let isHave = false;
            for (let i=0; i<this.tableData.length; i++) {
                if(this.tableData[i].goodsId == goods.goodsId) {
                    isHave = true;
                }
            }
            if(isHave) {
                let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
                arr[0].count++;
            }
            else {
                let newGoods = {
                    goodsName: goods.goodsName,
                    price: goods.price,
                    goodsId: goods.goodsId,
                    count: 1
                }
                this.tableData.push(newGoods);
            }
            this.getAllMoney();
        },
        //删除单个列表
        delSingleGoods (goods) {
            this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
            this.getAllMoney();
        },
        //删除全部列表
        delAllGoods () {
            this.tableData = [];
            this.totalCount = 0;
            this.totalMoney = 0;
        },
        //模拟结账
        checkout () {
            if(this.totalCount != 0) {
                this.tableData = [];
                this.totalCount = 0;
                this.totalMoney = 0;
                this.$message({
                    message: '结账成功',
                    type: 'success'
                })
            }
            else {
                this.$message.error('不能空结')
            }
        },
        //挂单
        putList () {
            if(this.tableData.length != 0) {
                localStorage.removeItem('putList');
                localStorage.setItem('putList',JSON.stringify(this.tableData));
                this.tableGua = JSON.parse(localStorage.getItem('putList'));
                this.$message.success('挂单成功')
            }
            else {
                this.$message.error('无商品信息，不能挂单')
            }
        },
        //提取公共的数量与金额
        getAllMoney () {
            this.totalCount = 0;
            this.totalMoney = 0;
            if(this.tableData.length != 0) {
                this.tableData.forEach(element => {
                    this.totalCount += element.count;
                    this.totalMoney = this.totalMoney + (element.count*element.price);
                });
            }
        }
    }
}
</script>

<style scoped>
.pos_order {
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda;
}
.order_btn {
    text-align: center;
}
.order_info {
    margin: 15px 0;
    text-align: center;
    font-size: 16px;
    color: crimson;
}
.order_info .small {
    font-size: 14px;
    color: #666;
}
.often_goods .title {
    font-size: 16px;
    height: 40px;
    line-height: 20px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
    margin: 0;
}
.often_goods .often_wrap {
    padding: 10px 50px;
}
.often_goods .often_wrap .list {
    list-style: none;
    float: left;
    border: 1px solid #e5e9f2;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    cursor: pointer;
}
.often_goods .often_wrap .list .price {
    color: #58b7ff;
}
.goods_type .wrap {
    padding: 10px 50px;
}
.goods_type .list {
    float: left;
    width: 23%;
    border: 1px solid #e5e9f2;
    height: auto;
    overflow: hidden;
    background-color: #fff;
    padding: 10px;
    margin: 2px;
    cursor: pointer;
}
.goods_type .list .info {
    float: left;
    padding-left: 10px;
}
.goods_type .list span {
    display: block;
}
.goods_type .list .food_img {
    float: left;
    width: 40%;
}
.goods_type .list .food_name {
    font-size: 18px;
    color: brown;
}
.goods_type .list .food_price {
    font-size: 16px;
    padding-top: 10px;
}
</style>
<style>
.pos_order .el-tabs__nav-wrap {
    padding-left: 14px;
}
.goods_type .el-tabs__nav-wrap {
    padding-left: 14px;
}
</style>



