const list = document.querySelector("#task_list");
const descInput = document.querySelector("#task_description_input");
const date = document.querySelector("#duedate_input");
const time = document.querySelector("#duetime_input");
const addBtn = document.querySelector("#add_task");
const body = document.querySelector("body");
const done = document.querySelectorAll(".done");
// console.log(date);

date.value = "";
time.value = "";

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time
    // console.log(dueDate);
    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        // console.log("false");
        return false;
    }
};

function addTask (description, dueTime="") {
    const li = document.createElement("li");
    list.appendChild(li);
    if (dueTime !=""){
        li.innerHTML = `${description} <span class="due">${new Date(dueTime).toLocaleString()}</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`
    }
    else {
        li.innerHTML = `${description}<button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`
    };
    // console.log(dueTime);
    li.querySelector(".btn").addEventListener("click", ()=>{
        li.remove();
    });
};

addTask("Learn to wrap gifts", 1639944400000);
addTask("Buy milk");

addBtn.addEventListener("click", ()=>{
    let due_time = dateAndTimeToTimestamp(date,time);
    console.log(due_time);
    // if (due_time != false){
    //     addTask(descInput.value, new Date(dateAndTimeToTimestamp(date,time)).toLocaleString());
    // }
    // else {
    //     console.log("false");
    //     addTask(descInput.value, "");
    // };
    addTask(descInput.value, due_time);
    descInput.value = "";
    date.value = "";
    time.value = "";
});

body.addEventListener("keydown", (key)=>{
    if (key.code=="Enter") {
        let due_time = dateAndTimeToTimestamp(date,time);
        console.log(due_time);
        // if (due_time != false){
        //     addTask(descInput.value, new Date(dateAndTimeToTimestamp(date,time)).toLocaleString());
        // }
        // else {
        //     console.log("false");
        //     addTask(descInput.value, "");
        // };
        addTask(descInput.value, due_time);
        descInput.value = "";
        date.value = "";
        time.value = "";
    }
});