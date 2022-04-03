import GetGame from "./routes/get-game"
import { Dashboard, Users, User } from "./routes/admin"
import Login from "./routes/login"
import Register from "./routes/register"
import Copyright from "./components/copyright"
import { Routes, Route } from "react-router-dom"
import useAuth from "./components/auth"
import ProtectedRoute from "./components/protectedRoute"
import StaffRoute from "./components/staffRoute"

export default function App() {
	const [user, auth, logout, resetAuth] = useAuth()

	return (
		<>
			<Routes>
				<Route element={<ProtectedRoute user={user} auth={auth} />}>
					<Route exact path="" element={<GetGame user={user} logout={logout} />} />
					<Route path="admin" element={<StaffRoute user={user} />}>
						<Route path="users">
							<Route path=":roll" element={<User />} />
							<Route path="" exact element={<Users />} />
						</Route>
						<Route exact path="" element={<Dashboard />} />
					</Route>
				</Route>
				<Route path="login" element={<Login resetAuth={resetAuth} />} />
				<Route exact path="register" element={<Register resetAuth={resetAuth} />} />
			</Routes>
			<Copyright />
		</>
	)
}
