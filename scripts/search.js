const max = 10;
const n = 25;
const delay = 1;
let stopSorting = false;
let baseArr = [];
let target = 0;

function generateArray() {
    baseArr = [];
    let template = "";
    for(let i = 0; i < n; i++) {
        baseArr.push(getRandomInt(max));
        template += baseArr[i] + " ";
        if (i % 25 == 0 && i != 0) {
            template += "<br/>"
        }
    }   

    $("#show-array").html(template);
    $("#show-array").css("textAlign", "center");
}

function generateTarget() {
    target = getRandomInt(max);

    $("#show-array").append("<br/>The target: " + target);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
} 

// Unsorted
async function Linear(arr, target) {
    let indiciesChecked = 0;
    let indexFound = -1;

    for (let i=0; i<arr.length; i++)  {
        indiciesChecked += 1;

        if (arr[i] == target) {
            console.log("L found: " + i);
            // display here
            return i;
        }
    }

    console.log("not found");
    console.log("Indicied Checked L: " + indiciesChecked);
    // display not found
    return -1;
}

async function Selection(arr, target) {

}

// Strictly increasing then decreasing list or vice versa
async function Ternary(arr, target) {

}

// Sorted
async function BinarySearch(arr, target) {
    let indiciesChecked = 0;
    let indexFound = -1;
    
    arr.sort(function(a, b) {
        return a - b;
    });

        
    let low = 0, high = arr.length;
    
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);
        indiciesChecked += 1;

        if (target == arr[mid]) {
            console.log("B found: " + mid);
            // display here


            return mid;
        } else if (target > arr[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    // The Competitive Programming Way
    // let p = 0;
    // for (let a=arr.length; a>=1; a /=2) {
    //     while (p+a < arr.length & arr[p+a] <= target) p += a;
    // }

    console.log("Indicied Checked B: " + indiciesChecked);
}

// This one is a doozy
async function FibonacciSearch(arr, target) {

}

// Find Max sub-array of any size
async function Kadanes(arr) {

}

// rework to draw boxes instead of lines
function display(canvas, ctx, arr, swappedIndex, numSwaps, timeElapsed, name) {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0 ; i < arr.length; i++) {
        const rectX = i * (canvas.width / n);
        const rectY = canvas.height - (arr[i] / max * canvas.height)
        const rectWidth  = 5;
        const rectHeight = (arr[i] / max * canvas.height);
        ctx.fillStyle = i == swappedIndex ? 'red': 'green';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    }
    ctx.fillStyle = 'white'
    ctx.font = '20px serif';
    ctx.fillText(name,  10, 30);
    ctx.fillText("Time: " + getSeconds(timeElapsed) + "s",  10, 50);
    ctx.fillText(`Number of swaps: ${numSwaps}`, 10, 70);
}

function getSeconds(ms) {
    return (ms / 1000).toFixed(4);
}

generateArray();
generateTarget();

Linear([...baseArr], target);
BinarySearch([...baseArr], target);