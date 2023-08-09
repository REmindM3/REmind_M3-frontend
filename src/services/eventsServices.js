const api = "http://localhost:3007";

export async function getEvents(){
    const response = await fetch(`${api}/events`)
    const json = await response.json()
    return json
}

export async function createEvent(data){
    const response = await fetch(`${api}/events`, {
        method: "POST",
        headers:{
            'Content-type':"application/json"
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    console.log(json)
    return json
}

