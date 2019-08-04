import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        // 商品数据列表
        goodsLists: [],
        total: '',
        pagesize: 10,
        pagenum: 1,
        // 商品分类ID
        cid: '',
        // 查询关键字
        query: ''
    }

    //页面首次加载
    onLoad(options) {
        this.query = options.query || '',
            this.cid = options.cid || '',
            this.pagenum = options.pagenum || 1,
            this.pagesize = options.pagesize || 10,
            // 调用方法，请求商品列表接口
            this.getGoodsLists()
    }

    methods = {
        // 点击商品项跳转详情页
        goGoodsDetail(goodsId) {
            wepy.navigateTo({
                url: './goods_detail/main?goods_id=' + goodsId
            })
        }
    }

    async getGoodsLists(cb) {
        const { data: res } = await wepy.get('/goods/search', {
            query: this.query,
            cid: this.cid,
            pagenum: this.pagenum,
            pagesize: this.pagesize
        })
        if (res.meta.status !== 200) return wepy.baseToast()
        this.total = res.message.total
        this.goodsLists = [...this.goodsLists, ...res.message.goods]
        this.$apply()
        cb && cb()
    }

    //下拉刷新
    onPullDownRefresh() {
        this.total = 0,
            this.pagenum = 1,
            this.goodsLists = [],
            this.getGoodsLists(() => {
                wepy.stopPullDownRefresh()
            })
        this.$apply()
    }

    //上拉加载
    onReachBottom() {
        if (this.pagenum * this.pagesize >= this.total) return
        this.pagenum++;
        this.getGoodsLists()
    }

}