import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import useAuth from "./components/auth"
import Loading from "./components/loading"
import ProtectedRoute from "./components/protectedRoute"
import StaffRoute from "./components/staffRoute"
import Copyright from "./components/copyright"
import { Dashboard, Users, User } from "./routes/admin"
const Login = lazy(() => import("./routes/login"))
const Register = lazy(() => import("./routes/register"))
const GetGame = lazy(() => import("./routes/get-game"))

export default function App() {
	const [user, auth, logout, resetAuth] = useAuth()

	return (
		<>
			<Routes>
				<Route element={<ProtectedRoute user={user} auth={auth} />}>
					<Route
						exact
						path=""
						element={
							<Suspense fallback={<Loading />}>
								<GetGame user={user} logout={logout} />
							</Suspense>
						}
					/>
					<Route path="admin" element={<StaffRoute user={user} />}>
						<Route path="users">
							<Route path=":roll" element={<User />} />
							<Route exact path="" element={<Users />} />
						</Route>
						<Route exact path="" element={<Dashboard />} />
					</Route>
				</Route>
				<Route
					path="login"
					element={
						<Suspense fallback={<Loading />}>
							<Login resetAuth={resetAuth} />
						</Suspense>
					}
				/>
				<Route
					exact
					path="register"
					element={
						<Suspense fallback={<Loading />}>
							<Register resetAuth={resetAuth} />
						</Suspense>
					}
				/>
			</Routes>
			<Copyright />
		</>
	)
}
