class ListNode<T> {
  data: T;
  next?: ListNode<T>;

  constructor(data: T, next: ListNode<T> | undefined = undefined) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList<T> {
  head?: ListNode<T>;

  constructor() {};

  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  // Insert node at the begining
  insert(data: T) {
    const node = new ListNode(data);
    node.next = this.head;
    this.head = node;
  }

  append(data: T) {
    const node = new ListNode(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    let current = this.head;
    while(current.next) {
      current = current.next
    }

    current.next = node;
  }

  // linked list are 0-indexed
  insertAt(position: number, data: T) {
    if (position === 0) {
      this.insert(data);
      return;
    }

    const node = new ListNode(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      if (!current.next) break;
      current = current.next;
    }

    node.next = current.next;
    current.next = node;
  }

  shift() {
    this.head = this.head?.next;
  }

  pop() {
    let current = this.head;
    while(current?.next?.next) {
      current = current.next
    }

    current!.next = undefined;
  }

  // Search data and return the position
  search(data: T): number {
    let current = this.head;
    let position = 0;
    while(current) {
      if (current.data === data) return position;
      current = current.next;
      position += 1;
    }

    return -1;
  }
}

const list = new LinkedList<string>();
list.head = new ListNode("head");

// const secondNode = new ListNode("2nd");
// const thirdNode = new ListNode("3rd");
// secondNode.next = thirdNode;
// list.head.next = secondNode;

list.append("2nd");
list.append("3th");

console.log("--- Insert ---");
list.insert("new head");
list.print();

console.log("--- Append ---");
list.append("4th")
list.print();

console.log("--- Insert At---")
list.insertAt(2, "1st");
list.insertAt(0, "new new head");
list.insertAt(10, "last")
list.print();

console.log("--- shift/pop---")
list.shift();
list.pop();
list.print();

console.log("--- search ---")
console.log(
  list.search("head"),
  list.search("3th"),
  list.search("non-existen"),
)
