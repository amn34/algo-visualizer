const max = 300;
const n = 10000;
const delay = 1;
let stopSorting = false;
let baseArr = [];


function generateArray() {
    baseArr = [];

    for (let i = 0; i < n; i++) {
        baseArr.push(getRandomInt(max));
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Map the button names to the function they should call
let nsquaredAlgorithms = {
    "Bubble": [bubblesort, true],
    "Gnome": [gnomesort, true],
    "Insertion": [insertionsort, true],
    "Comb": [combsort, true]
}

let nlognAlgorithms = {

}

async function bubblesort(arr) {
    if (!nsquaredAlgorithms["Bubble"][1]) {
        console.log("Please wait until the Bubble algorithm is finished")
        return;
    }

    nsquaredAlgorithms["Bubble"][1] = false;

    const name = 'Bubble Sort O(n²)'
    const canvas = document.getElementById("bubblesort");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();
    let numSwaps = 0
    let swappedIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                numSwaps++
                swappedIndex = j
                display(canvas, ctx, arr, swappedIndex, numSwaps, Date.now() - startTime, name)
                await new Promise(r => setTimeout(r, delay))
            }
        }
    }
    const endTime = Date.now();
    console.log("Bubble Sort: " + getSeconds((endTime - startTime) - (numSwaps * delay)))
    nsquaredAlgorithms["Bubble"][1] = true;
}

//async function mergersort() {}

async function insertionsort(arr) {

    nsquaredAlgorithms["Insertion"][1] = false;

    const name = 'Insertion Sort O(n²)'
    const canvas = document.getElementById("insertionsort");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();
    let numSwaps = 0
    let swappedIndex = 0;

    let i = 1;
    while (i < arr.length) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            j -= 1;
            numSwaps++;
            swappedIndex = j;
            display(canvas, ctx, arr, swappedIndex, numSwaps, Date.now() - startTime, name)
            await new Promise(r => setTimeout(r, delay))
        }
        i += 1;

    }

    const endTime = Date.now();
    console.log("Insertion Sort: " + getSeconds((endTime - startTime) - (numSwaps * delay)))
    nsquaredAlgorithms["Insertion"][1] = true;
}


async function selectionsort() { }


// Bottom up (Iterative implementation)
async function mergeStart(arr) {
    const name = 'Merge Sort O(nlogn)'
    const canvas = document.getElementById("mergesort");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();
    let numSwaps = 0
    let swappedIndex = 0;
    mergesort(arr, name, canvas, ctx, startTime, numSwaps, swappedIndex);

    const endTime = Date.now();
    console.log("Merge Sort: " + getSeconds((endTime - startTime) - (numSwaps * delay)))
}

async function mergesort(arr, name, canvas, ctx, startTime, numSwaps, swappedIndex) {
    let n = arr.length;
    
    if (n > 1) {
        const mid = Math.floor(n / 2);
        let left = [];
        for (let i=0; i<mid; i++) left.push(arr[i]);

        let right = [];
        for (let i=mid; i<n; i++) right.push(arr[i]);

        mergesort(left, name, canvas, ctx, startTime, numSwaps, swappedIndex);
        mergesort(right, name, canvas, ctx, startTime, numSwaps, swappedIndex);

        let i=0, j=0, k=0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k] = left[i];
                numSwaps++;
                swappedIndex = i;
                i += 1;
                
            } else {
                arr[k] = right[j];
                numSwaps++;
                swappedIndex = j;
                j += 1;
            }

            k += 1;
        } 


        while(i < left.length) {
            arr[k] = left[i];
            i++;
            k++;
            swappedIndex = i;
        }
        
        while(j < right.length) {
            arr[k] = right[j];
            j++;
            k++;
            swappedIndex = j;
        }

        display(canvas, ctx, arr, mid, numSwaps, Date.now() - startTime, name)
        await new Promise(r => setTimeout(r, delay))

    }
}



async function heapsort() { }
async function shellsort() { }


async function countingsort() { }

async function combsort(arr) {
    nsquaredAlgorithms["Comb"][1] = false;

    let gap = arr.length;
    let shrinkFactor = 1.3;
    let sorted = false;

    const name = 'Comb Sort O(n²)'
    const canvas = document.getElementById("combsort");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();
    let numSwaps = 0
    let swappedIndex = 0;

    while (!sorted) {
        gap = Math.floor(gap / shrinkFactor);

        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }

        let i = 0;

        while (i + gap < arr.length) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                sorted = false;
                numSwaps++;
                swappedIndex = i;

                display(canvas, ctx, arr, swappedIndex, numSwaps, Date.now() - startTime, name)
                await new Promise(r => setTimeout(r, delay))
            }

            i += 1;
        }
    }

    const endTime = Date.now();
    console.log("Comb Sort: " + getSeconds((endTime - startTime) - (numSwaps * delay)))
    nsquaredAlgorithms["Comb"][1] = true;
}

