import { Outlet } from "react-router-dom"
import { Box } from "@chakra-ui/react"

export default function AdminRoute({ user, auth }) {
	if (user.groups.indexOf("admin") !== -1) {
		return <Outlet />
	}
	return <Box>You are not authorised to view this page</Box>
}
