import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import userFacade from "./userFacade"
import jokeFacade from "./jokeFacade"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */
const jokes = jokeFacade.getJokes()
let jokeList = jokes.map(joke => "<li>" + joke + "</li>").join("")
document.getElementById("jokes").innerHTML = jokeList

function printJoke() {
  let jokeId = document.getElementById("jokeInput").value
  const jokeById = jokeFacade.getJokeById(jokeId)
  document.getElementById("showJoke").innerHTML = jokeById
}

document.getElementById("jokeBtn").addEventListener("click", printJoke)

function addJoke() {
  let newJoke = document.getElementById("newJoke").value
  jokeList = jokeFacade.addJoke(newJoke)
}

document.getElementById("jokeBtn2").addEventListener("click", addJoke)

/* JS For Exercise-2 below */
function getQuote() {
  fetch("https://studypoints.info/jokes/api/jokes/period/hour")
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data.joke)
      quoteTag.innerHTML = `${data.joke}`
    })
}

document.getElementById("quoteBtn").addEventListener("click", getQuote)


/* JS For Exercise-3 below */

userFacade.getUsers()
  .then(users => {
    const userRows = users.map(user => `
  <tr>
    <td>${user.id}</td>
    <td>${user.age}</td>
    <td>${user.name}</td>
    <td>${user.gender}</td>
    <td>${user.email}</td>
  </tr>
  `)
    const userRowsAssString = userRows.join("")
    document.getElementById("allUserRows").innerHTML = userRowsAssString
  })


// Add new user

let addUser = document.getElementById("addUser")
addUser.addEventListener("click", (event) => {
  event.preventDefault()
  let age = document.getElementById("age").value
  let name = document.getElementById("name").value
  let gender = document.getElementById("gender").value
  let email = document.getElementById("email").value

  const newUser = {
    age,
    name,
    gender,
    email
  }
  userFacade.addUser(newUser)
    .then(userFacade.getUsers())  
})

// Edit User

let editUser = document.getElementById("editUser")
editUser.addEventListener("click", (event) => {
  event.preventDefault()
  let id = document.getElementById("id").value
  let age = document.getElementById("editAge").value
  let name = document.getElementById("editName").value
  let gender = document.getElementById("editGender").value
  let email = document.getElementById("editEmail").value

  const editAUser = {
    id,
    age,
    name,
    gender,
    email
  }
  userFacade.editUser(editAUser)
    .then(userFacade.getUsers())  
})

// Get one user

let getOneUser = document.getElementById("findUser")
getOneUser.addEventListener("click", (event) => {
  event.preventDefault()
  let getUserId = document.getElementById("singleId").value

  userFacade.getUser(getUserId)
  .then(user => {
    showUser.innerHTML = user.name
  })
})

// Delete User

let getDeleteUser = document.getElementById("deleteUser")
getDeleteUser.addEventListener("click", (event => {
  event.preventDefault()
  let getDeleteUserId = document.getElementById("deleteUserId").value

  userFacade.deleteUser(getDeleteUserId)
}))


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



