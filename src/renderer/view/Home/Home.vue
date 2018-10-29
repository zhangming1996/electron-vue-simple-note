<template>
    <div id="Home" class="window Home">
    <el-dialog 
      :visible="showDialog"
      :modal="true"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      center
      top="200px"
      width="22%"
    >
      <div slot="title">
          <span>{{dialogOptions.title}}</span>
          <span class="icon icon-record close-button" style="color:#fc605b" @click="CLOSE_DIALOG"></span>
        </div>
        <input 
          class="form-control" 
          type="text" 
          placeholder="请输入名称"
          v-show="dialogOptions.showInput"
          v-model="contentText"
        >
          <footer class="toolbar toolbar-footer" slot="footer">
            <div class="toolbar-actions">
              <button 
                class="btn btn-default pull-left"
                v-if="dialogOptions.cancelTitle"              
                @click="CLOSE_DIALOG"
              >
                {{dialogOptions.cancelTitle}}
              </button>
              <button 
                class="btn btn-primary pull-right"
                v-if="dialogOptions.saveTitle"            
                @click="SUBMIT_FORM"
              >
                {{dialogOptions.saveTitle}}
              </button>
            </div>
        </footer>
    </el-dialog>
    <application-header />
    <div class="window-content">
        <div class="pane-group">
            <div class="pane-sm sidebar window-slider">
                <!-- <application-user />                     -->
                <application-tree />
            </div>
            <div class="pane">
                <div class="pane-group">
                    <div class="pane-sm sidebar" id="tabs-slider" style="padding:0">
                        <application-tabs />
                    </div>
                    <div class="pane">
                        <application-editor />
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    ApplicationHeader: resolve =>
      require([
        '@/components/ApplicationHeader/ApplicationHeader.vue'
      ], resolve),
    ApplicationUser: resolve =>
      require(['@/components/ApplicationUser/ApplicationUser.vue'], resolve),
    ApplicationTree: resolve =>
      require(['@/components/ApplicationTree/ApplicationTree.vue'], resolve),
    ApplicationTabs: resolve =>
      require(['@/components/ApplicationTabs/ApplicationTabs.vue'], resolve),
    ApplicationEditor: resolve =>
      require(['@/components/ApplicationEditor/ApplicationEditor.vue'], resolve)
  },
  data: () => ({}),
  computed: {
    ...mapState({
      notebook: state => state.notebook.notebook,
      showDialog: state => state.showDialog,
      dialogOptions: state => state.dialogOptions,
    }),
    contentText: {
      get() {
        return this.dialogOptions.contentText
      },
      set(value) {
        this.$store.commit('SET_CONTENTTEXT', value)
      }
    }
  },
  methods: {
    ...mapActions(['INIT_DIR', 'SUBMIT_FORM']),
    ...mapMutations(['CLOSE_DIALOG'])
  },
  created() {
    this.INIT_DIR()
  }
}
</script>

<style lang="scss">
.Home {
  .el-dialog {
    z-index: 10000000000;
    .el-dialog__header {
      height: 30px;
      padding: 0 !important;
      background-color: #2a2a2a;
      position: relative;
      line-height: 30px;
      color: #fff;
      div {
        .close-button {
          position: absolute;
          right: 10px;
          cursor: pointer;
        }
      }
    }
    .el-dialog__footer {
      padding: 0;
    }
    .el-dialog__body {
      padding: 14px 10px;
      box-sizing: border-box;
    }
  }
  .progress-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .el-progress.el-progress--circle {
    }
    p {
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>


<style lang="scss" scoped>
.Home {
  .window-content {
    .pane-group {
      .window-slider.pane-sm.sidebar {
        background-color: #2a2a2a;
      }
      #tabs-slider.pane-sm {
        box-sizing: border-box;
        padding: 10px;
        max-width: 330px;
        min-width: 330px;
        width: 330px;
      }
    }
  }
  .first_modal {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999999999999999;
    background-image: url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1989489684,3339662130&fm=26&gp=0.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
