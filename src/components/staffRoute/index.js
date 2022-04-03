import { Outlet } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import Nav from "./nav"

export default function StaffRoute({ user }) {
	if (user.groups.indexOf("staff") !== -1 || user.groups.indexOf("admin") !== -1) {
		return (
			<>
				<Nav user={user} />
				<Outlet />
			</>
		)
	}
	return <Box minH="100vh">You are not authorised to view this page</Box>
}
