<template>
    <div class="EditorBar">
        <div 
            id="toolbars"
            class="toolbars"
        ></div>
        <div
            id="editor"
            class="editor"
        ></div>
    </div>
</template>

<script>
import E from 'wangEditor'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EditorBar',
  computed: {
    ...mapState(['currentEditorContent']),
    content: {
      get: () => this.currentEditorContent,
      set: value => this.$store.commit('SET_EDITOR', value)
    }
  },
  methods: {
    ...mapActions(['WRITE_EDITORTEXT']),
  },
  mounted() {
    const editor = new E('#toolbars', '#editor')
    editor.customConfig.onchange = function(html) {
    //   this.content = html
    //   this.WRITE_EDITORTEXT(this.content)
    }
    editor.create()
  }
}
</script>

<style lang="scss" scoped>
.EditorBar {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  .toolbars {
    width: 100%;
    height: 36px;
    border: 1px solid #ccc;
  }
  .editor {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
