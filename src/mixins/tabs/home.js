import wepy from 'wepy'
import BaseAPI from '../../baseAPI';
import baseURL from '../../baseAPI';

export default class extends wepy.mixin {
    config = {
        navigationBarTitleText: 'myugo'
    }

    data = {
        floorData: [],

        // 自动切换时间间隔
        interval: 1000,
        // 是否自动播放
        autoplay: true,
        //是否显示小圆点
        indicatorDots: true,
        //轮播图的数据
        focusLists: []
    }

    methods = {
        goGoodsList() { }
    }


    onLoad() {
        //获取首页轮播图数据
        this.getFocusData()
        this.getFloorData()
    }

    //请求首页轮播图数据的函数
    async getFocusData() {
        const { data: res } = await wepy.get('/home/swiperdata')
        if (res.meta.status !== 200) return wepy.baseToast()

        //将请求成功的数据保存到data的focusLists中
        this.focusLists = res.message
        // 调用apply方法刷新ui
        this.$apply()
    }
    async getFloorData() {
        const { data: res } = await wepy.get('/home/floordata')
        if (res.meta.status !== 200) return wepy.baseToast()

        //将请求成功的数据保存到data的floorData中
        this.floorData = res.message
        console.log(this.floorData)
        // 调用apply方法刷新ui
        this.$apply()
    }

}