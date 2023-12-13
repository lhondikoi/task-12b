let query = document.querySelector('#query')
let resultContainer = document.querySelector('.search-results')

function search() {
    // delete previous search results
    resultContainer.innerHTML = ""
    
    let searchQuery = query.value
    query.value = ""
    if (searchQuery !== "") {
        fetch('https://university-domains.onrender.com/search?' + new URLSearchParams({
            name: searchQuery
        }))
        .then(r => r.json())
        .then(d => {
            if (d == []) {
                let emptyMsg = document.createElement('span')
                emptyMsg.innerText = "Sorry, no matching results found."
                resultContainer.append(emptyMsg)
            }
            for (let resultItem of d) {
                let div = document.createElement('div')
                div.classList.add('result-item')

                let title = document.createElement('h3')
                title.classList.add('title')

                let link = document.createElement('a')
                link.setAttribute('href', resultItem.web_pages[0])
                link.setAttribute('target', '_blank')

                link.innerText = resultItem.name

                title.appendChild(link)

                let location = document.createElement('span')
                location.innerHTML = `<i class="bi bi-geo-alt"></i> ${resultItem.country}`

                div.appendChild(title)
                div.appendChild(location)
                resultContainer.appendChild(div)
            }
        })
    }
}

query.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        search()
    }
})