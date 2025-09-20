class Node<T>{
    value: T;
    prev: Node<T>;
    next: Node<T>;

    constructor(value: T){
        this.value = value;
    }
}

export class LinkedList<T>{
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private length: number = 0;

    append(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this.length++;
  }

  size(): number {
    return this.length;
  }

  printList(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}