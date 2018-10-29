import Vue from 'vue'
import Vuex from 'vuex'
import Utils from "@/desktop"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dirList: [{
                label: '全部笔记',
                icon: 'el-icon-tickets',
                noteTree: 1,
                type: 1,
            },
            {
                label: '笔记本',
                icon: 'el-icon-menu',
                type: 1,
                noteTree: 2,
                children: []
            }
        ],
        dialogOptions: {},
        showDialog: false,
        currentNotelist: {},
        note: [],
        notebook: [],
        initStatus: false,
        initNoteBookStatus: false,
        currentEditorTitle: "",
        currentEditorDir: "",
        currentEditorContent: "",
        currentEditorOptions: {},
    },
    mutations,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})