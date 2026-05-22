const fs = require("fs");

console.log("===== PROGRAM START =====");


// ---------------- SYNCHRONOUS ----------------
console.log("1. Synchronous - Start");


// ---------------- TIMER ----------------
setTimeout(() => {
    console.log("2. setTimeout - Timer Phase");
}, 0);


// ---------------- IMMEDIATE ----------------
setImmediate(() => {
    console.log("3. setImmediate - Check Phase");
});


// ---------------- FILE SYSTEM (I/O) ----------------
fs.readFile("../data/file1.txt", "utf-8", (err, data) => {

    console.log("4. fs.readFile - I/O Callback");

    process.nextTick(() => {
        console.log("5. nextTick INSIDE fs.readFile");
    });

    Promise.resolve().then(() => {
        console.log("6. Promise INSIDE fs.readFile");
    });

    setImmediate(() => {
        console.log("7. setImmediate INSIDE fs.readFile");
    });

    setTimeout(() => {
        console.log("8. setTimeout INSIDE fs.readFile");
    }, 0);

});


// ---------------- PROMISE ----------------
Promise.resolve().then(() => {
    console.log("9. Promise - Microtask Queue");
});


// ---------------- NEXT TICK ----------------
process.nextTick(() => {
    console.log("10. nextTick Queue");
});


// ---------------- LOOP BLOCKING ----------------
for (let i = 0; i < 100000000; i++) {
    if(i === 0){
        console.log("start of loop")
    }
    if(i === 99999999){
        console.log("end of loop")
    }
}

console.log("11. Synchronous - End");

console.log("===== PROGRAM END =====");