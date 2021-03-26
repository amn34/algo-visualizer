const max = 8;
const min = 4;
const n = 500;
const delay = 1;
let String1 = "";
let String2 = "";

// show off dynamic programming algorithms in here

// source: https://medium.com/techie-delight/top-10-dynamic-programming-problems-5da486eeb360

// Find the longest sequence which can be obtained from the 
// two sequence obtained by deleting some characters in the strings. 
async function longestCommonSubsequence(A, B) {
    const name = 'Longest Common Subsequence O(N * M)'
    const canvas = document.getElementById("lcs");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();
    
    let arr = new Array(A.length+1);
    for (let i=0; i<=A.length; i++)
        arr[i] = new Array(B.length+1);

    for (let i=0; i<=A.length; i++) {
        for (let j=0; j<=B.length; j++) {
            arr[i][j] = 0;
        }
    }
    
    for (let i = 1; i<=A.length; i++) {
        for (let j=1; j<=B.length; j++) {
            if (A[i-1] == B[j-1]) arr[i][j] = arr[i-1][j-1] + 1;
            else arr[i][j] = Math.max(arr[i-1][j], arr[i][j-1]);

            displayLCS(canvas, ctx, arr, i, j, Date.now() - startTime, name)
            await new Promise(r => setTimeout(r, delay + 100))
        }
    }

    console.log(arr);
    console.log(arr[A.length][B.length]);
    
    return arr[A.length][B.length];
}

// Given 2 strings, X and Y, 
// find the shortest supersequence Z such that 
// both X and Y are subsequences of Z
async function lcsForScs(A, B, name, canvas, ctx, startTime) {

    let arr = new Array(A.length + 1);
    for (let i=0; i<=A.length; i++)
        arr[i] = new Array(B.length + 1);

    for (let i=0; i<=A.length; i++) {
        for (let j=0; j<=B.length; j++) {
            arr[i][j] = 0;
        }
    }
    
    for (let i=1; i<=A.length; i++) {
        for (let j=1; j<=B.length; j++) {
            if (A[i-1] == B[j-1]) arr[i][j] = arr[i-1][j-1] + 1;
            else arr[i][j] = Math.max(arr[i-1][j], arr[i][j-1]);

            displayLCS(canvas, ctx, arr, i, j, Date.now() - startTime, name)
            await new Promise(r => setTimeout(r, delay + 100))
        }
    }
    
    ctx.fillStyle = 'white'
    ctx.font = '20px serif';
    ctx.textAlign = "left"; 
    const longestCS = arr[A.length][B.length];
    ctx.fillText(`Answer: ${A.length + B.length - longestCS}`,  10, 70);
    
    console.log(`SCS Answer: ${A.length + B.length - longestCS}`);
    return arr[A.length][B.length];
}

async function shortestCommonsSupersequence(A, B) {
    const name = 'Shortest Common Supersequence O(N * M)'
    const canvas = document.getElementById("scs");
    const ctx = canvas.getContext('2d', { alpha: false });
    const startTime = Date.now();

    lcsForScs(A, B, name, canvas, ctx, startTime);
}

// Given an array of integers, find the longest subsequence 
// in which the elements are in sorted order (lowest -> highest). 
// The sequence does not need to be contiguous or unique.
async function longestIncreasingSubsequence(){}

// Given 2 strings, find the minimum number of operations required to transform one string into the other.
async function levenshteinEditDistance(){}

// Determine the optimal praenthesization of a product of N matricies. 
// In other words, find the most efficient way to multiply a sequence of matricies.
async function matrixChainMultiplication(){}

// Given a set of items, each with weight and a value, 
// determine the number of each item we can carry such that the 
// total weight is less than or equal to a given limit and the total value is maximum.
async function knapsack0to1(){}

// Given a set of positive integers, find if it can be divided into two subsets with equal sum
async function partitionProblem(){}

// Given a rod of length n, and a list of prices of rods of length i, 
// where 1 <= i <= n, find the optimal way to cut the rod into smaller rods to 
// maximize profit.
async function rodCutting(){}

// Given an unlimited supply of coins of given denominations, 
// find the minimum number of coins required to get the desired change.
async function coinChange(){}

// Given a string and a dictionary of words, 
// determine if the string can be segmented into 
// a space-separated sequence of one or more dictionary words.
async function wordBreak(){}

// rework to draw boxes instead of lines
function displayLCS(canvas, ctx, arr, currentI, currentJ, timeElapsed, name) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white'
    ctx.font = '20px serif';
    ctx.textAlign = "left"; 

    ctx.fillText(name,  10, 30);
    ctx.fillText("Time: " + getSeconds(timeElapsed) + "s",  10, 50);

    // Set any new text to be centered in their repspective boxes
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";

    const boxesPerRow = arr[0].length;
    const rectX = canvas.width / boxesPerRow;
    const rectY = canvas.height / 6;
    const rectWidth = canvas.width / boxesPerRow / 1.5;
    const rectHeight = 30;
    const nextRowHeightOffset = 40;
    let rowMultiplier = 0;
    let columnMultiplier = 0;

    for(let i = 0 ; i < arr.length; i++) {
        const yPosition = rowMultiplier + rectY;
        
        for (let j=0; j<arr[0].length; j++) {
            const xPosition = columnMultiplier * rectX + 12;

            ctx.fillStyle = i == currentI && j == currentJ? 'red': 'green';
            ctx.fillRect(xPosition, yPosition, rectWidth, rectHeight);
            
            ctx.fillStyle = 'white'
            ctx.fillText(arr[i][j], xPosition + rectWidth / 2, yPosition + rectHeight / 2);
    
    
            columnMultiplier += 1;
        }

        rowMultiplier += nextRowHeightOffset;
        columnMultiplier = 0;
    }
}

function getSeconds(ms) {
    return (ms / 1000).toFixed(4);
}

function generateString() {
    let FirstStringLength = getRandomInt(max) + min;
    let SecondStringLength = getRandomInt(max) + min;
    String1 = "";
    String2 = "";

    const codeForA = 65;

    for (let i=0; i<FirstStringLength; i++) {
        const charOffset = getRandomInt(25);
        String1 += String.fromCharCode(charOffset + codeForA);
    }

    for (let i=0; i<SecondStringLength; i++) {
        const charOffset = getRandomInt(26);
        String2 += String.fromCharCode(charOffset + codeForA);
    }
    
    console.log("Generated Strings: ", String1, String2);

    $("#show-strings").html("Current Strings: </br>" + String1 + "</br>" + String2);
    $("#show-strings").css("textAlign", "center");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

$("#gen-strings").click(function (e) {
    generateString();
})

$("#run-again").click(function (e) {
    longestCommonSubsequence(String1, String2);
    shortestCommonsSupersequence(String1, String2);
})

// longestCommonSubsequence("ABRAKADABRA", "ALAKAZAM")
// longestCommonSubsequence("ABCD", "ACBAD")
generateString();
longestCommonSubsequence(String1, String2);
shortestCommonsSupersequence(String1, String2);