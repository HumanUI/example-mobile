<template>
  <docs-layout-page>
    <mn-section>
      <mn-letter>
        <mn-letter-body>
          <h1>Table</h1>
          <small></small>
        </mn-letter-body>
      </mn-letter>
    </mn-section>
    <mn-card>
      <mn-card-item>
        <demo-table :data="data">
          <table-col prop="name" fixed="left" width="40px">
            <template scope="scope">
              <demo-check :scope="scope" @choose="check"></demo-check>
            </template>
          </table-col>
          <table-col prop="date" width="150px" label="时间" fixed="left"></table-col>
          <table-col prop="name" width="150px" label="人物"></table-col>
          <table-col prop="address" label="地点" width="300px"></table-col>
          <table-col prop="name" width="150px" label="人物"></table-col>
          <table-col prop="address" label="地点" width="300px"></table-col>
          <table-col prop="name" width="150px" label="人物"></table-col>
          <table-col prop="address" label="地点" width="300px"></table-col>
          <table-col prop="name" width="150px" label="人物"></table-col>
          <table-col prop="address" label="地点" width="300px"></table-col>
          <table-col label="操作" width="200px" fixed="right">
            <template scope="scope">
              <mn-btn type="primary-outline" size="sm" @click="show(scope.$index, scope.row)">查看</mn-btn>
            </template>
          </table-col>
        </demo-table>
      </mn-card-item>
    </mn-card>
  </docs-layout-page>
</template>

<script>
  import DemoTable from './table.vue'
  import TableCol from './column.js'
  import DemoCheck from './check.vue'

  export default {
    data () {
      return {
        data: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-20',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        list: []
      }
    },
    components: { DemoTable, TableCol, DemoCheck },
    methods: {
      show (index, row) {
        console.log(index, row.date, row.name)
      },
      check (val) {
        console.log(val)
      }
    }
  }
</script>
