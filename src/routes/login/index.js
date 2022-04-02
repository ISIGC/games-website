import { useState } from "react"
import { FormControl, FormLabel, FormErrorMessage, Input, Button, Link } from "@chakra-ui/react"
import axios from "../../axios"
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom"
import CardPage from "../../components/cardPage"

export default function Login({ resetAuth }) {
	const [roll, setRoll] = useState({
		value: "",
		error: false,
		message: ""
	})
	const [password, setPassword] = useState({
		value: "",
		error: false,
		message: ""
	})
	const navigate = useNavigate()
	const { state } = useLocation()
	const next = state && state.next

	const submit = async (event) => {
		try {
			event.preventDefault()
			resetAuth()
			let data = await axios.post(`/user/login`, { roll: roll.value, password: password.value })
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
		} catch (err) {
			if (err.response) {
				if (err.response.status === 400) {
					setRoll({ value: "", error: true, message: "We couldn't find you" })
					setPassword((password) => ({ ...password, value: "" }))
				} else if (err.response.status === 401) {
					if (err.response.data.error === "incorrect password") {
						setPassword({ value: "", error: true, message: "Your password is incorrect" })
					} else if (err.response.data.error === "user inactive") {
						setPassword({ value: "", error: true, message: "Your account is inactive" })
					}
				}
			}
		}
	}

	const handleRoll = (event) => {
		setRoll((roll) => {
			let newRoll = { ...roll }
			if (roll.error) {
				newRoll.error = false
			}
			newRoll.value = event.target.value
			return newRoll
		})
	}

	const handlePass = (event) => {
		setPassword((pass) => {
			let newPass = { ...pass }
			if (pass.error) {
				newPass.error = false
			}
			newPass.value = event.target.value
			return newPass
		})
	}

	return (
		<CardPage as="form" onSubmit={submit}>
			<FormControl mb={4} as="fieldset" isInvalid={roll.error}>
				<FormLabel htmlFor="roll">Roll</FormLabel>
				<Input id="roll" autoComplete="off" autoCapitalize="none" value={roll.value} onChange={handleRoll} />
				{roll.error && <FormErrorMessage>{roll.message}</FormErrorMessage>}
			</FormControl>
			<FormControl mb={6} as="fieldset" isInvalid={password.error}>
				<FormLabel htmlFor="password">Password</FormLabel>
				<Input id="password" type="password" value={password.value} onChange={handlePass} />
				{password.error && <FormErrorMessage>{password.message}</FormErrorMessage>}
			</FormControl>
			<Button
				mb={4}
				disabled={!(roll.value && password.value && !roll.error && !password.error)}
				variant="outline"
				type="submit"
			>
				Log In
			</Button>
			<br />
			<Link mb={10} as={RouterLink} to="/register">
				Register here
			</Link>
		</CardPage>
	)
}
