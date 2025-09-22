class Node<T>{
  value: T;
  prev: Node<T> | null = null;
  next: Node<T> | null = null;

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

  delete(value: T): void{
    let current = this.head;
    while(current){
      if(current.value == value){
        if(current == this.head){
          this.head = current.next;
          if(!this.head) this.tail = null;
          if(this.head) this.head.prev = null;
        }
        else if(current == this.tail){
          this.tail = current.prev;
          if(this.tail) this.tail.next = null;
        }
        else{
        current.next.prev = current.prev;
        current.prev.next = current.next;
        }
        this.length--;
        break;
      }
      current= current.next
    }
  }

  size(): number {
    return this.length;
  }

  search(value: T): number | null{
    let cnt:number = 1;
    let current = this.head;
    while(current){
      if(current.value == value) return cnt;
      cnt++;
      current = current.next;
    }
    return null;
  }

  getFirst(): T|null{
    let current = this.head;
    if(current) return current.value;
    else return null;
  }
  getLast(): T|null{
    let current = this.tail;
    if(current) return current.value;
    else return null;
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
  printListReverse(): T[] {
    const result: T[] = [];
    let current = this.tail;
    while(current) {
      result.push(current.value);
      current = current.prev;
    }
    return result;
  }
}