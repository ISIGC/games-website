import { useState, useEffect } from "react"
import { Container, Table, Tbody, Th, Thead, Tr, Td, Link } from "@chakra-ui/react"
import axios from "../../axios"
import { Link as RouterLink } from "react-router-dom"

export default function Users() {
	const [users, setUsers] = useState(null)

	useEffect(() => {
		axios
			.get("/user")
			.then((data) => setUsers(data.data))
			.catch((err) => console.log(err))
	}, [])

	return (
		<Container pt="4" minH="100vh" maxW="container.lg">
			<Table>
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Roll</Th>
						<Th>Room</Th>
						<Th>Active</Th>
					</Tr>
				</Thead>
				<Tbody>
					{users &&
						users.map((user, index) => (
							<Tr key={index}>
								<Td>
									<UserLink to={user.roll}>{user.name}</UserLink>
								</Td>
								<Td>{user.roll}</Td>
								<Td>{user.room}</Td>
								<Td>{user.active ? "True" : "False"}</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</Container>
	)
}

const UserLink = ({ to, children }) => (
	<Link sx={{ "&:hover": { textDecoration: "none" } }} as={RouterLink} to={to}>
		{children}
	</Link>
)
