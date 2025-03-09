class ListNode<T> {
    data: T;
    prev?: ListNode<T>;
    next?: ListNode<T>;

    constructor(data: T) {
        this.data = data;
    }
}

class DoubleLinkedList<T> {
    head?: ListNode<T>;

  constructor() { }

  print() {
    let current = this.head;
    while(current) {
      console.log(current.data);
      current = current.next;
    }
  }

  insert(data: T) {
    const node = new ListNode(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    node.next = this.head;
    this.head = node;
  }

  insertAt(position: number, data: T) {
    if (position === 0) {
      this.insert(data);
      return;
    }

    const node = new ListNode(data);
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      if (!current?.next) break;
      current = current.next;
    }

    node.next = current?.next;
    node.prev = current;

    current!.next = node;
  }
}


const list = new DoubleLinkedList<number>();
list.head = new ListNode(3);

list.insert(1);
list.insert(0);
list.print();

console.log("8====> insert at ()")
list.insertAt(2, 2);
list.insertAt(0, -1);
list.print()
