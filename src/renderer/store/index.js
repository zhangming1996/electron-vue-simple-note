import Vue from 'vue'
import Vuex from 'vuex'
import Utils from "@/desktop"

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
    mutations: {
        ["SET_EDITOR"]: (state, text) => {
            state.currentEditorContent = text
        },
        ["SET_INITSTATUS"]: (state, status) => state.initStatus = status,
        ["SET_INITNOTEBOOKSTATUS"]: (state, { status, notebook, note }) => {
            state.initNoteBookStatus = status
            state.dirList[1]["children"] = notebook
            state.notebook = notebook
            state.note = note
        },
        ["SET_CURRENTNOTE"]: (state, data) => {
            state.currentNotelist = data
        },
        ["CLEAR_CURRENT"]: (state) => {
            state.currentNotelist = null
        },
        ["SET_EDITORCONTENT"]: (state, { data, item }) => {
            state.currentEditorContent = data
            state.currentEditorTitle = item.name
            let dirArr = item.dir.split("/")
            let dirName = dirArr[dirArr.length - 1]
            state.currentEditorDir = dirName
            state.currentPath = item.path
        },
        ["SET_DIALOGOPTIONS"]: (state, options) => {
            state.dialogOptions = options
        },
        ["SET_CONTENTTEXT"]: (state, text) => {
            state.dialogOptions.contentText = text
        },
        ["SHOW_DIALOG"]: state => state.showDialog = true,
        ["CLOSE_DIALOG"]: state => state.showDialog = false,
    },
    actions: {
        ['INIT_DIR']({ state, commit }) {
            const init_ok = Utils['$Handle_FirstDir']()
            commit('SET_INITSTATUS', init_ok)
        },
        ['INIT_NOTEBOOK']({ state, commit }) {
            const { status, notebook, note } = Utils["$Read_Notebook"]()
            notebook.sort((x, y) => y.mtimeMs - x.mtimeMs)
            commit("SET_INITNOTEBOOKSTATUS", { status, notebook, note })
        },
        ["SET_TITLE"]: ({ dispatch, state, commit }, value) => {
            if (value === state.currentEditorTitle) return
            let split = state.currentPath.lastIndexOf("\/")
            let path = state.currentPath.slice(0, split)
            Utils["$Rename_notetitle"](state.currentPath, `${path}/${value}.html`)
            dispatch("INIT_NOTEBOOK")
            dispatch("INIT_NOTEBOOKDATA")
            dispatch("SET_FIRST")
        },
        ['HANDLE_CLICKEVENT']({ state, commit }, [$event, type, node, side]) {
            const options = {}
            options.showInput = true
            $event.stopPropagation()
            if (type === 'create') {
                if (!node) {
                    options.title = "新建笔记"
                    options.cancelTitle = "取消"
                    options.saveTitle = "新建"
                    options.contentText = ""
                    if (side === "out" || state.currentNotelist.currentTitle === "全部笔记") {
                        options.type = 1
                    }
                    if (side === "in" && state.currentNotelist.currentTitle !== "全部笔记") {
                        options.type = 6
                        options.path = state.currentEditorDir
                    }
                }
                if (node) {
                    options.title = "新建笔记本"
                    options.cancelTitle = "取消"
                    options.saveTitle = "新建"
                    options.type = 2
                }
            }
            if (type === 'cname') {
                options.title = "笔记本重命名"
                options.cancelTitle = "取消"
                options.saveTitle = "确定重命名"
                options.type = 3
                options.node = node
                options.oldPath = node.data.path
                options.dirPath = node.data.dir
                options.contentText = node.label
            }
            if (type === 'remove') {
                if (node.id === 1) {
                    options.title = "清空全部笔记?"
                    options.cancelTitle = "取消"
                    options.saveTitle = "确定清空"
                    options.type = 4
                    options.path = node.data.path
                } else if (node.id === 2) {
                    options.title = "清空所有笔记本?"
                    options.cancelTitle = "取消"
                    options.saveTitle = "确定清空"
                    options.type = 5
                    options.path = node.data.path
                } else if (side === "file") {
                    options.title = "移除当前笔记?"
                    options.cancelTitle = "取消"
                    options.saveTitle = "确定移除"
                    options.path = node.path
                    options.type = 8
                } else {
                    options.title = "移除当前笔记本?"
                    options.cancelTitle = "取消"
                    options.saveTitle = "确定移除"
                    options.type = 7
                    options.path = node.data.path
                }
                options.showInput = false;
            }
            commit("SET_DIALOGOPTIONS", options)
            commit("SHOW_DIALOG")

        },
        ["SUBMIT_FORM"]({ state, dispatch, commit }, text) {
            let filename = state.dialogOptions.contentText
            switch (state.dialogOptions.type) {
                case 1: // 新建全局笔记
                    if (filename) {
                        let result = Utils["$Create_note"]("./notedata", "", filename, 1)
                        result.then(res => {
                            if (res) {
                                dispatch("INIT_NOTEBOOKDATA")
                            }
                        })
                    }
                    break;
                case 2: // 新建笔记本
                    let result = Utils["$Create_note"]("./notedata/notebook", "", filename, 2)
                    result.then(res => {
                        if (res) {
                            dispatch("INIT_DIR")
                            dispatch("INIT_NOTEBOOK")
                        }
                    })
                    break;
                case 3: // 重命名
                    let oldPath = state.dialogOptions.oldPath
                    let dirPath = state.dialogOptions.dirPath

                    let cname = Utils["$Create_note"](oldPath, "", filename, 3, dirPath + "/" + filename)
                    cname.then(res => {
                        dispatch("INIT_DIR")
                        dispatch("INIT_NOTEBOOK")
                        dispatch("INIT_NOTEBOOKDATA")
                    })
                    break;
                case 6:
                    let pathName = state.currentNotelist.currentTitle

                    let innerCreate = Utils["$Create_note"](`./notedata/notebook/${pathName}`, "", filename, 1)
                    innerCreate.then(res => {
                        if (res) {
                            dispatch("INIT_NOTEBOOKDATA")
                                // dispatch("INIT_NOTEBOOK")
                        }
                    })
                    break;
                case 4:
                    Utils["$Remove_Note"]("./notedata")
                    dispatch("INIT_NOTEBOOKDATA")
                    break;
                case 5:
                    Utils["$Remove_Notebook"]("./notedata/notebook")
                    dispatch("INIT_DIR")
                    dispatch("INIT_NOTEBOOK")
                    break;
                case 7:
                    Utils["$Remove_Notebookone"](state.dialogOptions.path)
                    dispatch("INIT_DIR")
                    dispatch("INIT_NOTEBOOK")
                    dispatch("INIT_NOTEBOOKDATA")
                    break;
                case 8:
                    Utils["$Remove_Currentnote"](state.dialogOptions.path)
                    dispatch("INIT_NOTEBOOK")
                    dispatch("INIT_NOTEBOOKDATA")
                    break;
            }
            commit("CLOSE_DIALOG")
        },
        ["SET_NOTEBOOKDATA"]({ dispatch, commit }, node) {
            let currentTitle = node.label;
            let currentList = Utils["$GET_NOTEBOOKDATA"](node.path)
            currentList.sort((x, y) => y.mtimeMs - x.mtimeMs)
            const set_data = { currentTitle, currentList }
            commit("SET_CURRENTNOTE", set_data)
        },
        ["CHANGE_NOTE_ROUTE"]({ state, dispatch, commit }, node, ) {
            if (node.label === "笔记本" && node.type === 1) {
                return
            }
            if (node.label === "全部笔记" && node.type === 1) {
                dispatch("INIT_NOTEBOOKDATA")
                dispatch("SET_FIRST", node)
                return
            } else {
                dispatch("SET_NOTEBOOKDATA", node)
                dispatch("SET_FIRST", node)
                return
            }
        },
        ["HANDLE_TABROUTER"]({ state, dispatch, commit }, item) {

            const data = Utils["$GET_EDITORDATA"](item)
            commit("SET_EDITORCONTENT", { data, item })

        },
        ["SET_FIRST"]: ({ state, dispatch, commit }, node) => {

            let item = state.currentNotelist.currentList[0]
            if (item) { // 看看编辑器有没有值
                const data = Utils["$GET_EDITORDATA"](item)
                commit("SET_EDITORCONTENT", { data, item })
            }
        },
        ["INIT_NOTEBOOKDATA"]({ dispatch, state, commit }) {
            let currentTitle = "全部笔记"
            let currentList = Utils["$GET_DATA"]("./notedata")
            if (currentList) currentList.sort((x, y) => y.mtimeMs - x.mtimeMs)
            const set_data = { currentTitle, currentList }
            commit("SET_CURRENTNOTE", set_data)
            dispatch("SET_FIRST")
        },
        ["WRITE_EDITORTEXT"]({ dispatch, state, commit }, text) {
            let path = state.currentPath

            Utils["$Write_Editortext"](path, text)
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})