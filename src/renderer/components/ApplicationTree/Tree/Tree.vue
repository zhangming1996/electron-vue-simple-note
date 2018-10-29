<template>
    <ul class="menu">
        <li v-for="(item,index) in list" :key="index" :name="item">
            <p @click="changeStatus(index)">
              <span 
                    style="zIndex:0"
                    class='Mask'
                ></span> 
                <span
                    :class="{
                        'icon':true,
                        'icon-folder':scopes[index],                  
                        'icon-doc-text-inv':!scopes[index],
                    }"
                    style="margin-right: 3px;position:relative;zIndex:100"
                >
                </span>                      
                <span style="position:relative;zIndex:100">{{item.name}}</span>
            </p>
            <tree-menus v-if="scopesDefault[index]" :list="item.children"></tree-menus>
        </li>
    </ul>
</template>

<script>

export default {
  name: 'treeMenus',
  data: () => ({
    scopesDefault: [],
    scopes: [],
    selectIndex: null,
    selectName: null
  }),
  props: {
    list: Array
  },
  methods: {
    changeStatus(index, item) {
      if (this.scopesDefault[index] == true) {
        this.$set(this.scopesDefault, index, false)
      } else {
        this.$set(this.scopesDefault, index, this.scopes[index])
      }
      this.addClassFunc(index)
    },
    scope() {
      this.list.forEach((item, index) => {
        this.scopesDefault[index] = false
        if ('children' in item) {
          this.scopes[index] = true
        } else {
          this.scopes[index] = false
        }
      })
    },
    addClassFunc(index) {
      this.selectIndex = index
    }
  },
  created() {
    this.scope()
  }
}
</script>

<style lang="scss" scoped>
.menu {
  margin: 0;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  list-style: none;
  font-size: 13px;
  color: #ccc;
  p {
    margin: 0px;
    line-height: 24px;
    .Mask {
      position: absolute;
      left: 0;
      height: 24px;
      width: 210px;
      background-color: #333;
      z-index: 0;
      opacity: 0;
      &:hover {
        opacity: 1;
      }
      &:active {
        background-color: #444;
        opacity: 1;
      }
    }
  }
}
</style>
