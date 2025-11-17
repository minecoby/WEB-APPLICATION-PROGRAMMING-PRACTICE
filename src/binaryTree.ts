//insert에 들어오는 값의순서나 remove했을때 원소값의 출력을 보면 이진검색트리? 구현

export class BinaryTree<T>{
    private arr: (T | null)[];

    constructor() {
    this.arr = [];
  }

  // 트리에 새 값 삽입
  insert(value: T): void {
    let currentIndex = 0;

    if (this.arr[0] == null) {
      this.arr[0] = value;
      return;
    }

    while (true) {
      const currentNodeValue = this.arr[currentIndex];
      if (currentNodeValue == null) {
        this.arr[currentIndex] = value;
        break;
      }
      if (value < currentNodeValue) {
        currentIndex = 2 * currentIndex + 1;
      } else {
        currentIndex = 2 * currentIndex + 2;
      }
    }
  }

  // 트리에서 특정 값을 검색하여 반환 (없으면 null)
  search(value: T): T | null {
    let currentIndex = 0;

    while (this.arr[currentIndex] != null) {
      const currentNodeValue = this.arr[currentIndex];
      if (value === currentNodeValue) {
        return value;
      } else if (value < currentNodeValue!) {
        currentIndex = 2 * currentIndex + 1;
      } else {
        currentIndex = 2 * currentIndex + 2;
      }
    }

    return null;
  }

  // 트리 중위 순회 
  inOrderTraversal(): T[] {
    const result: T[] = [];
    const stack: number[] = [];
    let currentIndex = 0;

    while (
      stack.length > 0 ||
      (currentIndex < this.arr.length && this.arr[currentIndex] != null)
    ) {
      while (currentIndex < this.arr.length && this.arr[currentIndex] != null) {
        stack.push(currentIndex);
        currentIndex = 2 * currentIndex + 1;
      }

      const nodeIndex = stack.pop()!;
      result.push(this.arr[nodeIndex]!);
      currentIndex = 2 * nodeIndex + 2;
    }

    return result;
  }
  
  // 트리 전위 순회
  preOrderTraversal(): T[] {
    const result: T[] = [];
    const stack: number[] = [];

    if (this.arr[0] == null) {
      return result;
    }

    stack.push(0);

    while (stack.length > 0) {
      const nodeIndex = stack.pop()!;

      if (nodeIndex >= this.arr.length || this.arr[nodeIndex] == null) {
        continue;
      }

      result.push(this.arr[nodeIndex]!);

      const rightChildIndex = 2 * nodeIndex + 2;
      if (rightChildIndex < this.arr.length && this.arr[rightChildIndex] != null) {
        stack.push(rightChildIndex);
      }

      const leftChildIndex = 2 * nodeIndex + 1;
      if (leftChildIndex < this.arr.length && this.arr[leftChildIndex] != null) {
        stack.push(leftChildIndex);
      }
    }

    return result;
  }

  // 트리 후위 순회
  postOrderTraversal(): T[] {
    const tempResult: T[] = [];
    const stack: number[] = [];

    if (this.arr[0] == null) {
      return [];
    }

    stack.push(0);

    while (stack.length > 0) {
      const nodeIndex = stack.pop()!;

      if (nodeIndex >= this.arr.length || this.arr[nodeIndex] == null) {
        continue;
      }

      tempResult.push(this.arr[nodeIndex]!);

      const leftChildIndex = 2 * nodeIndex + 1;
      if (leftChildIndex < this.arr.length && this.arr[leftChildIndex] != null) {
        stack.push(leftChildIndex);
      }

      const rightChildIndex = 2 * nodeIndex + 2;
      if (rightChildIndex < this.arr.length && this.arr[rightChildIndex] != null) {
        stack.push(rightChildIndex);
      }
    }

    return tempResult.reverse();
  }
  // 트리 레벨 순서로 순회
  levelOrderTraversal(): T[] {
    if (!this.arr) {
      return [];
    }

    return this.arr.filter(value => value != null) as T[];
  }

  //특정 값의 배열 위치 찾기 (없으면 -1)
  private findNodeIndex(value: T): number {
    let currentIndex = 0;
    while (currentIndex < this.arr.length && this.arr[currentIndex] != null) {
      const currentNodeValue = this.arr[currentIndex]!;
      if (value === currentNodeValue) {
        return currentIndex;
      } else if (value < currentNodeValue) {
        currentIndex = 2 * currentIndex + 1;
      } else {
        currentIndex = 2 * currentIndex + 2;
      }
    }
    return -1;
  }
  //주어진 인덱스의 서브트리에서 최소값 노드의 인덱스 찾기
  private findMinIndex(startIndex: number): number {
    let currentIndex = startIndex;
    let minIndex = startIndex;

    while (
      currentIndex < this.arr.length &&
      this.arr[currentIndex] != null
    ) {
      minIndex = currentIndex;
      currentIndex = 2 * currentIndex + 1;
    }
    return minIndex;
  }
  
  //from인덱스의 서브트리를 to인덱스로 이동
  private moveSubtree(fromIndex: number, toIndex: number): void {
    if (fromIndex >= this.arr.length || this.arr[fromIndex] == null) {
      this.arr[toIndex] = null;
      return;
    }

    this.arr[toIndex] = this.arr[fromIndex];
    this.arr[fromIndex] = null;

    const fromLeft = 2 * fromIndex + 1;
    const toLeft = 2 * toIndex + 1;
    if (fromLeft < this.arr.length) {
      this.moveSubtree(fromLeft, toLeft);
    }

    const fromRight = 2 * fromIndex + 2;
    const toRight = 2 * toIndex + 2;
    if (fromRight < this.arr.length) {
      this.moveSubtree(fromRight, toRight);
    }
  }
  //특정 인덱스의 노드를 이진 검색 트리 규칙에 맞게 삭제
  private removeByIndex(index: number): void {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    const hasLeftChild = leftChildIndex < this.arr.length && this.arr[leftChildIndex] != null;
    const hasRightChild = rightChildIndex < this.arr.length && this.arr[rightChildIndex] != null;

    if (!hasLeftChild && !hasRightChild) {
      this.arr[index] = null;
    } else if (hasLeftChild && !hasRightChild) {
      this.moveSubtree(leftChildIndex, index);
    } else if (!hasLeftChild && hasRightChild) {
      this.moveSubtree(rightChildIndex, index);
    } else {
      // 오른쪽 서브트리에서 가장 작은 값
      const successorIndex = this.findMinIndex(rightChildIndex);
      const successorValue = this.arr[successorIndex]!;
      this.arr[index] = successorValue;
      this.removeByIndex(successorIndex);
    }
  }
  // 트리에서 특정 값을 찾아 삭제
  remove(value: T): void {
    const indexToRemove = this.findNodeIndex(value);
    if (indexToRemove !== -1) {
      this.removeByIndex(indexToRemove);
    }
  }
}