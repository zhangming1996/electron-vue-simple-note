const fs = require('fs')
const path = require('path')

const utils = {
    noteData: [],
    allData: [],
    ["$Dir_Isexist"](path) {
        try {
            fs.accessSync(path, fs.F_OK);
        } catch (e) {
            return false;
        }
        return true
    },
    ["$Create_note"](path, text, filename, type, newpath) {
        return new Promise((resolve, reject) => {
            if (type === 1) {
                fs.writeFile(`${path}/${filename}.html`, text, (err) => {
                    if (err) throw err;
                    resolve(true)
                })
            }
            if (type === 2) {
                fs.mkdir(`${path}/${filename}`, (err) => {
                    if (err) throw err;
                    resolve(true)
                })
            }
            if (type === 3) {
                fs.rename(path, newpath, (err) => {
                    if (err) throw err;
                    resolve(true)
                })
            }
        })
    },
    ["$Handle_FirstDir"]() {
        const type = this.$Dir_Isexist('./notedata')
        if (type) {
            const hasNotebookDir = this.$Dir_Isexist('./notedata/notebook')
            if (hasNotebookDir) return true
            if (!hasNotebookDir) fs.mkdir("./notedata/notebook")
            return true
        } else {
            fs.mkdir("./notedata", err => {
                if (err) console.log('初始化根目录文件夹失败')
                fs.mkdir("./notedata/notebook")
                return true
            })
            return true
        }
    },
    ["$GET_DATA"](filepath) {
        this.allData = []
        return this.$GET_ALLDATA(filepath)
    },
    ["$Remove_Note"](path) {
        var pa = fs.readdirSync(path);
        pa.forEach((elem, index) => {
            let info = fs.statSync(path + "/" + elem)
            if (info.isDirectory()) {
                this.$Remove_Note(path + "/" + elem);
            } else {
                fs.unlinkSync(path + "/" + elem)
            }
        })
    },
    ["$Remove_Notebook"](path) {
        var pa = fs.readdirSync(path);
        pa.forEach((elem, index) => {
            let info = fs.statSync(path + "/" + elem)
            if (info.isDirectory()) {
                fs.rmdirSync(path + "/" + elem)
            } else {
                this.$Remove_Notebook(path + "/" + elem);
            }
        })
    },
    ["$Rename_notetitle"]: (oldPath, newPath) => {
        console.log(oldPath,newPath)
        return fs.renameSync(oldPath, newPath)
    },
    ["$Remove_Currentnote"]: (path) => fs.unlinkSync(path),
    ["$GET_ALLDATA"](filepath) {
        var pa = fs.readdirSync(filepath);
        pa.forEach((elem, index) => {
            var info = fs.statSync(filepath + "/" + elem)
            let parse = path.parse(filepath + '/' + elem)
            if (info.isDirectory()) {
                this.$GET_ALLDATA(filepath + "/" + elem);
            } else {
                this.allData.push({
                    base: parse.base,
                    dir: parse.dir,
                    ext: parse.ext,
                    name: parse.name,
                    root: parse.root,
                    path: filepath + "/" + elem,
                    mtimeMs: info.mtimeMs
                })
            }
        })
        return this.allData;
    },
    ["$GET_EDITORDATA"](node) {
        const url = node.path
        const text = fs.readFileSync(url, "utf8")
        return text
    },
    ["$Remove_Notebookone"](path) {
        return fs.rmdirSync(path)
    },
    ["$GET_NOTEBOOKDATA"](url) {
        this.noteData = []
        const pa = fs.readdirSync(url)
        pa.forEach((elem, index) => {
            let info = fs.statSync(url + '/' + elem)
            let parse = path.parse(url + '/' + elem)
            if (info.isFile()) {
                this.noteData.push({
                    base: parse.base,
                    dir: parse.dir,
                    ext: parse.ext,
                    name: parse.name,
                    root: parse.root,
                    path: url + "/" + elem,
                    mtimeMs: info.mtimeMs
                })
            }
        })
        return this.noteData;
    },
    ["$Read_Notebook"]() {
        const notebook = []
        const note = []
        const pa = fs.readdirSync("./notedata/notebook")
        pa.forEach((elem, index) => {
            let info = fs.statSync('./notedata/notebook/' + elem)
            let parse = path.parse('./notedata/notebook/' + elem)
            if (info.isDirectory()) {
                notebook.push({
                    base: parse.base,
                    title: elem,
                    label: parse.name,
                    dir: parse.dir,
                    path: "./notedata/notebook/" + elem,
                    size: info.size,
                    icon: "el-icon-star-off",
                    mtimeMs: info.mtimeMs,
                })
            }
            if (info.isFile()) {
                note.push({
                    base: parse.base,
                    title: elem,
                    label: parse.name,
                    dir: parse.dir,
                    path: "./notedata/notebook/" + elem,
                    icon: "el-icon-star-off",
                    size: info.size,
                    mtimeMs: info.mtimeMs,
                })
            }
        })
        return {
            status: true,
            notebook,
            note,
        }
    },
    ["$Write_Editortext"](path, text) {
        fs.writeFile(path, text, (error) => {
            if (error) return console.log("追加文件失败" + error.message);
        });
    }
}

export default utils