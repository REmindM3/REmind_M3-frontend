// Defining the base URL for the API
const api = "http://localhost:3007";

// Function to get all events from the API
export async function getEvents() {
  const response = await fetch(`${api}/events`);
  const json = await response.json();
  return json;
}

// Function to create a new event using the API
export async function createEvent(data) {
  // Sending a POST request to the /events endpoint of the API with data as the request body
  const response = await fetch(`${api}/events`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log(json);
  return json;
}

// Function to get user's events from the API
export async function getMyEvents() {
  // Sending a GET request to the /events/my-events endpoint of the API
  const response = await fetch(`${api}/events/my-events`);
  const json = await response.json();
  return json;
}
