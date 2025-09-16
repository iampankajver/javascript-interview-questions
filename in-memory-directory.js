class FileSystem {
  constructor() {
    this.directory = {
      'root': {}
    }
    this.currentDirectory = this.directory.root;
    this.currentPath = '/'
  }
  mkdir(path) {
    const parts = path.split('/').filter(part => part !== '')
    let current = this.currentDirectory;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {}
      }
      current = current[part]
    }
  }
  cd(path) {
    const parts = path.split('/').filter(part => part !== '')
    let current =  path[0] == '/' ? this.directory.root : this.currentDirectory;
    for (const part of parts) {
      if (!current[part]) {
        console.log(`Directory ${path} not found`)
        return
      } else {
        current = current[part]
      }
    }
    this.currentDirectory = current
    this.currentPath = path
  }
  ls() {
    return Object.keys(this.currentDirectory)
  }
  createFile(fileName, content) {
    if (this.currentDirectory[fileName]) {
      console.log(`File ${fileName} already exists`)
    } else {
      this.currentDirectory[fileName] = content
    }
  }
  readFile(fileName) {
    if (!this.currentDirectory[fileName]) {
      console.log(`File ${fileName} not found`)
    } else {
      return this.currentDirectory[fileName]
    }
  } 
  deleteFile(fileName) {
    if (!this.currentDirectory[fileName]) {
      console.log(`File ${fileName} not found`)
    } else {
      delete this.currentDirectory[fileName]
    }
  }
  print() {
    console.log(JSON.stringify(this.directory, null, 2), this.currentPath)
  }
 }

const fs = new FileSystem()

fs.mkdir('/a/b/c')
fs.cd('/a/b/c')
fs.createFile('file1.txt', 'Hello, world!')
fs.cd('/a/b')
fs.createFile('file1.txt', 'Hello, world!')
fs.cd('/a')
fs.createFile('file1.txt', 'Hello, world!')
fs.print(fs)
// fs.deleteFile('file1.txt')
fs.print(fs)
