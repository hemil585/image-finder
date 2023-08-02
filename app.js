const apiKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"

const formEl = document.querySelector('form')
const inputEl = document.getElementById('search-input')
const btnEl = document.getElementById('search-btn')
const searchResultEl = document.querySelector('.search-results')
const showMoreBtnEl = document.getElementById('show-more')

let inputData = ""
let page = 1

async function searchImages(){
    inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data);

    if(page === 1){
        searchResultEl.innerHTML = ""
    }

    const results = data.results

    results.map((result)=>{
        const imageWrapper = document.createElement('div')
        imageWrapper.className = "search-result"
    
        const img = document.createElement('img')
        img.src = result.urls.small 
        img.alt = result.alt_description

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(img)
        imageWrapper.appendChild(imageLink)
        searchResultEl.append(imageWrapper)
    })

    page++

    if(page>0){
        showMoreBtnEl.style.display = "block"
    }
}


formEl.addEventListener('submit',(e)=>{
    e.preventDefault()
    page = 1
    searchImages()
})

showMoreBtnEl.addEventListener('click',(e)=>{
    searchImages()
})