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

	return (
		<CardPage>
			<Text fontSize="xl">{roll}</Text>
			{user && (
				<>
					<Text fontSize="md">{user.name}</Text>
					<Switch onChange={toggleActive} isChecked={user.active} />
				</>
			)}
		</CardPage>
	)
}
