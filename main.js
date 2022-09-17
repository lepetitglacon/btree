let $keyToAdd = $("#keyToAdd")
let $keysInTree = $("#treeKeys")
let $body = $("body")
let canvas = $("#canvas")[0]
console.log(canvas)
let c = canvas.getContext("2d")

const TREEORDER = 3

const TreeAddCode = {
    DIRECTCHILD: 1,
    FARCHILD: 2

}

class Tree {

    constructor(id, name, html) {
        this.id = id
        this.name = name
        this.baseNode = []
        this.baseHtml = html
    }

    addNode(nodeToAdd) {
        this.baseNode = nodeToAdd
    }

    addKey(keyToAdd) {
        this.baseNode.addKey(keyToAdd)
    }

    draw() {
        this.baseHtml.empty()

        let htmlTree = "<div class='container'>"

        if (this.baseNode.values.length > 0) {
            htmlTree += "<div class='row base-node'>"
            htmlTree += this.baseNode.values
            htmlTree += "</div>"
        }

        htmlTree += "<div class='row'>"
        this.baseNode.children.forEach(child => {

            htmlTree += "<div class='col children'>"
            htmlTree += child.draw()
            htmlTree += "</div>"
        })
        htmlTree += "</div>"

        htmlTree += "</div>"
        this.baseHtml.append(htmlTree)
    }
}

class Node {
    id
    level
    values
    children
    leaf

    parent
    htmlParent

    constructor(id, level) {
        this.id = id
        this.level = level
        this.values = []
        this.children = []
        this.leaf = 1
    }

    addKey(keyToAdd) {

        // add directly to node
        if (this.canAddKeyToThis() && this.leaf) {
            this.values.push(keyToAdd)
            console.log(tree)
            return true;
        }

        // add to children if possible
        if (this.children.length > 0) {

            for (let i = 0; i < this.values.length; i++) {
                if (keyToAdd > this.values[i]) {
                    this.children[i+1].addKey(keyToAdd)
                }
            }

        }

        // create new node
        else {
            console.warn("starting uplift")
            this.handleUplift(keyToAdd)
        }


    }

    addKeys(keys) {
        keys.forEach(key => this.addKey(key))
    }

    handleUplift(keyToAdd) {
        let upliftKey = this.getMiddleUplift(keyToAdd)
        let leftKeys = this.getLeftUplift(upliftKey)
        let rightKeys = this.getRightUplift(upliftKey)

        let leftNode = new Node(2, 3)
        leftNode.addKeys(leftKeys)
        leftNode.parent = this
        this.addChild(leftNode)

        let rightNode = new Node(3, 3)
        rightNode.addKeys(rightKeys)
        rightNode.parent = this
        this.addChild(rightNode)

        this.values = [upliftKey]
    }

    getMiddleUplift(key) {
        let keys = this.values
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

    getLeftUplift(middle) {
        return this.values.filter((number) => { return number < middle})
    }

    getRightUplift(middle) {
        return this.values.filter((number) => { return number > middle})
    }

    addChild(node) {
        if (this.canHaveMoreChild()) {
            this.children.push(node)
            this.leaf = 0
        } else {
            console.error("too much children for node "+ this)
        }
    }

    draw() {

        let htmlChild = "<div>"

        this.children.forEach(child => {
            htmlChild += child.values
        })

        htmlChild += "<div>"

        return `<div class="col node">${this.values}</div>`


    }

    canAddKeyToThis() {return this.values.length < TREEORDER}
    canHaveMoreChild() { return this.children.length < TREEORDER }

}

const tree = new Tree(0, "Tree 1", $keysInTree)
tree.addNode(new Node(0, 0))




window.addEventListener("keydown", (e) => {

    let event

    if (e.key !== undefined) {
        event = e.key
    } else {
        event = e.originalEvent.key
    }

    switch (event) {
        case "Enter":
            console.log("adding key "+$keyToAdd.text()+" to tree")
            tree.addKey(parseInt($keyToAdd.text()))
            $keyToAdd.text("")
            tree.draw()
            break;

        case "Backspace":
            console.log("delete number "+$keyToAdd.text().slice(0, -1))
            $keyToAdd.text($keyToAdd.text().slice(0, -1))
            break;

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            $keyToAdd.text($keyToAdd.text() + event)
            break;

        default:
            break;

    }
})

$(window).on('load', e => {

    setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': '1'
        }));
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': 'Enter'
        }));
    }, 500)

    setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': '2'
        }));
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': 'Enter'
        }));
    }, 500)

    setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': '3'
        }));
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': 'Enter'
        }));
    }, 500)

    setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': '4'
        }));
        window.dispatchEvent(new KeyboardEvent('keydown', {
            'key': 'Enter'
        }));
    }, 500)

})



