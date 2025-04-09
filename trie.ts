class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map();
    this.isEnd = false;
  };
}

class Trie {
  root: TrieNode;
  
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!node.children.has(ch)) {
        const newTrie = new TrieNode();
        node.children.set(ch, newTrie);
      }

      node = node.children.get(ch)!;
    }

    node.isEnd = true;
  }

  find(key: string): boolean {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      const ch = key[i];
      if (!node.children.has(ch)) {
        return false;
      }

      node = node.children.get(ch)!;

    }

    return node.isEnd
  }
}



(() => {
  const trie = new Trie();
  trie.insert("can");
  trie.insert("car");
  trie.insert("cat");
  trie.insert("glass");

  console.log("can", trie.find("can"));
  console.log("call", trie.find("call"));
  console.log("cat", trie.find("cat"));
  console.log("car", trie.find("car"));
})();
