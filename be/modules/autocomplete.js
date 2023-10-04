// /**
//  * @param {string[]} products
//  * @param {string} searchWord
//  * @return {string[][]}
//  */

// let getSuggestedUnis = (all_unis, searchTerm, numReturn = 3) => {
//     all_unis.sort()

//     let Trie = () => {
//         this.children = {};
//     }

//     Trie.prototype.addWord = (word) => {
//         let curr = this;

//         for (let i = 0; i < word.length; i++) {
//             const char = word.charAt(i);

//             if (!curr.children[char]) {
//                 curr.children[char] = new Trie();
//             }

//             curr = curr.children[char];
//         }

//         curr.word = word;
//     }

//     let t = new Trie();

//     for (const uni of all_unis) {
//         t.addWord(uni);
//     }

//     const output = [];

//     for (let i = 0; i < searchTerm.length; i++) {
//         const char = searchTerm.charAt(i);
//         t = !!t ? t.children[char] : null;
//         output.push(!!t ? dfs(t) : []);
//     }

//     return output;

//     let dfs = (node, output = []) => {
//         if (!!node.word) {
//             output.push(node.word);
//         }

//         for (const child in node.children) {
//             dfs(node.children[child], output);
//         }

//         return output.length >= numReturn ? output.slice(0, numReturn) : output;
//     }
// }


class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode();
            }
            node = node.children[word[i]];
        }
        node.isWord = true;
    }

    suggestHelper(root, list, curr) {
        if (root.isWord) {
            list.push(curr);
        }
        if (!Object.keys(root.children).length) {
            return;
        }
        for (let child in root.children) {
            this.suggestHelper(root.children[child], list, curr + child);
        }
    }

    suggest(prefix) {
        let node = this.root;
        let curr = "";

        for (let i = 0; i < prefix.length; i++) {
            if (!node.children[prefix[i]]) {
                return [];
            }
            node = node.children[prefix[i]];
            curr += prefix[i];
        }

        let list = [];
        this.suggestHelper(node, list, curr);
        return list;
    }
}

module.exports = {
    Trie
}