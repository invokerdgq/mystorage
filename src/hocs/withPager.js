// this.fetch 方法需要返回条数总量: { total }，用来计算页数
// this.state.page 存放page相关的状态

export default function withPager (Component) {
  return class WithPagerComponent extends Component {
    constructor (props) {
      super(props)
      const { pageSize = 10, pageNo = 0, pageTotal = 0 } = props || {}

      let page = {
        isLoading: false,
        total: pageTotal,
        page_no: pageNo,
        page_size: pageSize,
        hasNext: true
      }

      this.state.page =  page


    }

    nextPage = async () => {
      console.log('hahaha')
			const  page  = this.state.page
      console.log(page.hasNext)
      if (!page.hasNext || page.isLoading) return

      page.isLoading = true
      this.setState({
        page
      })

      const { page_no, page_size } = page
      const curPage = page_no + 1
      const { total } = await this.fetch({
        page_no: curPage,
        page_size
			})
      if (!total || curPage >= Math.ceil(+total / page_size)) {
        page.hasNext = false
      }

      this.setState({
        page: {
          ...page,
          total,
          page_no: curPage,
					isLoading: false,
        }
			})
    }

    resetPage (cb = () => {}) {
      const page = {
        ...(this.state.page || {}),
        page_no: 0,
        total: 0,
        isLoading: false,
        hasNext: true
      }
      this.setState({ page }, cb)
    }

    transFormPage(length,cb=() => {}){
      const page = {
        ...(this.state.page || {}),
        page_no: Math.ceil(length/this.state.pageSize),
        total: 0,
        isLoading: false,
        hasNext: true
      }
      this.setState({ page }, cb)
    }
  }
}
