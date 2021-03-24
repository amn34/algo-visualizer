const max = 20;
const n = 50;
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
    $("#show-target").html("The target: " + target);
    $("#show-target").css("textAlign", "center");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
} 

// Unsorted
async function Linear(arr, target) {

    const name = 'Linear Search O(n)'
    const canvas = document.getElementById("linearsearch");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();

    let indiciesChecked = 0;

    for (let i=0; i<arr.length; i++)  {
        indiciesChecked += 1;

        display(canvas, ctx, arr, i, indiciesChecked, Date.now() - startTime, name)
        await new Promise(r => setTimeout(r, delay + 50))

        if (arr[i] == target) {
            console.log("L found: " + i);
            // display here
            return i;
        }
    }

    console.log("not found");
    console.log("Indicied Checked L: " + indiciesChecked);

    // display not found
    display(canvas, ctx, arr, -1, indiciesChecked, Date.now() - startTime, name)
    await new Promise(r => setTimeout(r, delay + 100))

    return -1;
}

// Sorted
async function BinarySearch(arr, target) {
    const name = 'Binary Search O(logn)'
    const canvas = document.getElementById("binarysearch");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();

    let indiciesChecked = 0;
    
    arr.sort(function(a, b) {
        return a - b;
    });

        
    let low = 0, high = arr.length;
    
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);
        indiciesChecked += 1;
        display(canvas, ctx, arr, mid, indiciesChecked, Date.now() - startTime, name)
        await new Promise(r => setTimeout(r, delay + 100))

        if (target == arr[mid]) {
            console.log("B found: " + mid);
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

    display(canvas, ctx, arr, -1, indiciesChecked, Date.now() - startTime, name)
    await new Promise(r => setTimeout(r, delay + 100))

    console.log("Indicied Checked B: " + indiciesChecked);
}

async function JumpSearch(arr, target) {

    const name = 'Jump Search O(sqrt(n))'
    const canvas = document.getElementById("jumpsearch");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();
    
    arr.sort(function(a, b) {
        return a - b;
    });
    
    let indiciesChecked = 0;

    let n = arr.length;
    let step = Math.floor(Math.sqrt(n)); // step is the index for 1st while loop
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        indiciesChecked++;
        display(canvas, ctx, arr, step, indiciesChecked, Date.now() - startTime, name)
        await new Promise(r => setTimeout(r, delay + 100))
        if (prev >= n) return -1;
    }

    while (arr[prev] < target) {
        prev++;
        indiciesChecked++;
        display(canvas, ctx, arr, prev, indiciesChecked, Date.now() - startTime, name)
        await new Promise(r => setTimeout(r, delay + 100))

        if (prev == Math.min(step, n)) return -1;

        if (arr[prev] == target) {
            return prev;
        }
    }

    display(canvas, ctx, arr, -1, indiciesChecked, Date.now() - startTime, name)
    await new Promise(r => setTimeout(r, delay + 100))

    console.log("Indicied Checked B: " + indiciesChecked);
    return -1;
}

// Find Max sub-array of any size
async function Kadanes(arr) {

}

// rework to draw boxes instead of lines
function display(canvas, ctx, arr, currentIndex, indiciesChecked, timeElapsed, name) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white'
    ctx.font = '20px serif';
    ctx.textAlign="left"; 

    ctx.fillText(name,  10, 30);
    ctx.fillText("Time: " + getSeconds(timeElapsed) + "s",  10, 50);
    ctx.fillText(`Number of checks: ${indiciesChecked}`, 10, 70);

    // Set any new text to be centered in their repspective boxes
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";

    const boxesPerRow = 16;
    const rectX = canvas.width / boxesPerRow;
    const rectY = canvas.height / 6;
    const rectWidth = 30;
    const rectHeight = 30;
    const nextRowHeightOffset = 40;
    let rowMultiplier = 0;
    let columnMultiplier = 0;

    for(let i = 0 ; i < arr.length; i++) {
        if (i % boxesPerRow == 0 && i != 0) {
            rowMultiplier += nextRowHeightOffset;
            columnMultiplier = 0;
        }

        const xPosition = columnMultiplier * rectX + 4;
        const yPosition = rowMultiplier + rectY;
        

        ctx.fillStyle = i == currentIndex ? 'red': 'green';
        ctx.fillRect(xPosition, yPosition, rectWidth, rectHeight);
        
        ctx.fillStyle = 'white'
        ctx.fillText(arr[i], xPosition + rectWidth / 2, yPosition + rectHeight / 2);


        columnMultiplier += 1;
    }
}

function getSeconds(ms) {
    return (ms / 1000).toFixed(4);
}

generateArray();
generateTarget();

function runAlgs() {
    Linear([...baseArr], target);
    BinarySearch([...baseArr], target);
    JumpSearch([...baseArr], target);
}

runAlgs();

$("#gen-new-array").click(function (e) {
    generateArray();
    generateTarget();
})

$("#search").click(function (e) {
    const potentialTarget = $("#text").val();

    if (!isNaN(potentialTarget)) {
        target = potentialTarget;
    }

    $("#show-target").html("The target: " + target);
    runAlgs();
})