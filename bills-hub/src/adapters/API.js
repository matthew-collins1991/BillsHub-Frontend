const baseUrl = "http://localhost:3000/api/v1/"
const usersUrl = `${baseUrl}users`
const userUrl = user => `${usersUrl}/${user.id}`

const getUser = () =>
fetch("http://localhost:3000/api/v1/users/1")
.then(resp => resp.json())

// eport as API
export default {
    getUser
} 

