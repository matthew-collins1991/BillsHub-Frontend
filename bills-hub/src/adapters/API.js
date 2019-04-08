const baseUrl = "http://localhost:3000/api/v1/"
const usersUrl = `${baseUrl}users`
const userUrl = user => `${usersUrl}/${user.id}`

class API {
  static login(user) {
    return fetch(`${baseUrl}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static signUp(user){
    return fetch(`${baseUrl}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static validate() {
    return this.get(`${baseUrl}validate`);
  }

  static get(url) {
    return fetch(url).then(response => response.json());
  }

  static updateUser(user) {
    console.log(user)
    return fetch(`${baseUrl}admin/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }



}


window.API = API;

export default API; 