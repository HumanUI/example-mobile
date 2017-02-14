
const TableStore = function (table, initialState = {}) {
  if (!table) {
    throw new Error('Table is required.')
  }
  this.table = table

  this.states = {
    selectList: [],
    rowKey: null,
    _columns: [],
    originColumns: [],
    columns: [],
    fixedColumns: [],
    rightFixedColumns: [],
    isComplex: false,
    _data: null,
    filteredData: null,
    data: null,
    sortingColumn: null,
    sortProp: null,
    sortOrder: null,
    isAllSelected: false,
    selection: [],
    reserveSelection: false,
    selectable: null,
    currentRow: null,
    hoverRow: null,
    filters: {},
    expandRows: [],
    defaultExpandAll: false
  }

  for (let prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop]
    }
  }
}

TableStore.prototype.mutations = {
  setData (states, data) {
    states.data = data
  },

  insertColumn (states, column, index, parent) {
    let array = states._columns
    if (parent) {
      array = parent.children
      if (!array) array = parent.children = []
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column)
    } else {
      array.push(column)
    }

    this.scheduleLayout()
  },
  updataAllSelect (states, type) {
    if (type === 'ALL') {
      states.selectList = states.data.concat('ALL')
    } else {
      states.selectList = []
    }
  }
}
TableStore.prototype.scheduleLayout = function () {
  this.table.debouncedLayout()
}

TableStore.prototype.updateColumns = function () {
  const states = this.states
  const _columns = states._columns || []
  states.fixedColumns = _columns.filter((column) => column.fixed === 'left')
  states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right')

  if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
    _columns[0].fixed = true
    states.fixedColumns.unshift(_columns[0])
  }
  states.originColumns = [].concat(states.fixedColumns).concat(_columns.filter((column) => !column.fixed)).concat(states.rightFixedColumns)
}

TableStore.prototype.commit = function (name, ...args) {
  const mutations = this.mutations
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

export default TableStore
