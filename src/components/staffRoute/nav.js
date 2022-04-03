import { Box, Container, Stack, Link } from "@chakra-ui/react"
import { NavLink as RouterLink } from "react-router-dom"

export default function Nav({ user }) {
	return (
		<>
			<Box position="fixed" top="0" left="0" right="0" zIndex="1" backgroundColor="red.900">
				<Container height={[14, 16]} maxW="container.lg" display="flex" alignItems="center">
					<Stack direction="row" spacing="8">
						<NavLink to="">Dashboard</NavLink>
						<NavLink to="/">Get Game</NavLink>
						{user.groups.indexOf("admin") !== -1 && <NavLink to="users">Users</NavLink>}
					</Stack>
				</Container>
			</Box>
			<Box height={[14, 16]} />
		</>
	)
}

const NavLink = ({ to, children }) => (
	<Link
		sx={{ color: "red.100", "&:hover": { textDecoration: "none" }, "&.active": { color: "red.400" } }}
		as={RouterLink}
		to={to}
	>
		{children}
	</Link>
)
