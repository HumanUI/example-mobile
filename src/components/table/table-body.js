export default {
  props: {
    store: {
      type: Object,
      default: {}
    },
    fixed: {
      type: String,
      default: ''
    }
  },
  computed: {
    columns () {
      return this.store.states._columns
    },
    tableData () {
      return this.store.states.data
    }
  },
  render (h) {
    return (
      <table
        cellspacing="0" cellpadding="0" border="0" >
        <colgroup>
          {
            this.columns.map((cell, index) => {
              return <col width={cell.width}/>
            })
          }
        </colgroup>
        <tbody>
          {
            this.tableData.map((row, $index) => {
              return <tr>{
                this.columns.map((cell, index) => {
                  let store = this.store
                  return <td class={cell.fixed !== '' && this.fixed === '' ? 'is-hidden' : ''}>
                    {cell.renderCell(h, {row, cell, store, $index})}
                  </td>
                })
              }</tr>
            })
          }
        </tbody>
      </table>
    )
  }
}
