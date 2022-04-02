import { Container, Text, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

export default function Copyright() {
	return (
		<Container maxW="container.lg">
			<Text color="red.700" py={4} fontSize="md" display="flex" justifyContent="center">
				&#169; 2022&nbsp;
				<Link color="red.900" href="https://www.atchox.com">
					Atreya Choudhury
					<sup>
						<ExternalLinkIcon ml={0.5} />
					</sup>
				</Link>
				&nbsp; No Rights Reserved
			</Text>
		</Container>
	)
}
