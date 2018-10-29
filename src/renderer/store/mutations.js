export default {
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
}