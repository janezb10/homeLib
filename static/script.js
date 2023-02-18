async function knjigaZID(id) {
    try {
        const response = await fetch(`${location}api/id/${id}`);
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

async function search(keyword) {
    try {
        const response = await fetch(`${location}api/search/${keyword}`);
        return response.json();
    } catch (err) {
        console.log(err)
    }
}


// const result = await knjigaZID(5);