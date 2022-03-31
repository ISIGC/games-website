import { useState, useEffect } from "react"
import { Container, Select, Text, Button, Box, Alert, AlertIcon } from "@chakra-ui/react"
import axios from "../../axios"

export default function GetGame({ user, logout }) {
	const [game, setGame] = useState("")
	const [games, setGames] = useState(null)
	const [alerts, setAlerts] = useState([])

	useEffect(() => {
		axios
			.get("/game")
			.then((res) => res.data)
			.then((games) => setGames(games))
			.catch((err) => console.log(err))
	}, [setGames])

	const onSubmit = async (event) => {
		try {
			event.preventDefault()
			let data = await axios.post(`/rent/${game}`)
			data = data.data
			const id = games.findIndex((game) => game.id === data.game)
			setGame("")
			setGames((games) => {
				let newGames = Array.from(games)
				newGames[id] = { ...newGames[id], available: false }
				return newGames
			})
			setAlerts((alerts) => [
				<Alert mb={1} status="success" borderRadius="md">
					<AlertIcon />
					{games[id].name} is yours!
				</Alert>,
				...alerts
			])
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container minH="100vh" maxW="container.lg" display="flex" justifyContent="center" alignItems="start">
			<Box
				as="form"
				borderWidth={[0, 1]}
				borderRadius="md"
				onSubmit={onSubmit}
				w={["100%", "60%", "45%", 400]}
				p={8}
				mt={[4, 8, 12, 16]}
			>
				<Text mb={2} fontSize="md">
					{user.name}
				</Text>
				<Button mb={6} variant="outline" onClick={logout}>
					Log Out
				</Button>
				<Select mb={4} placeholder="Choose a Game" value={game} onChange={(event) => setGame(event.target.value)}>
					{games &&
						games.map((game, index) => (
							<option key={index} value={game.id} disabled={!game.available}>
								{game.name}
							</option>
						))}
				</Select>
				<Button mb={10} disabled={!game} variant="outline" type="submit">
					Get Game
				</Button>
				{alerts}
			</Box>
		</Container>
	)
}
