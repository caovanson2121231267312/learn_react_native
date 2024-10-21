import axios from 'axios'
const api_url = process.env.API_URL

const api = {
    async get(url, headers = {}) {
        try {
            const data = await axios.get(api_url + url, { headers: headers })
            console.log(api_url + url)
            // console.log(data)

            return await data
        } catch (e) {
            throw e
        }
    },

    async post(url, data = {}, headers = {}) {
        try {
            console.log(api_url + url)
            const response = await axios.post(api_url + url, data, { headers: headers })
            console.log(response?.data)
            return response
        } catch (e) {
            throw e
        }
    },

    async put(url, data = {}, headers = {}) {
        try {
            let result = await axios.put(url, data, headers)

            return result
        } catch (e) {
            return e
        }
    },

    async delete(url, data = {}) {
        try {
            let result = await axios.delete(url, data)

            return result
        } catch (e) {
            return e
        }
    }
}

export default api
