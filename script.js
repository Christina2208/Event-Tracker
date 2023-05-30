let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let cityName = document.querySelector(".cityName");
let eventContainer = document.getElementById("event-container");
let historyItems = document.querySelector(".historyItems");
let eventInfoDiv = document.querySelector(".eventInfoDiv");

searchBtn.addEventListener("click", searchFunc);

//activates search button
function searchFunc(){
    if (searchBtn){
        fetchDataEvents(cityInput.value)
        setStorage()
    } cityInput.value=""
}

//fetches API events from ticketmaster and appends cards dynamically
function fetchDataEvents(value){
fetch("https://app.ticketmaster.com/discovery/v2/events.json?city=["+value+"]&size=31&sort=date,asc&apikey=GC2GWOqVAojsGdOJA1N1FM1RbT4Hzc94")
    .then((res)=>res.json())
    .then((data)=>{
        cityName.innerHTML=data._embedded.events[0]._embedded.venues[0].city.name
        console.log(data)
        let events = data._embedded.events
        events.forEach(event=>{
            console.log(event)
            let cardObject = document.createElement("div");
            cardObject.className="card"
            let date = `${event.dates.start.localDate}, ${event.dates.start.localTime}` //used template literal to loop through data and pull data into card
            let address =`${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}`
            
            cardObject.innerHTML= `<h5>${event.name}</h5><img class="image" src=${event.images[0].url}><p>${date}</p><span>${address}</span>`

            eventContainer.appendChild(cardObject)

//made card clickable *only blue part*
    eventContainer.addEventListener("click", function(e){ 
        if(e.target.tagName==="DIV"){
            const div = e.target;
                if(div.className==="card"){
                    eventInfo();
                }
                }
            })
        })
    });
}

//this appends the child for cardInfo *need to add link to buy ticket and google maps API*
function eventInfo(){

let cardInfo = document.createElement("div")
cardInfo.className="cardInfoStyle"
eventInfoDiv.appendChild(cardInfo)
}


//function for setting storage
let cityArr=[]

function setStorage(){
    JSON.parse(localStorage.getItem("cityArr"))
    cityArr.push(cityInput.value)
    localStorage.setItem("cityArr", JSON.stringify(cityArr)) //setting up the array of cities in local storage

    cityArr.forEach(function(value){
        cityArr.shift(cityInput.value) //removes first item from array

//appending history buttons
        let newDiv= document.createElement("button");
        newDiv.innerHTML=value
        newDiv.className="historyBtn"
        historyItems.appendChild(newDiv)
    })
}

//makes clickable history buttons
historyItems.addEventListener("click", function(e){
    if (e.target.tagName==="BUTTON"){
        const button = e.target;
        if (button.className==="historyBtn"){
            fetchDataEvents(button.innerHTML)
        }
    }
})



// fetch("https://app.ticketmaster.com/discovery/v2/events.json?size=31&apikey=GC2GWOqVAojsGdOJA1N1FM1RbT4Hzc94")
//     .then((res)=>res.json())
//     .then(console.log)

    // fetch("https://app.ticketmaster.com/discovery/v2/events.json?city=charlotte&apikey=GC2GWOqVAojsGdOJA1N1FM1RbT4Hzc94")
    // .then((res)=>res.json())
    // .then(console.log)

