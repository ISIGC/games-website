import { Box, HStack } from "@chakra-ui/react"

export default function Loading() {
	return (
		<Box height="100vh" display="flex" alignItems="center" justifyContent="center">
			<HStack spacing="2">
				<Box height="2" width="2" borderRadius="50%" backgroundColor="red.700"></Box>
				<Box height="2" width="2" borderRadius="50%" backgroundColor="red.700"></Box>
				<Box height="2" width="2" borderRadius="50%" backgroundColor="red.700"></Box>
			</HStack>
		</Box>
	)
}
