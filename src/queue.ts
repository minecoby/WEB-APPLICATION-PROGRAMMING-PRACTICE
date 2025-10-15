//앞 뒤로 넣고 빼고 해야하는 구조 => 연결리스트 구현한걸 활용

class Node<T>{
  value: T; // 노드가 저장하는 값
  prev: Node<T> | null = null; // 이전 노드를 가리키는 포인터
  next: Node<T> | null = null; // 다음 노드를 가리키는 포인터

  constructor(value: T){
      this.value = value; // 노드 생성 시 값 초기화
  }
}

export class Queue<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size: number = 0;

  //스택/큐의 맨 뒤에 새로운 요소 추가
  push(item: T): void {
    const newNode = new Node(item);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this._size++;
  }

  //스택의 맨 위 요소를 제거하고 반환
  pop(): T | undefined {
    if (!this.head || !this.tail) {
      return undefined;
    }

    const value = this.tail.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
    }

    this._size--;
    return value;
  }

  enqueue(item: T): void {
    this.push(item);
  }

  dequeue(): T | undefined {
    if (!this.tail || !this.head) {
      return undefined;
    }

    const value = this.head.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.prev = null;
    }

    this._size--;
    return value;
  }

  //현재 저장된 요소의 개수 반환
  get size(): number {
    return this._size;
  }

  //리스트가 비어있는지 여부 반환
  isEmpty(): boolean {
    return this._size === 0;
  }

  top(): T | undefined {
    return this.tail?.value;
  }

  front(): T | undefined {
    return this.head?.value;
  }
  
}