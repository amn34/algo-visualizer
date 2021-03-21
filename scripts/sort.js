const max = 300;
const baseArr = [];
const n = 100;

function generateArray() {
    for(let i = 0; i < n; i++) {
        baseArr.push(getRandomInt(max));
    }   
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
} 


async function bubblesort(arr) {
    const name = 'Bubble Sort O(n^2)'
    const canvas = document.getElementById("bubblesort");
    let numSwaps = 0
    let swappedIndex = 0;
    for(let i = 0 ; i < arr.length; i++) {
        for(let j = 0 ; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                numSwaps++;
                swappedIndex = j

                display(canvas, arr, swappedIndex, numSwaps, name)
                await new Promise(r => setTimeout(r, 3))
            }
        }
    }
    console.log(arr);
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

async function gnomesort(arr) {
    const name = 'Gnome Sort O(n^2)'
    const canvas = document.getElementById("gnomesort");

    let i = 0;
    let numSwaps = 0;
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

            display(canvas, arr, swappedIndex, numSwaps, name)
            await new Promise(r => setTimeout(r, 3))
        }


    }
    console.log(arr);
}


async function bogosort(arr) {}

function display(canvas, arr, swappedIndex, numSwaps, name) {
    const ctx = canvas.getContext('2d');
    console.log(ctx);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0 ; i < arr.length; i++) {
        const rectX = i * (canvas.width / n);
        const rectY = canvas.height - (arr[i] / max * canvas.height)
        const rectWidth  = 5;
        const rectHeight = (arr[i] / max * canvas.height);
        ctx.fillStyle = i == swappedIndex ? 'blue': 'green';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    }

    ctx.font = '20px serif';
    ctx.fillText(name,  10, 30);
    ctx.fillText(`Number of swaps: ${numSwaps}`, 10, 50);
}

function finished() {
    // somethng something make rectangle black
}

generateArray(n);
bubblesort([...baseArr])
gnomesort([...baseArr])
