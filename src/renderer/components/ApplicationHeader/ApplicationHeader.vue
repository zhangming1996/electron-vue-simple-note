<template>
    <header
        id="ApplicationHeader"
        class="toolbar toolbar-header ApplicationHeader"
    >
        <div 
            class="BrowserPageOperation"
            @click="proxyClick($event)"
        >
            <span 
                class="icon icon-record" 
                style="color:#34c84a"
                data-code="window-min"
                title="窗口隐藏至托盘"
            ></span>
            <span 
                class="icon icon-record" 
                style="color:#fdbc40"
                data-code="window-max"
                title="窗口放大"        
            ></span>
            <span 
                class="icon icon-record" 
                style="color:#fc605b"
                data-code="window-close"
                title="关闭此应用窗口"                                            
            ></span>
        </div>
        <h1 class="title">Finger Notebook</h1>
    </header>
</template>

<script>
const ipc = require('electron').ipcRenderer

export default {
  name: 'ApplicationHeader',
  methods: {
      proxyClick($event) {
          let dataCode = $event.target.getAttribute("data-code");
          switch(dataCode) {
            case "window-min" :
                ipc.send('window-min')
                break;
            case "window-max" :
                ipc.send('window-max')
                break;
            case "window-close" :
                ipc.send('window-close')            
                break;
          }
      }
  },
}
</script>

<style lang="scss" scoped>
.ApplicationHeader {
  background-color: #2a2a2a;    
  -webkit-app-region: drag;
  position: relative;
  border-bottom: 1px solid #2b3f47;
  &.toolbar-header.toolbar {
    background: #2a2a2a;
    box-shadow: none;
    h1 {
      color: #fff;
      line-height: 30px;
    }
    .BrowserPageOperation {
        position: absolute;
        left: 2px;
        display: flex;
        line-height: 30px;
        font-size: 22px;        
        span {
            margin-left: 6px;
            cursor: pointer;
            -webkit-app-region: no-drag;            
        }
    }
  }
}
</style>
