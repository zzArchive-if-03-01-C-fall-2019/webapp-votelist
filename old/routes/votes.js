var username
let socket = io()   // come from server.js

do {
    username = prompt("Enter your UserName")
} while (!username);

var textarea = document.querySelector('#textarea')
var submitBtn = document.querySelector('#submitBtn')
var commentBox = document.querySelector('.comment__box')


submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let comment = textarea.value
    if (!comment) {
        return
    }
    postComment(comment)
})

function postComment(comment) {
    let data = {
        username: username,
        comment: comment,
    }
    appendToDom(data)
    textarea.value = ""
    brodcastComment(data)
    syncWithDB(data)

}

function appendToDom(data) {
    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    var markup = `
    <div class="card border-light mb-3">
        <div class="card-body" >
            <h6>${data.username}</h6>
            <p>${data.comment}</p>
            <div>
                <img height="17" src="/img/clock.webp" alt="clock">
                <small>${moment(data.time).format('LT')}</small>
            </div>
        </div>
    </div>
    `
    lTag.innerHTML = markup
    commentBox.prepend(lTag)
}

function brodcastComment(data) {
    socket.emit('emitcomment', data)  // send to server

}

socket.on('brodcomment', (data) => {     // its come from server brodcast to all channel
    appendToDom(data)
})


let typingP = document.querySelector('#typing')
socket.on('typing', (data) => {
    document.getElementById('typing').innerHTML = `${data.username} is typing...`
    debounce(function () {
        typingP.innerText = ''
    }, 1000)
})

var timerId = null;
function debounce(func, timer) {
    if (timerId) {
        clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
        func()
    }, timer)
}

textarea.addEventListener('keyup', (e) => {
    socket.emit('typing', { username })
})

function syncWithDB(data) {
    const headers = {
        'Content-Type': 'application/json'
    }

    fetch('/api/comment', { method: 'Post', body:  JSON.stringify(data), headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
}

function fetchComments(){
    fetch('/api/comment')
    .then(res=>res.json())
    .then(result=>{
        result.forEach((data) => {
            data.time=data.createdAt
            appendToDom(data)
            console.log(data)
        });
    })
}

window.onload = fetchComments



