import GetGame from "./routes/get-game"
import Admin from "./routes/admin"
import Login from "./routes/login"
import Register from "./routes/register"
import Copyright from "./components/copyright"
import { Routes, Route } from "react-router-dom"
import useAuth from "./components/auth"
import ProtectedRoute from "./components/protectedRoute"
import AdminRoute from "./components/adminRoute"

export default function App() {
	const [user, auth, logout, resetAuth] = useAuth()

	return (
		<>
			<Routes>
				<Route element={<ProtectedRoute user={user} auth={auth} />}>
					<Route path="" element={<GetGame user={user} logout={logout} />} />
					<Route element={<AdminRoute user={user} />}>
						<Route path="admin" element={<Admin />} />
					</Route>
				</Route>
				<Route path="login" element={<Login resetAuth={resetAuth} />} />
				<Route path="register" element={<Register resetAuth={resetAuth} />} />
			</Routes>
			<Copyright />
		</>
	)
}
