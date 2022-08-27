//Fetch the data from Api
async function getHeros(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();
        return results.data["results"]
    } catch (error) {
        console.log(error)
    }
}
;

async function getComics(url){
    try {
        const response = await fetch(url);
        const results = await response.json();
        return results.data["results"]
    } catch (error) {
        console.log(error)
    }
}


export {getHeros, getComics}