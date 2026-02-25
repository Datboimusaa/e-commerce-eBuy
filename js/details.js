//FAVORIS
const coeur = document.querySelector('#favoris')
const alert = document.querySelector('#alert')


function buttonFavoris(){
    
    coeur.addEventListener('click', () => {
        coeur.classList.toggle('active')
        
        const isActive = coeur.classList.contains('active')

        alert.textContent = isActive
        ? 'Ajouter aux favoris'
        : 'Retirer des favoris'

        showAlert()
    })
    
}
buttonFavoris()

function showAlert(){
    alert.classList.add('show')

    setTimeout(() =>{
        alert.classList.remove('show')
    },2000)
}

//IMAGES
    const mainImg = document.querySelector('.mainImg')
    const smallImg = document.querySelectorAll('.smallImg')

    smallImg[0].onclick = function(){
        mainImg.src = smallImg[0].src
    }
    smallImg[1].onclick = function(){
        mainImg.src = smallImg[1].src
    }
    smallImg[2].onclick = function(){
        mainImg.src = smallImg[2].src
    }
    smallImg[3].onclick = function(){
        mainImg.src = smallImg[3].src
    }

//SIZE
const classModal = document.querySelector('.classModal')

function tailleModal(){
    const size = document.querySelector('.taille')
    

    size.addEventListener('click', () =>{
        classModal.style.display = 'flex'
    })
}
tailleModal()

//CLOSE MODAL
function closeModal(){
    const modalHIdden = document.querySelector('.modal-hidden')
    modalHIdden.addEventListener('click', () =>{
        classModal.style.display = 'none'
    })
}

//AJOUTER AU PANIER



//COMMENTAIRE
const input = document.querySelector('#area')
const button = document.querySelector('#area-button')
const commentText = document.querySelector('#commentText')

const STORAGE_KEY = 'comments'
let comments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []


comments.forEach(comment => {
    addCommentToDOM(comment)
})
progress()


button.addEventListener('click', (e) => {
    e.preventDefault()

    const text = input.value.trim()
    if (text === '') return

    const comment = {
        text: text,
        date: new Date().toLocaleString()
    }

    comments.push(comment)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))

    addCommentToDOM(comment)
    progress()

    input.value = ''
})


function addCommentToDOM(comment) {
    const li = document.createElement('li')

    li.innerHTML = `
        <p>${comment.text}</p>
        <div class = "rating">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
        </div>
        <small>${comment.date}</small>
    `


    li.addEventListener('click', () => {
        commentText.removeChild(li)

        comments = comments.filter(c =>
            c.text !== comment.text || c.date !== comment.date
        )

        localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
        progress()
    })

    commentText.appendChild(li)
}


function progress() {
    const totalList = commentText.children.length
    document.querySelector('.total').textContent = totalList
    document.querySelector('.verify').textContent = totalList
}

const stars = document.querySelectorAll('.star')

stars.forEach(star =>{
    star.addEventListener('click', () =>{
        star.classList.toggle('add')
    })
})





