export default {
  props: {
    store: {
      type: Object,
      default: {}
    }
  },
  computed: {
    columns () {
      return this.store.states._columns
    }
  },
  render (h) {
    return <table cellspacing="0" cellpadding="0" border="0" >
      <colgroup>
        {
          this.columns.map((cell, index) => {
            return <col width={cell.width}/>
          })
        }
      </colgroup>
      <thead>
       <tr>{
          this.columns.map((cell, index) => {
            let store = this.store
            return <th>
              {cell.renderHead(h, {store})}
            </th>
          })
        }</tr>
      </thead>
    </table>
  }
}
