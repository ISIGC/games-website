import { useState, useEffect } from "react"
import { Container, Input, Select, Button, Box } from "@chakra-ui/react"
import axios from "../../axios"

export default function GetGame() {
	const [roll, setRoll] = useState("")
	const [game, setGame] = useState("")
	const [games, setGames] = useState(null)

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
			let data = await axios.post(`/rent/${game}`, { roll: roll })
			data = data.data
			console.log(data)
			setRoll("")
			setGame("")
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container minH="100vh" maxW="container.lg" display="flex" justifyContent="center">
			<Box as="form" onSubmit={onSubmit} w={["100%", "55%", "45%", 400]} pt={[4, 8, 12, 16]}>
				<Input mb={2} placeholder="Roll No." value={roll} onChange={(event) => setRoll(event.target.value)} />
				<Select mb={4} placeholder="Choose a Game" value={game} onChange={(event) => setGame(event.target.value)}>
					{games &&
						games.map((game, index) => (
							<option key={index} value={game.id} disabled={!game.available}>
								{game.name}
							</option>
						))}
				</Select>
				<Button disabled={!(roll && game)} variant="outline" type="submit">
					Get Game
				</Button>
			</Box>
		</Container>
	)
}
