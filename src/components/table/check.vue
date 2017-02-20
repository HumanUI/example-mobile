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
        let index = val.indexOf('ALL')
        if (index !== -1) {
          val = val.splice(0, index)
        }
        let checked = []
        let all = this.scope.store.states.data
        if (this.scope.row) {
          checked = val
          this.scope.store.commit('updataAllSelect', val)
        } else {
          if (this.scope.store.states.selectList.includes('ALL')) {
            this.scope.store.commit('updataAllSelect', all)
            checked = all
          } else {
            this.scope.store.commit('updataAllSelect', [])
            checked = []
          }
        }
        this.$emit('choose', checked)
      }
    }
  }
</script>
