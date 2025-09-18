// undefine => "값"
// []는 빈 배열이지 undefine는  아님, [undefine,1] 같이 요소안에서 정의되지않은 값같은거임  


//order 값 제한하는법 고민하기
export function simpleSort(arr: number[], order: "asc" | "desc" = "asc"): number[] {
    const sortedArr = [...arr]; //인자로 들어온 것은 값을 변경하지말고, 활용해야할때는 복사해서사용
    for(let i = 0; i < arr.length-1; i++){
        for(let j = 0; j < arr.length-i-1; j++){
            if (
                (order === "asc" && sortedArr[j] > sortedArr[j + 1]) ||
                (order === "desc" && sortedArr[j] < sortedArr[j + 1]) //각 경우에 따라 조건
            ){
                const temp = sortedArr[j];
                sortedArr[j] = sortedArr[j+1];
                sortedArr[j+1] = temp;
            }
        }
    }
    return sortedArr;
}