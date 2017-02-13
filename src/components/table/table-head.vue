<template>
  <table cellspacing="0" cellpadding="0" border="0" >
    <colgroup>
      <col v-for="(cell,index) in columns" :width="cell.width">
    </colgroup>
    <thead>
      <tr>
        <th v-for="(cell,index) in columns" >
          <div>
            {{cell.label}}
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
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
    }
  }
</script>
