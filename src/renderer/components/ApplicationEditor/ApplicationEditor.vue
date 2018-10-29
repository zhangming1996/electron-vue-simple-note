<template>
    <div class="ApplicationEditor">
        <div class="wrapper" v-if="currentNotelist.currentList.length">
            <div class="input-wrapper">
              <input 
                  class="title-input"
                  @blur="miss_focus"
                  @focus="get_focus"
                  type="text" v-model="title">
          </div>
          <div class="dirtag">
              <span>
                  {{dirName}}
              </span>
          </div>
          <editor-bar />
        </div>
        <div class="modal" v-if="!currentNotelist.currentList.length"></div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ApplicationEditor',
  data: () => ({
    newTitle: ''
  }),
  computed: {
    ...mapState(['currentEditorOptions', 'currentNotelist']),
    title: {
      get() {
        return this.$store.state.currentEditorTitle
      },
      set(newval) {
        this.newTitle = newval
      }
    },
    dirName: {
      get() {
        if (this.$store.state.currentEditorDir === 'notedata') {
          return '全部笔记'
        }
        return this.$store.state.currentEditorDir
      }
    }
  },
  methods: {
    ...mapActions(['SET_TITLE']),
    miss_focus() {
      if ((this.newTitle === '')) this.newTitle = this.title

      this.SET_TITLE(this.newTitle)
    },
    get_focus() {}
  },
  components: {
    EditorBar: resolve => require(['./EditorBar/EditorBar.vue'], resolve)
  },
  mounted() {
    console.log(this.currentNotelist)
  }
}
</script>

<style lang="scss" scoped>
.ApplicationEditor {
  display: flex;
  flex-direction: column;
  height: 100%;
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    .input-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 5px;
      height: 42px;
      .title-input {
        width: 100%;
        display: block;
        border: 1px solid transparent;
        outline: none;
        padding-left: 10px;
        line-height: 28px;
        color: rgb(52, 200, 74);
        font-size: 18px;
        &:hover {
          border-color: #005a0d;
        }
        &:focus {
          border-color: #005a0d;
        }
      }
    }
    .dirtag {
      width: 100%;
      padding: 4px 10px;
      height: 36px;
      span {
        display: inline-block;
        padding: 4px 8px;
        background-color: rgb(52, 200, 74);
        color: #fff;
      }
    }
  }
  .modal {
    width: 100%;
    height: 100%;
    background-color: #2a2a2a;
  }
}
</style>
