const center = document.getElementById("center");

SearchInput = document.getElementById("search-input");
SearchBtn = document.getElementById("search-btn");
SearchBtn.addEventListener(
    'click',
    async (e)=>{
        e.preventDefault();
        const response = await search(SearchInput.value);
        let a = response.map(e => {
            return `<div class="knjiga">
                <h5 class="knj_naslov">${e.naslov}</h5>
                <p class="knj_avtor">${e.avtor}</p>
                <p class="knj_id">${e.id}</p>
                <p class="knj_pozicija">${e.pozicija}</p>
                <p class="knj_podrocje">${e.podrocje}</p>
                <p class="knj_podpodrocje">${e.podpodrocje}</p>
                <p class="knj_drzava">${e.drzava || ""}</p>
                <p class="knj_jezik">${e.jezik || ""}</p>
                <p class="knj_zbirka">${e.zbirka || ""}</p>
                <p class="knj_leto">${e.leto || ""}</p>
                <p class="knj_opombe">${e.opombe || ""}</p>
            </div>`
        }).join("");
        console.log(a);
        center.innerHTML = a;
        console.log(response);
    }
)

async function search(keyword) {
    try {
        const response = await fetch(`${location}api/search/${keyword}`);
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

async function knjigaZID(id) {
    try {
        const response = await fetch(`${location}api/bookId/${id}`);
        return response.json();
    } catch (err) {
        console.log(err)
    }
}


// const result = await knjigaZID(5);