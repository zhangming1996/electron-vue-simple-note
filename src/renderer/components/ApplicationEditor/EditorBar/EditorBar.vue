<template>
     <quill-editor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @blur="onEditorBlur($event)" 
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    />
</template> 
<script>
import { mapState, mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block']
          ]
        }
      }
    }
  },
  computed: {
    ...mapState(['currentEditorContent']),
    content: {
      get() {
        return this.currentEditorContent
      },
      set(value) {
        this.$store.commit('SET_EDITOR', value)
      }
    }
  },
  props: {},
  methods: {
    ...mapActions(['WRITE_EDITORTEXT']),
    onEditorBlur() {},
    throttle(method, context) {
      clearTimeout(method.tId)
      method.tId = setTimeout(() => {
        method.call(context)
      }, 200)
    },
    onEditorFocus() {},
    onEditorChange() {
      this.throttle(this.WRITE_EDITORTEXT(this.content), this)
    }
  },
  mounted() {}
}
</script>  
<style lang="scss">
.ql-toolbar.ql-snow {
  height: 42px !important;
}
.ql-container {
  flex: 1;
  position: relative;
  .ql-editor,
  .ql-editor.ql-blank {
    width: 100%;
    position: absolute;
  }
}
</style>

<style lang="scss" scoped>
.quill-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
 