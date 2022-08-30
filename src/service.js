//Fetch the data from Api
export default async function fetchApi(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();
        return results.data["results"]
    } catch (error) {
        console.log(error)
    }
}

