import { useState, useEffect } from "react"
import { Select, Button, Alert, AlertIcon } from "@chakra-ui/react"
import axios from "../../axios"
import CardPage from "../../components/cardPage"

export default function Dashboard() {
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
			let data = await axios.get(`/rent/${game}/return`)
			data = data.data
			const id = games.findIndex((game) => game.id === data.game)
			setGame("")
			setGames((games) => {
				let newGames = Array.from(games)
				newGames[id] = { ...newGames[id], available: true }
				return newGames
			})
			setAlerts((alerts) => [
				<Alert mb={1} status="success" borderRadius="md">
					<AlertIcon />
					{games[id].name} has been returned
				</Alert>,
				...alerts
			])
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<CardPage as="form" onSubmit={onSubmit}>
			<Select mb={4} placeholder="Return Game" value={game} onChange={(event) => setGame(event.target.value)}>
				{games &&
					games.map((game, index) => (
						<option key={index} value={game.id} disabled={game.available}>
							{game.name}
						</option>
					))}
			</Select>
			<Button disabled={!game} variant="outline" type="submit">
				Return
			</Button>
			{alerts}
		</CardPage>
	)
}
