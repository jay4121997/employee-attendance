import axios  from 'axios'

const instance = axios.create({
    baseURL: 'https://attendance-862ee.firebaseio.com/'
})

export default instance