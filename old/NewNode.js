class NewNode {

    constructor() {
        this.leaf = false
        this.values = []
        this.children = []

        this.maxKeys = TREEORDER - 1
        this.maxChildren = TREEORDER
        this.html = null
    }

    add(key) {
        if (this.leaf) {
            if (this.values.length < this.maxKeys) {
                this.values.push(key)
                this.values.sort((a,b) => a - b)
            } else {

            }
        }
    }

}