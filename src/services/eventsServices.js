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

// export async function deleteEvent



// export async function handleDeleteClick()  {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       // Delete the event
//       const response = await fetch(`/events/${props._id}`, {
//         method: 'delete',
//       });
//       const data = await response.json();
//       console.log(data);
//     }
//   };