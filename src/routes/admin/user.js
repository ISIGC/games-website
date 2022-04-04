import { useEffect, useState } from "react"
import { Switch, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import CardPage from "../../components/cardPage"
import axios from "../../axios"

export default function User(props) {
	const [user, setUser] = useState(null)
	const params = useParams()
	const roll = params.roll

	useEffect(() => {
		axios
			.get(`user/${roll}`)
			.then((data) => setUser(data.data))
			.catch((err) => console.log(err))
	}, [roll])

	const toggleActive = () => {
		axios
			.patch(`user/${roll}`, {
				active: !user.active
			})
			.then((data) => {
				if (data.status === 200) {
					setUser((user) => ({
						...user,
						active: !user.active
					}))
				}
			})
	}

	const toggleStaff = () => {
		if (user.groups.indexOf("staff") !== -1) {
			axios
				.delete("/group/staff", {
					data: {
						users: user.id
					}
				})
				.then((data) => {
					if (data.status === 200) {
						setUser((user) => {
							let temp = { ...user }
							temp.groups.splice(user.groups.indexOf("staff"), 1)
							return temp
						})
					}
				})
		} else {
			axios
				.post("/group/staff", {
					users: user.id
				})
				.then((data) => {
					if (data.status === 200) {
						setUser((user) => {
							let temp = { ...user }
							temp.groups.push("staff")
							return temp
						})
					}
				})
		}
	}

	return (
		<CardPage>
			<Text fontSize="xl">{roll}</Text>
			{user && (
				<>
					<Text mb={2} fontSize="md">
						{user.name}
					</Text>
					<Text fontSize="md">Active</Text>
					<Switch mb={2} onChange={toggleActive} isChecked={user.active} />

					<Text fontSize="md">Staff</Text>
					<Switch mb={2} onChange={toggleStaff} isChecked={user.groups.indexOf("staff") !== -1} />
				</>
			)}
		</CardPage>
	)
}
