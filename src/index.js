import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import theme from "./theme"

createRoot(document.getElementById("igc")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Router>
				<App />
			</Router>
		</ChakraProvider>
	</React.StrictMode>
)
