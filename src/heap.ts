type CompareFunction<T> = (a: T, b: T) => number;

export class Heap<T>{
    protected heap: T[] = [];
    private compare: CompareFunction<T>;

    constructor(compareFn: CompareFunction<T>) {
    this.compare = compareFn;
    }

    private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
    }

    private getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    private swap(i : number, j : number): void{
        if(this.heap[j] !== undefined && this.heap[i] !== undefined) {
            [this.heap[i],this.heap[j]] = [this.heap[j],this.heap[i]];
        }
    }

    public size(){
        return this.heap.length;
    }

    public isEmpty(){
        return this.size() === 0;
    }

    public peek(){
        if (this.isEmpty()) throw Error();
        return this.heap[0];
    }

    public push(value: T){
        this.heap.push(value);

        let nodeIndex = this.heap.length - 1;

        while (nodeIndex > 0) {
        const parentIndex = this.getParentIndex(nodeIndex);

        if (this.compare(this.heap[nodeIndex]!, this.heap[parentIndex]!) < 0) {
            this.swap(nodeIndex, parentIndex);
            nodeIndex = parentIndex; 
        } else {
            break;
        }
        }
    }

    public pop(): T|undefined{
        if(this.isEmpty()) throw Error();
        if(this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        const last = this.heap.pop();
        if(last !== undefined) this.heap[0] = last;

        let parentIndex = 0;
        const length = this.heap.length;
        while (this.getLeftChildIndex(parentIndex) < length) {
            let priorityChildIndex = this.getLeftChildIndex(parentIndex);
            const rightChildIndex = this.getRightChildIndex(parentIndex);
            if(rightChildIndex < length && this.compare(this.heap[rightChildIndex]!,this.heap[priorityChildIndex]!) < 0) priorityChildIndex = rightChildIndex;
            if(this.compare(this.heap[parentIndex]!,this.heap[priorityChildIndex]!) <= 0) break;
            this.swap(parentIndex,priorityChildIndex)

            parentIndex = priorityChildIndex;
        }

        return root;
    }
}