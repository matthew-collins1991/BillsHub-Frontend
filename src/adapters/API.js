const baseUrl = "https://bills-hub-backend.herokuapp.com/api/v1/"

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

  static createUtility(utility) {
    return fetch(`${baseUrl}admin/utilities/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(utility)
    }).then(response => response.json());
  }

  static updateUser(user) {
    return fetch(`${baseUrl}admin/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static updateUserInBill(user) {
    return fetch(`${baseUrl}admin/utilities/new`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static getCompanies() {
    return fetch(`${baseUrl}admin/utilities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => response.json());
  }

  static findLogo(input){
    return fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${input}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}



}


window.API = API;

export default API; 