export async function CreateUser(data) {
  const response = fetch("http://localhost:4000/users", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => {
    return data.json();
  });
  return response;
}

export async function AddToUser(data, token) {
  const response = fetch(`http://localhost:4000/todo`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    Authorization: `Bearer ${token}`,
    body: JSON.stringify(data),
  }).then((data) => {
    return data.json();
  });
  return response;
}

export async function LoginUser(data) {
  const response = fetch("http://localhost:4000/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => {
    return data.json();
  });
  return response;
}

export async function GetUser() {
  const response = fetch("http://localhost:4000/posts", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    },
    // body: JSON.stringify(data),
  }).then((data) => {
    return data.json();
  });
  return response;
}
