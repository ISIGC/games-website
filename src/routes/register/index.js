import { useState } from "react"
import { FormControl, FormLabel, FormErrorMessage, Alert, Input, Button, Link } from "@chakra-ui/react"
import PhoneInput from "../../components/phoneInput"
import { formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input"
import CardPage from "../../components/cardPage"
import { Link as RouterLink } from "react-router-dom"
import axios from "../../axios"

export default function Register() {
	const [password, setPassword] = useState({
		value: "",
		error: false,
		message: ""
	})
	const [roll, setRoll] = useState("")
	const [name, setName] = useState("")
	const [room, setRoom] = useState("")
	const [gender, setGender] = useState("")
	const [phone, setPhone] = useState()
	const [error, setError] = useState({
		value: false,
		message: ""
	})

	const submit = (event) => {
		event.preventDefault()
		axios
			.post("/user", {
				roll: roll,
				name: name,
				room: room,
				gender: gender,
				phone: formatPhoneNumberIntl(phone),
				password: password.value
			})
			.then((data) => {
				if (data.status === 201) {
					if (error.value) {
						setError({ value: false, message: "" })
					}
					setRoll("")
					setPassword((pass) => ({ ...pass, value: "" }))
					setName("")
					setRoom("")
					setGender("")
					setPhone("")
				}
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 400) {
						setError({ value: true, message: "User already exists" })
					}
				}
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
		<CardPage mb={20} as="form" onSubmit={submit}>
			<FormControl mb={4} as="fieldset">
				<FormLabel htmlFor="roll">Roll</FormLabel>
				<Input
					id="roll"
					autoComplete="off"
					autoCapitalize="none"
					value={roll}
					onChange={(event) => setRoll(event.target.value)}
				/>
			</FormControl>
			<FormControl mb={4} as="fieldset">
				<FormLabel htmlFor="name">Name</FormLabel>
				<Input id="name" autoComplete="off" value={name} onChange={(event) => setName(event.target.value)} />
			</FormControl>
			<FormControl mb={4} as="fieldset">
				<FormLabel htmlFor="room">Room No.</FormLabel>
				<Input id="room" autoComplete="off" value={room} onChange={(event) => setRoom(event.target.value)} />
			</FormControl>
			<FormControl mb={4} as="fieldset">
				<FormLabel htmlFor="gender">Gender</FormLabel>
				<Input id="gender" autoComplete="off" value={gender} onChange={(event) => setGender(event.target.value)} />
			</FormControl>
			<PhoneInput value={phone} onChange={setPhone} />
			<FormControl mb={6} as="fieldset" isInvalid={password.error}>
				<FormLabel htmlFor="password">Password</FormLabel>
				<Input id="password" type="password" value={password.value} onChange={handlePass} />
				{password.error && <FormErrorMessage>{password.message}</FormErrorMessage>}
			</FormControl>
			<Button
				mb={4}
				disabled={!(roll && password.value && !password.error && name && gender && phone && isValidPhoneNumber(phone))}
				variant="outline"
				type="submit"
			>
				Register
			</Button>
			{error.value && (
				<Alert status="error" mb={4}>
					{error.message}
				</Alert>
			)}
			<br />
			<Link mb={10} as={RouterLink} to="/login">
				Log In
			</Link>
		</CardPage>
	)
}
