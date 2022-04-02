import { Container, Box } from "@chakra-ui/react"

export default function CardPage(props) {
	return (
		<Container minH="100vh" maxW="container.lg" display="flex" justifyContent="center" alignItems="start">
			<Box
				borderWidth={[0, 1]}
				borderRadius="md"
				w={["100%", "60%", "45%", 400]}
				p={8}
				mt={[4, 8, 12, 16]}
				{...props}
			/>
		</Container>
	)
}
