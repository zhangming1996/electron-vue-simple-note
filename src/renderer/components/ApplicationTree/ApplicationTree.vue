<template>
    <nav 
        id="ApplicationTree"
        class="ApplicationTree nav-group"
    >
        <h5 
            class="nav-group-title"
            style="padding-left:15px;"
            @click="HANDLE_CLICKEVENT([$event,'create',null,'out'])"            
        >
            <span 
                class="icon icon-plus-circled"
                style="font-size:24px;margin-right:4px"
            ></span>
            新建笔记
        </h5>
        <el-tree 
          node-key="noteTree"
          :render-after-expand="true"
          :data="dirList" 
          :props="defaultProps" 
          :default-expand-all="true"
          :expand-on-click-node="false"
          :highlight-current="true"
          empty-text="暂没有内容"
          @node-click="CHANGE_NOTE_ROUTE"
          ref="treeview"
         >
         <div class="custom-tree-node" slot-scope="{ node, data }">
            <div>
              <i :class="node.icon" style="margin-right:6px"></i>
              {{ node.label }}

              <span class="tree-button">
                <span 
                  class="icon icon-record" 
                  style="color:#34c84a"
                  v-if="computedShow(node,'create')"
                  @click="HANDLE_CLICKEVENT([$event,'create',node])"
                ></span>
                <span 
                  class="icon icon-record" 
                  style="color:#fdbc40"
                  v-if="computedShow(node,'cname')"   
                  @click="HANDLE_CLICKEVENT([$event,'cname',node])"                                 
                ></span>
                <span 
                  class="icon icon-record" 
                  style="color:#fc605b"
                  v-if="computedShow(node,'remove')" 
                  @click="HANDLE_CLICKEVENT([$event,'remove',node])"                                                                                
                ></span>                
                  <!-- @click="HANDLE_DIRLIST_SET({$event,node,data,type:'remove'})"       -->
              </span>
            </div>
          </div>
        </el-tree>
    </nav>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'ApplicationTree',
  data: () => ({
    filterText: '',
    defaultProps: {
      children: 'children',
      label: 'label',
      type: 'type'
    }
  }),
  computed: mapState({
    dirList: state => state.dirList
  }),
  watch: {},
  methods: {
    ...mapActions(['INIT_NOTEBOOK', 'CHANGE_NOTE_ROUTE', 'HANDLE_CLICKEVENT']),
    ...mapMutations([]),
    append() {},
    computedShow(node, type) {
      switch (type) {
        case 'create':
          return node.level === 1 && node.data.label === '笔记本'
          break
        case 'remove':
          return true
          break
        case 'cname':
          return node.level !== 1 && node.parent.data.label === '笔记本'
          break
      }
    }
  },
  created() {
    this.INIT_NOTEBOOK()
    this.$nextTick(() => {
      this.$refs.treeview.setCurrentKey(1)
    })
  }
}
</script>

<style lang="scss">
#ApplicationTree .el-tree {
  background-color: #2a2a2a;
  color: #ccc;
  .tree-button {
    opacity: 0;
    z-index: 100000000;
    span {
      cursor: pointer;
    }
  }
  .el-tree-node__content:hover {
    background-color: #444;
    .tree-button {
      opacity: 0.3;
    }
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #005a0d;
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #005a0d;
  }
}

#ApplicationTree
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #005a0d;
}

#ApplicationTree
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content::after {
  content: '';
  width: 3px;
  height: 26px;
  background-color: #00b61a;
  position: absolute;
  right: 0;
}
#ApplicationTree
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  .tree-button {
    opacity: 1;
  }
}

#ApplicationTree .search_notebook {
  width: 90%;
  margin: 4px auto;
  height: 30px;
}
#ApplicationTree
  .search_notebook
  .el-input.el-input-group.el-input-group--append {
  height: 30px;
}
#ApplicationTree
  .search_notebook
  .el-input.el-input-group.el-input-group--append
  .el-input__inner {
  height: 30px;
  background-color: #2a2a2a;
  font-size: 12px;
  color: #ccc;
}
#ApplicationTree
  .search_notebook
  .el-input.el-input-group.el-input-group--append
  .el-input__inner:focus {
  border-color: #009f17;
}
#ApplicationTree
  .search_notebook
  .el-input.el-input-group.el-input-group--append
  .el-input-group__append {
  background-color: #008213;
  padding: 0 12px;
  color: #fff;
  border-color: #008213;
}
#ApplicationTree
  .search_notebook
  .el-input.el-input-group.el-input-group--append
  .el-input-group__append
  .el-button.el-button--default {
  padding: 9px 23px;
}
</style>


<style lang="scss" scoped>
.ApplicationTree.nav-group {
  box-sizing: border-box;
  h5 {
    font-size: 18px;
    color: #ccc;
    line-height: 40px;
    padding-top: 0;
    box-sizing: border-box;
    &:hover {
      color: #fff;
      .icon {
        color: #34c84a;
      }
    }
    &:active {
      padding-top: 1px;
    }
  }
  .tree-button {
    position: absolute;
    right: 10px;
    opacity: 0;
  }
}
</style>
