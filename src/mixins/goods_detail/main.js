import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        // 商品id
        goods_id: '',
        //商品详情数据
        goodsInfo: {},
        addressStr: null
    }
    onLoad(options) {
        this.goods_id = options.goods_id
        this.getDetailGoods()
    }
    methods = {}

    async getDetailGoods() {
        const { data: res } = await wepy.get('/goods/detail', {
            goods_id: this.goods_id
        })
        if (res.meta.status !== 200) return wepy.baseToast()
        this.goodsInfo = res.message
        console.log(this.goodsInfo);
        console.log('请求成功');
        
    }
}