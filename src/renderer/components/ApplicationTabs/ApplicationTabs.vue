<template>
    <ul class="list-group ApplicationTabs">
        <!-- <li class="list-group-header" style="height:52px">
            <input class="form-control" type="text" placeholder="输入过滤" v-model="note_search">
        </li> -->
        <div class="show-bar" style="position:relative;">
            <span>正在显示</span>
            <span 
                style="background: rgb(52, 200, 74);"
                class="notebook">{{currentList.currentTitle}}</span>
            <span>中的</span>
            <span style="color: rgb(252, 96, 91);">{{currentList.currentList.length}}</span>
            <span>条笔记</span>
            <button 
              class="btn btn-default" 
              style="position:absolute;right:10px;top:-2px;"
              @click="HANDLE_CLICKEVENT([$event,'create',null,'in'])"
            >
                <span 
                  class="icon icon-home icon-text"
                ></span>
                新建
            </button>
        </div>
        <div 
         class="hasno_tabs"
          v-if="!tabsFilelist.length">
          <div class="icon icon-folder" style="font-size:50px"></div>
          <p style="color:rgb(52, 200, 74)">没有文件</p>
        </div>
        <div class="item-list" v-if="tabsFilelist.length">
          <li 
          class="list-group-item" v-for="(item,index) in tabsFilelist" 
          :key="tabsFilelist + index"
          :class="{'isActive':index===activeClass,'defaultClass':index === defaultClass}"
          @click="handle_click(item,index)"
        >
            <div class="media-body">
                <strong>{{item.name}}</strong>
                <div style="line-height:24px;">
                    <span>
                        {{computedDate(item.mtimeMs)}}
                    </span>
                </div>
                <span 
                  class="icon icon-record remove-btn"
                  @click="click_remove($event,index)"
                ></span>                
            </div>
        </li>
        </div>
    </ul>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ApplicationTabs',
  data: () => ({
    classIndex: 0,
    activeClass: null,
    defaultClass: 0,
    note_search: ''
  }),
  computed: {
    ...mapState({
      currentList: state => state.currentNotelist
    }),
    tabsFilelist() {
      return this.currentList.currentList
    }
  },
  methods: {
    ...mapActions([
      'HANDLE_TABROUTER',
      'INIT_NOTEBOOKDATA',
      'HANDLE_CLICKEVENT'
    ]),
    click_remove($event, index) {
      this.HANDLE_CLICKEVENT([
        $event,
        'remove',
        this.tabsFilelist[index],
        'file'
      ])
    },
    computedDate(time) {
      let s = new Date(time)
      let year = s.getFullYear()
      let month = s.getMonth() + 1
      let day = s.getDate()
      let hours = s.getHours() < 10 ? '0' + s.getHours() : s.getHours()
      let min = s.getMinutes() < 10 ? '0' + s.getMinutes() : s.getMinutes()
      let sec = s.getSeconds() < 10 ? '0' + s.getSeconds() : s.getSeconds()
      return `${year}/${month}/${day} ${hours}:${min}:${sec}`
    },
    handle_click(item, index) {
      this.defaultClass = index
      this.activeClass = index
      this.HANDLE_TABROUTER(item)
    }
  },
  created() {
    this.INIT_NOTEBOOKDATA()
  }
}
</script>

<style lang="scss" scoped>
.isActive,
.defaultClass {
  background-color: #87df90;
}
.ApplicationTabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  .show-bar {
    height: 27px;
    box-sizing: border-box;
    font-size: 12px;
    padding: 4px;
    color: #777;
    .notebook {
      padding: 4px 8px;
      color: #fff;
    }
  }
  .hasno_tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .list-group-item {
    .media-body {
      position: relative;
      .remove-btn {
        position: absolute;
        right: 13px;
        top: 5px;
        color: #fc605b;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        &:hover {
          opacity: 1;
        }
      }
    }
    &:hover {
      background-color: #cddfcf;
      box-sizing: border-box;
      .remove-btn {
        opacity: 0.5;
      }
    }
    &:active {
      background-color: #ccc;
    }
  }
  .item-list {
    overflow: auto;
    flex: 1;
  }
}
</style>
