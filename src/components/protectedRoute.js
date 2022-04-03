import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Loading from "../components/loading"

export default function ProtectedRoute({ user, auth }) {
	const location = useLocation()

	useEffect(() => {
		auth()
		const id = setInterval(auth, 30000)
		return () => clearInterval(id)
	}, [location.pathname])

	if (user === undefined) {
		return <Loading />
	} else if (user === null) {
		return <Navigate to="login" state={{ next: location.pathname }} />
	}
	return <Outlet />
}
