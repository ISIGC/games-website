import { Box, HStack, keyframes, usePrefersReducedMotion, useTheme } from "@chakra-ui/react"

function Ellipsis({ size, color }) {
	const theme = useTheme()
	const twinkle = keyframes({
		"0%": { backgroundColor: theme.colors[color][400] },
		"50%": { backgroundColor: theme.colors[color][900] },
		"100%": { backgroundColor: theme.colors[color][400] }
	})
	const prefersReducedMotion = usePrefersReducedMotion()

	const anim = (delay) => (prefersReducedMotion ? undefined : `${twinkle} 0.8s infinite ${delay}s`)

	return (
		<HStack spacing={size}>
			{[0, 0.1, 0.2].map((num, key) => (
				<Box key={key} animation={anim(num)} height={size} width={size} borderRadius="50%" />
			))}
		</HStack>
	)
}

Ellipsis.defaultProps = {
	size: 2,
	color: "red"
}

export default Ellipsis
