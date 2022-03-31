import { useEffect, useState } from "react"
import axios from "../axios"

export default function useAuth() {
	const [user, setUser] = useState(undefined)

	useEffect(() => {
		auth()
	}, [])

	const auth = () => {
		axios
			.get("/user/authCheck")
			.then((data) => {
				if (data.status === 200) {
					data = data.data
					setUser({
						name: data.name,
						groups: data.groups
					})
				}
			})
			.catch((err) => {
				if (err.response && err.response.status > 400) {
					setUser(null)
				}
			})
	}

	const logout = () => {
		axios.get("/user/logout").then((data) => {
			if (data.status === 200) {
				setUser(null)
			}
		})
	}

	const resetAuth = () => {
		setUser(undefined)
	}

	return [user, auth, logout, resetAuth]
}
