import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        //搜索内容
        queryContent: [],
        //输入内容
        value: '',
        // 查询建议数据
        suggestLists: []
    }

    computed = {
        //判断展示搜索历史还是建议列表
        isShowHistroy() {
            return this.value.length <= 0 ? true : false
        }
    }

    methods = {
        //清除搜索历史
        clearHistory() {
            wepy.setStorageSync('searchHistory', [])
            this.queryContent = []
        },

        // 搜索建议列表的详情页
        goGoodsDetail(goodsId) {
            // 编程式导航跳转页面
            wepy.navigateTo({
                url: '../goods_detail/main?goods_id=' + goodsId
            })
        },
        //搜索关键词发生改变时触发
        onChange(e) {
            this.value = e.detail
            if (e.detail.trim().length <= 0) {
                this.suggestLists = []
                return
            }
            // 调用获取建议列表方法发送请求
            this.getSuggestLists(e.detail)
        },
        onSearch(e) {
            if (e.detail.trim().length <= 0) return
            // 搜索后，将搜索内容保存到storage缓存里
            if (this.queryContent.length >= 10) {
                // 在搜索记录条数超过10条时，只保留10条
                this.queryContent = this.queryContent.slice(0, 9)
            }
            // 如果当前搜索内容和历史记录中有重复时，则不添加到记录中去
            let serachId = this.queryContent.indexOf(e.detail)
            if (serachId == -1) {
                this.queryContent.unshift(e.detail)
            } else {
                //如果已存在，则将该条记录提前
                this.queryContent.splice(serachId, 1)
                this.queryContent.unshift(e.detail)
            }
            wepy.setStorage({
                key: 'searchHistory',
                data: JSON.stringify(this.queryContent)
            })
            //编程导航 跳转到商品列表页并将查询内容query传递到商品列表页
            wepy.navigateTo({
                url: '../goods_list?query=' + e.detail
            })
        },
        onCancel() {
            this.suggestLists = []
        },
        onInput() {
            wepy.navigateTo({
                url: '../goods_list'
            })
        }
    }

    async getSuggestLists(queryParams) {
        // 请求建议列表
        const { data: res } = await wepy.get('/goods/qsearch', { query: queryParams })
        if (res.meta.status !== 200) return wepy.baseToast()
        this.suggestLists = res.message
        //刷新UI
        this.$apply()
    }

    async onLoad() {
        let { data: res } = await wepy.getStorage({ key: 'searchHistory' })
        res = res || []
        this.queryContent = JSON.parse(res)
    }

}