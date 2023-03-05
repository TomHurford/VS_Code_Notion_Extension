// In here I am going to use the notion file to create a tree structure of a page

const notion = require('./notion');

let tree = {};

async function getTree(page_id) {
    const page = await notion.getBlock(page_id);
    if (page.child_page != null) {
        tree.page = {}
        tree.page.id = page.id;
        tree.page.title = page.child_page.title;
    }
    tree.page.children = await getChildren(page_id);
    expandTree(tree.page);
    return { tree: tree };
    
}

async function getChildren(block_id) {
    const blocks = await notion.getBlocks(block_id);
    const children = [];
    for (var i = 0; i < blocks.results.length; i++) {
        const child = blocks.results[i];
        if (!child.has_children) {
            children.push({
                child,
            });
        } else (
            children.push({
                child,
                children: await getChildren(child.id)
            })
        )
    }
    return children;
}

async function expandTree(block) {
    if(block.children.length != 0) {
        for (var i = 0; i < block.children.length; i++) {
            const child = block.children[i];
            console.log(child.id);
            // console.log(await notion.getBlock(child.id));
            if (child.children != null) {
                expandTree(child);
            }
        }
    }
}

module.exports = {
    getTree
}