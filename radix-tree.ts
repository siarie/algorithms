// So, this is how web routing works(?)
//
// TODO:
//    1. Support parameter and wildcard
//    2. Support different methods

type Handler = () => void

class RadixTreeNode {
  path: string;
  children: Map<string, TrieNode>;
  handler?: Handler;
  param?: string;
  wildcard: boolean;

  constructor() {
    this.path = "";
    this.children = new Map();
    this.handler = null;
    this.param = null;
    this.wildcard = false;
  };
}

class RadixTree {
  root: RadixTreeNode;

  constructor() {
    this.root = new RadixTreeNode();
  }

  splitPath(path: string): string[] {
    return path.split("/").filter(segment => segment.length > 0);
  }

  add(path: string, handler: Handler) {
    let node = this.root;
    const segments = this.splitPath(path);
    if (segments.length === 0) {
      node.handler = handler;
      return
    }

    for (let s = 0; s < segments.length; s++) {
      const segment = segments[s];


      
      if (!node.children.has(segment)) {
        const n = new RadixTreeNode();
        n.path = segment;
        n.children = new RadixTreeNode();
        n.handler = handler;

        node.children.set(segment, n);
      }

      node = node.children.get(segment);
    }
  }

  match(path: string): Handler | null {
    let node = this.root;
    const segments = this.splitPath(path);

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (!node.children.has(segment)) {
        return null;
      }

      return node.children.get(segment);
    }

    return node;
  }
}



(() => {
  const r = new RadixTree();

  r.add("/", () => "this is a homepage");
  r.add("/about", () => "this is a about page");
  r.add("/news", () => "this is a news page");

  const path = process.argv.slice(2);
  if (path.length === 0) {
    console.error("need at least 1 argument");
    return;
    
  }
  const pathNode = r.match(path[0]);
  console.log(path + ":", pathNode && pathNode.handler ? pathNode.handler(): "404 Not found");
})();
