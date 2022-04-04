import { Box } from "@chakra-ui/react"
import Ellipsis from "./ellipsisAnim"

export default function Loading() {
	return (
		<Box height="100vh" display="flex" alignItems="center" justifyContent="center">
			<Ellipsis size={[2, 3]} />
		</Box>
	)
}
