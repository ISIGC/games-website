import { create } from "axios"

const axios = create({
	baseURL: process.env.REACT_APP_API_ROUTE,
	withCredentials: true
})

export default axios
