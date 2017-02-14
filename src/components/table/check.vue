<template>
  <mn-check :data="scope.row || 'ALL'" v-model="scope.store.states.selectList" @input="check"></mn-check>
</template>

<script>
  export default {
    props: {
      scope: {
        type: Object,
        default: {}
      }
    },
    methods: {
      check (val) {
        let checked = []
        if (this.scope.row) {
          checked = val
        } else {
          if (this.scope.store.states.selectList.includes('ALL')) {
            this.scope.store.commit('updataAllSelect', 'ALL')
            checked = this.scope.store.states.data
          } else {
            this.scope.store.commit('updataAllSelect', 'NoALL')
            checked = []
          }
        }
        this.$emit('choose', checked)
      }
    }
  }
</script>
