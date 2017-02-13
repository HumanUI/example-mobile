const DEFAULT_RENDER_CELL = function (h, { row, cell }) {
  const property = cell.property || cell.prop
  if (property && property.indexOf('.') === -1) {
    return row[property]
  }

  return getValueByPath(row, property)
}
const getValueByPath = function (object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

export default {
  props: {
    label: String,
    property: String,
    prop: String,
    width: String,
    align: String,
    fixed: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      columns: []
    }
  },
  computed: {
    owner () {
      let parent = this.$parent
      return parent
    }
  },
  created () {
    this.customRender = this.$options.render
    this.$options.render = h => h('div', '')

    let parent = this.$parent
    let owner = this.owner
    this.isSubColumn = owner !== parent

    this.columns.fixed = this.fixed
    this.columns.prop = this.prop
    this.columns.label = this.label
    this.columns.width = this.width

    let renderCell = this.columns.renderCell
    let _self = this

    this.columns.renderCell = function (h, data) {
      if (_self.$scopedSlots.default) {
        renderCell = () => _self.$scopedSlots.default(data)
      }

      if (!renderCell) {
        renderCell = DEFAULT_RENDER_CELL
      }
      return <div class='cell'>{renderCell(h, data)}</div>
    }
  },
  mounted () {
    const owner = this.owner
    const parent = this.$parent
    let columnIndex

    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el)
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el)
    }

    owner.store.commit('insertColumn', this.columns, columnIndex, this.isSubColumn ? parent.columnConfig : null)
  }
}
