<template>
  <div class="my-table">
    <div ref="hiddenColumns"><slot></slot></div>
    <div class="main">
      <table-head :store="store" :style="{width: allWidth}">
      </table-head>
      <table-body :store="store" :style="{width: allWidth}">
      </table-body>
    </div>
    <div class="leftTable" :style="{width: fixedWidth + 'px'}">
      <div class="my-table-box">
        <table-head :store="store" :style="{width: fixedWidth + 'px'}" fixed="left">
        </table-head>
      </div>
      <div class="my-table-box">
        <table-body :store="store" :style="{width: fixedWidth + 'px'}" fixed="left">
        </table-body>
      </div>
    </div>
    <div class="rightTable" :style="{width: rightFixedWidth + 'px'}">
      <div class="my-table-box">
        <table-head :store="store" :style="{width: rightFixedWidth + 'px'}" fixed="right">
        </table-head>
      </div>
      <div class="my-table-box">
        <table-body :store="store" :style="{width: rightFixedWidth + 'px'}" fixed="right">
        </table-body>
      </div>
    </div>
  </div>
</template>

<script>
  import TableHead from './table-head.js'
  import TableBody from './table-body.js'
  import TableStore from './store.js'
  import lodash from 'lodash'

  export default {
    data () {
      const store = new TableStore(this)
      return {
        store,
        fixedWidth: 0,
        rightFixedWidth: 0,
        allWidth: 0
      }
    },
    components: { TableHead, TableBody },
    mounted () {
    },
    methods: {
      layoutTable () {
        this.store.updateColumns()
        this.doFixedWidth()
        console.log(this.fixedWidth, this.rightFixedWidth)
      },
      doFixedWidth () {
        const fixedColumns = this.store.states.fixedColumns
        if (fixedColumns.length > 0) {
          let fixedWidth = 0
          fixedColumns.forEach(column => {
            fixedWidth += parseInt(column.width)
          })

          this.fixedWidth = fixedWidth
        }

        const rightFixedColumns = this.store.states.rightFixedColumns
        if (rightFixedColumns.length > 0) {
          let rightFixedWidth = 0
          rightFixedColumns.forEach(column => {
            rightFixedWidth += parseInt(column.width)
          })

          this.rightFixedWidth = rightFixedWidth
        }
        let allWidth = 0
        for (let i = 0, columns = this.store.states._columns; i < columns.length; i++) {
          if (columns[i].width) {
            allWidth += parseInt(columns[i].width)
          } else {
            allWidth = '100%'
            break
          }
        }
        this.allWidth = allWidth === '100%' ? allWidth : allWidth + 'px'
      }
    },
    computed: {
      columns () {
        return this.store.states.columns
      },

      fixedColumns () {
        return this.store.states.fixedColumns
      },

      rightFixedColumns () {
        return this.store.states.rightFixedColumns
      }
    },
    created () {
      let func = this.layoutTable
      this.debouncedLayout = lodash.debounce(func, 50)
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    watch: {
      data: {
        immediate: true,
        handler (val) {
          this.store.commit('setData', val)
        }
      }
    }
  }
</script>

<style lang="scss" scope>
  .my-table {
    width: 100%;
    position: relative;
    overflow: hidden;

    &-box {
      width: 100%;
    }
  }

  table {
    background: #fff;
    table-layout: fixed;

    td {
      padding: 8px 10px;
      border-bottom: 1px solid #eee;
      font-size: 14px;

      &.is-hidden {
        visibility: hidden;
      }
    }

    th {
      padding: 12px 10px ;
      border-bottom: 1px solid #e3e3e3;
      font-size: 16px;
      text-align: left;
    }
  }

  .main {
    overflow: auto;
  }

  .leftTable {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 1px 0 8px #ccc;
  }

  .rightTable {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: -1px 0 8px #ccc;

    .my-table-box {
      &:after {
        clear: both;
        content: '';
        display: block;
      }

      table {
        float: right;
      }
    }
  }
</style>
