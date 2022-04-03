import { Outlet } from "react-router-dom"
import { Box, Text } from "@chakra-ui/react"
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

	return (
		<Box height="100vh" display="flex" justifyContent="center" alignItems="center">
			<Text fontSize={["sm", "md", "xl"]}>You are not authorised to view this page</Text>
		</Box>
	)
}
