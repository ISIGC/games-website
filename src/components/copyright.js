import { Container, Text } from "@chakra-ui/react"

export default function Copyright() {
	return (
		<Container maxW="container.lg">
			<Text py={4} fontSize="md" display="flex" justifyContent="center">
				Created and maintained by Atreya Choudhury
			</Text>
		</Container>
	)
}
