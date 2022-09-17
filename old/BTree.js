class Tree {

    constructor(base) {
        this.nodes = []
        this.base = base
    }

    add(key) {
        if (this.nodes.length === 0) {
            this.nodes.push(new Node(key, 0, undefined,this.base))
        } else {
            this.nodes[0].add(key)
        }

        this.draw()
    }

    draw() {
        // reset tree
        this.base.empty()

        // draw children
        this.nodes.forEach(node => {
            let testNode = node

            if (node.leaf) {
                node.draw()
            } else {
                while (!testNode.leaf) {
                    testNode.children.forEach(childNode => {
                        childNode.draw()
                        testNode = childNode
                    })
                }
            }


        })
    }
}