async function gnomesort(arr) {
    if (!nsquaredAlgorithms["Gnome"][1]) {
        console.log("Please wait until the Gnome algorithm is finished")
        return;
    }

    nsquaredAlgorithms["Gnome"][1] = false;

    const name = 'Gnome Sort O(n²)'
    const canvas = document.getElementById("gnomesort");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();
    let numSwaps = 0;
    let swappedIndex = 0;

    let i = 0;

    while (i < arr.length) {
        if (i == 0) {
            i += 1;
        }

        if (arr[i] >= arr[i - 1]) {
            i += 1;
        } else {
            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            i -= 1;
            numSwaps++;
            swappedIndex = i
            display(canvas, ctx, arr, swappedIndex, numSwaps, Date.now() - startTime, name)
            await new Promise(r => setTimeout(r, delay))
        }
    }
    const endTime = Date.now();
    console.log("Gnome Sort: " + getSeconds((endTime - startTime) - (numSwaps * delay)))
    nsquaredAlgorithms["Gnome"][1] = true;
}


async function bogosort(arr) { }



function swap(arr, left, right) {
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp;
}

async function partitionHigh(arr, low, high, swaps, name, canvas, ctx, startTime) {
    //Pick the first element as pivot
    let pivot = arr[high];
    let i = low;

    //Partition the array into two parts using the pivot
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            swap(arr, i, j);
            i++;
            swaps.swaps++;
            display(canvas, ctx, arr, i, swaps.swaps, Date.now() - startTime, name)
            await new Promise(r => setTimeout(r, delay))
        }
    }
    swaps.swaps++;
    swap(arr, i, high);
    display(canvas, ctx, arr, i, swaps.swaps, Date.now() - startTime, name)
    await new Promise(r => setTimeout(r, delay))
    //Return the pivot index
    return i;
}

async function quicksort(arr) {

    const name = 'Quicksort O(nlogn)'
    const canvas = document.getElementById("quicksort");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();

    //Stack for storing start and end index
    let stack = [];

    //Get the start and end index
    let start = 0;
    let end = arr.length - 1;
    const swaps = {
        swaps: 0
    }
    
    //Push start and end index in the stack
    stack.push({ x: start, y: end });

    //Iterate the stack
    while (stack.length) {
        //Get the start and end from the stack
        const { x, y } = stack.shift();

        //Partition the array along the pivot
        const PI = await partitionHigh(arr, x, y, swaps, name, canvas, ctx, startTime);

        //Push sub array with less elements than pivot into the stack
        if (PI - 1 > x) {
            stack.push({ x: x, y: PI - 1 });
        }

        //Push sub array with greater elements than pivot into the stack
        if (PI + 1 < y) {
            stack.push({ x: PI + 1, y: y });
        }
    }
    console.log(arr);
}

function display(canvas, ctx, arr, swappedIndex, numSwaps, timeElapsed, name) {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < arr.length; i++) {
        const rectX = i * (canvas.width / n);
        const rectY = canvas.height - (arr[i] / max * canvas.height)
        const rectWidth = 5;
        const rectHeight = (arr[i] / max * canvas.height);
        ctx.fillStyle = i == swappedIndex ? 'red' : 'green';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    }
    ctx.fillStyle = 'white'
    ctx.font = '20px serif';
    ctx.fillText(name, 10, 30);
    ctx.fillText("Time: " + getSeconds(timeElapsed) + "s", 10, 50);
    ctx.fillText(`Number of swaps: ${numSwaps}`, 10, 70);
}




function getSeconds(ms) {
    return (ms / 1000).toFixed(4);
}

function finished() {
    // somethng something make rectangle black
}

generateArray(n);
bubblesort([...baseArr])
gnomesort([...baseArr])
combsort([...baseArr])
insertionsort([...baseArr])
mergeStart([...baseArr])
quicksort([...baseArr]);



//quicksort([...baseArr], 0, baseArr.length)
// when button clicked generate a new array and call the respective sorting algorithm
const nsquared = document.getElementById("n^2");

nsquared.addEventListener('click', (event) => {
    const nameOfAlgorithm = event.target.innerText;
    let finished = true;
    for (let algorithm of Object.keys(nsquaredAlgorithms)) {
        finished = finished && nsquaredAlgorithms[algorithm][1]
    }
    if (!finished) {
        console.log("still waiting");
        return;
    }
    console.log("rerunning");
    generateArray(n);
    for (let algorithm of Object.keys(nsquaredAlgorithms)) {
        nsquaredAlgorithms[algorithm][0]([...baseArr])
    }
});