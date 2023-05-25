function pickFirstItems(list, count) {
    return list.splice(0, count);
}

function middle(list) {
    return Math.floor((list.length - 1) / 2);
}

let comparisons = 1;

function compare(a, b) {
    comparisons++;
    return a > b ? 'more-important' : 'less-important';
}

function nextIndexToCompareAgainst(verdict, currentIndex, length) {
    let nextIndex;
    if (verdict === 'more-important') {
        nextIndex = Math.floor(currentIndex / 2);
    } else {
        nextIndex = Math.floor((currentIndex + length - 1) / 2);
    }
    return nextIndex !== currentIndex ? nextIndex : null;
}

function insert(list, item, index) {
    list.splice(index, 0, item)
}

const unprioritizedItems = [1, 2, 3, 4, 5, 6, 7, 8];
console.log('unprioritized items: ', unprioritizedItems);
const firstItemsToPrioritize = pickFirstItems(unprioritizedItems, 2);
let prioritizedItems;
// the verdict must be given by the user
let verdict = compare(firstItemsToPrioritize[0], firstItemsToPrioritize[1]);
if (verdict === 'more-important') {
    prioritizedItems = [firstItemsToPrioritize[0], firstItemsToPrioritize[1]];
} else {
    prioritizedItems = [firstItemsToPrioritize[1], firstItemsToPrioritize[0]];
}
while (unprioritizedItems.length > 0) {
    const itemToInsert = pickFirstItems(unprioritizedItems, 1)[0];
    let currentIndex = middle(prioritizedItems);
    let itemToCompareAgainst = prioritizedItems[currentIndex];
    while (currentIndex !== null) {
        let verdict = compare(itemToInsert, itemToCompareAgainst);
        let lastIndex = currentIndex;
        currentIndex = nextIndexToCompareAgainst(verdict, currentIndex, prioritizedItems.length);
        if (currentIndex == null) {
            insert(prioritizedItems, itemToInsert, lastIndex);
        }
    }
}

console.log('number of comparisons needed to prioritize list was: ', comparisons)
console.log(prioritizedItems)

