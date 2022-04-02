import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Box } from "@chakra-ui/react"

export default function ProtectedRoute({ user, auth }) {
	const location = useLocation()

	useEffect(() => {
		auth()
		const id = setInterval(auth, 30000)
		return () => clearInterval(id)
	}, [auth])

	if (user === undefined) {
		return <Box>Loading</Box>
	} else if (user === null) {
		return <Navigate to="login" state={{ next: location.pathname }} />
	}
	return <Outlet />
}
