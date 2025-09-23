class Node<T>{
  value: T; // 노드가 저장하는 값
  prev: Node<T> | null = null; // 이전 노드를 가리키는 포인터
  next: Node<T> | null = null; // 다음 노드를 가리키는 포인터

  constructor(value: T){
      this.value = value; // 노드 생성 시 값 초기화
  }
}

export class LinkedList<T>{
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private length: number = 0;

  // 리스트의 마지막에 노드를 추가
  append(value: T): void {
    const newNode = new Node(value);
    if(!this.head) { // 리스트가 비어있을 경우
      this.head = newNode;
      this.tail = newNode;
    } else { // 리스트에 노드가 이미 있을 경우
      if(this.tail) {
        newNode.prev = this.tail; 
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this.length++;
  }

  // 주어진 값과 일치하는 첫 번째 노드를 삭제
  delete(value: T): void{
    let current = this.head;
    while(current){
      if(current.value == value){
        if(current == this.head){ // 삭제할 노드가 head일 경우
          this.head = current.next;
          if(!this.head) this.tail = null; // 리스트에 노드가 하나뿐이라면 tail도 null로 설정해야함
          if(this.head) this.head.prev = null;
        }
        else if(current == this.tail){ // 삭제할 노드가 tail일 경우
          this.tail = current.prev;
          if(this.tail) this.tail.next = null;
        }
        else{ // 삭제할 노드가 중간에 있을 경우
          if (current.next) {
              current.next.prev = current.prev;
          }
          if (current.prev) {
              current.prev.next = current.next;
          }
        }
        //삭제할 노드에 대하여 양옆 노드를 이어주고난 후 삭제된 노드는 메모리에 그대로 남아있는것 아닌가?
        // GPT - 가비지 컬렉터가 더 이상 참조되지 않는 객체를 메모리에서 해제한다. ,, 해당부분이 정말로 이렇게 작동하는건지 궁금합니다.
        this.length--;
        break;
      }
      current= current.next
    }
  }

  // 리스트의 현재 길이를 반환
  size(): number {
    return this.length;
  }

  // 주어진 값에 해당하는 노드의 위치를 찾아 인덱스 반환
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

  // 리스트의 첫 번째 노드 값을 반환
  getFirst(): T|null{
    let current = this.head;
    if(current) return current.value;
    else return null;
  }

  // 리스트의 마지막 노드 값을 반환
  getLast(): T|null{
    let current = this.tail;
    if(current) return current.value;
    else return null;
  }

  // 리스트의 노드들을 순서대로 배열로 만들어 반환
  printList(): T[] {
    const result: T[] = [];
    let current = this.head;
    while(current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  // 리스트의 노드들을 역순으로 배열로 만들어 반환
  printListReverse(): T[] {
    const result: T[] = [];
    let current = this.tail; //tail부터 시작하여, head로 가기
    while(current) {
      result.push(current.value);
      current = current.prev;
    }
    return result;
  }
}