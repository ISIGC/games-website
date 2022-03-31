import { useState } from "react"
import { Container, Input, Button, Box } from "@chakra-ui/react"
import axios from "../../axios"
import { useNavigate, useLocation } from "react-router-dom"

export default function Login({ resetAuth }) {
	const [roll, setRoll] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()
	const { state } = useLocation()
	const next = state && state.next

	const onSubmit = async (event) => {
		try {
			event.preventDefault()
			resetAuth()
			let data = await axios.post(`/user/login`, { roll: roll, password: password })
			if (data.status === 200) {
				if (next) {
					navigate(next, { replace: true })
				} else {
					navigate("/", { replace: true })
				}
			} else {
				setRoll("")
				setPassword("")
			}
			// setAlerts((alerts) => [
			// 	<Alert mb={1} status="success" borderRadius="md">
			// 		<AlertIcon />
			// 		{games[id].name} is yours!
			// 	</Alert>,
			// 	...alerts
			// ])
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
				<Input mb={2} placeholder="Roll No." value={roll} onChange={(event) => setRoll(event.target.value)} />
				<Input
					mb={4}
					placeholder="Password"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button mb={10} disabled={!(roll && password)} variant="outline" type="submit">
					Log In
				</Button>
			</Box>
		</Container>
	)
}
