// some array
const arr = [];
const n = 100;
const width = 768;
const height = 760;

const max = 300;

let numSwaps = 0;

for(let i = 0; i < n; i++) {
    arr.push(getRandomInt(max));
}   

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
} 


async function bubblesort() {
    numSwaps = 0
    let swappedIndex = 0;
    for(let i = 0 ; i < arr.length; i++) {
        for(let j = 0 ; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                numSwaps++;
                swappedIndex = j
            }

            display(swappedIndex)

            await new Promise(r => setTimeout(r, 5))
        }
    }
}

//async function mergersort() {}

async function insertionsort() {}
async function selectionsort() {}

async function quicksort() {}
async function mergesort() {}
async function heapsort() {}
async function shellsort() {}

async function countingsort() {}
async function combsort() {}

async function gnomesort() {
    let i = 0;
    numSwaps = 0;
    let swappedIndex = 0;
    while (i < arr.length) {
        if (i == 0) {
            i += 1;
        } 

        if (arr[i] >= arr[i - 1]) {
            i += 1;
        } else {
            [arr[i], arr[i-1]] = [arr[i-1], arr[i]];
            i -= 1;
            numSwaps++;
            swappedIndex = i
        }

        await new Promise(r => setTimeout(r, 5))
        display(swappedIndex)
    }
    console.log(arr);
}


async function bogosort() {}

function display(swappedIndex) {

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0 ; i < arr.length; i++) {
        const rectX = i * (width / n);
        const rectY = height - (arr[i] / max * height)
        const rectWidth  = 5;
        const rectHeight = (arr[i] / max * height);
        ctx.fillStyle = i == swappedIndex ? 'blue': 'green';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    }

    ctx.font = '20px serif';
    ctx.fillText(`Total elements: ${n}`, 10, 30);
    ctx.fillText(`Number of swaps: ${numSwaps}`, 10, 50);
    document.getElementById("numElements").innerHTML = `Total elements: ${n}`;
    document.getElementById("numSwaps").innerHTML = `Number of swaps: ${numSwaps}`;
}

function finished() {
    // somethng something make rectangle black
}

document.getElementById('canvas').focus()
console.log(arr)
//bubblesort()
gnomesort()
