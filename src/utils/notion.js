const { Client } = require('@notionhq/client');
const vscode = require('vscode');

const extensionSettings = vscode.workspace.getConfiguration('vscodenotion');

const notion = new Client({ auth: extensionSettings.get('token') });
const databaseId = extensionSettings.get('database');

async function getItems() {
    const response = await notion.databases.query({
        database_id: databaseId,
    });
    return response
}

async function createItem(text) {
    const response = await notion.pages.create({
        parent: {
            database_id: databaseId,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: text,
                        },
                    },
                ],
            },
        },
    });
    return response
}

async function getPage(page_id) {
    const response = await notion.pages.retrieve({
        page_id: page_id,
    });
    return response
}

async function getBlocks(page_id) {
    const response = await notion.blocks.children.list({
        block_id: page_id,
    });
    return response
}

async function getBlock(block_id) {
    const response = await notion.blocks.retrieve({
        block_id: block_id,
    });
    return response
}

module.exports = {
    getItems,
    createItem,
    getPage,
    getBlocks,
    getBlock,
};