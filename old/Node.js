class Node {

    constructor(key = 0, level = 0, parent = undefined, htmlNode = undefined) {
        this.keys = [key]
        this.maxKeys = TREEORDER - 1
        this.children = []
        this.maxChildren = TREEORDER
        this.level = level
        this.parent = parent
        this.parentHtml = htmlNode
        this.leaf = true
    }

    add(keyToAdd) {
        if (this.canAddKey()) {
            this.keys.push(keyToAdd)
            this.keys.sort((a,b) => a - b)


        } else {

            console.log(`node ${this} can't add key`)

            if (this.hasChildren()) {
                this.children.forEach((node) => {
                    node.keys.forEach((key) => {
                        let lastKey = 0
                        if (lastKey < keyToAdd < key) {
                            node.push(keyToAdd)
                            console.log(`key ${key} has been added to node ${this}`)
                        }
                    })
                })
            } else {
                this.splitAndUplift(keyToAdd)
            }


        }
    }

    canAddKey() { return this.keys.length < this.maxKeys }
    hasChildren() { return this.children.length }
    canHaveMoreChildren() { return this.children.length < this.maxChildren }

    addChild(key) {
        if (this.canHaveMoreChildren()) {
            let node = new Node(key, this.level+1, this)
            this.children.push(node)
            this.children.sort((a, b) => a.keys[0] - b.keys[0])
            return node
        } else {
            console.log("can't add child - too much")
            return this
        }
    }

    splitAndUplift(keyToAdd) {
        let left = this.getLeftUplift()
        let right = this.getRightUplift()
        let uplift = this.getMiddleUplift(keyToAdd)


        if (this.parent !== undefined) {
            this.parent.add(uplift)
        } else {
            this.parent = new Node(keyToAdd, this.level - 1)
            tree.nodes.push(this.parent)
            tree.nodes.sort((a,b) => a.keys[0] - b.keys[0])
        }

        this.keys = left
        this.parent.addChild(right)
    }

    getMiddleUplift(key) {
        let keys = this.keys
        keys.push(key)
        keys.sort((a,b) => a-b)

        let uplift
        if (keys.length % 2 === 0) {
            uplift = keys[keys.length/2-1]
        } else {
            uplift = keys[Math.round(keys.length/2)-1]
        }
        return uplift
    }

    getLeftUplift() {
        let middle = this.getMiddleUplift()
        return this.keys.filter((number) => { return number < middle})
    }

    getRightUplift() {
        let middle = this.getMiddleUplift()
        return this.keys.filter((number) => { return number > middle})
    }

    splitNode(key) {
        // check if parent can handle merge
        if (this.parent !== undefined) {
            if (this.parent.keys.length < this.maxKeys) {
                this.parent.keys.addKey()
            } else {
                this.parent.splitNode(uplift)
            }
        } else {
            // split
            this.addChild(this.keys[uplift], this.level, this)
            let children = this.keys.splice(uplift, 1)
            console.log("children spliced" + children)
            this.keys = [this.keys[uplift]]
        }

        console.log("uplift " + this.keys[uplift])


    }

    draw() {
        this.parent.append(`${this.toHtml()}`)
    }

    /**
     *
     * @returns {string}
     */
    toHtml() {
        let div = "<div class='d-flex'>"

        this.keys.forEach(key => {
            div += `<p class="mx-1">${key}</p>`
        })

        div += "</div>"
        return div
    }

    toString() {
        return `Node : ${this.keys}`
    }

}


