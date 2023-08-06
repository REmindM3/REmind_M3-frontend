const api = "http://localhost:3007";

export async function getEvents() {
  const res = await fetch(`${api}/events`);
  const json = await res.json();
  return json
}

export async function createEvent(data) {
  const res = await fetch(`${api}/events/create`, {
    method: "POST",
    headers: {
      "content_type": "application/json",
    },
    body: JSON.stringify({data}),
  });
  const json = await res.json();
  console.log(json);
  return json;
}
