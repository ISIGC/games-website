import Input from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { FormControl, FormLabel } from "@chakra-ui/react"

export default function PhoneInput(props) {
	return (
		<FormControl
			mb={2}
			sx={{
				"& .PhoneInput .PhoneInputInput": {
					position: "relative",
					borderWidth: 1,
					borderStyle: "solid",
					borderColor: "gray.100",
					borderRadius: "md",
					outlineWidth: 2,
					outlineStyle: "solid",
					outlineColor: "transparent",
					outlineOffset: 2,
					p: 2,
					ml: 1
				},
				"& .PhoneInput .PhoneInputInput:hover": {
					borderColor: "gray.300"
				},
				"& .PhoneInput--focus .PhoneInputInput": {
					borderColor: "blue.500",
					zIndex: 1,
					borderWidth: 1,
					boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
				},
				"& .PhoneInput--focus .PhoneInputInput: hover": { borderColor: "blue.500" }
			}}
		>
			<FormLabel htmlFor="phone">Phone No.</FormLabel>
			<Input id="phone" defaultCountry="IN" international countryCallingCodeEditable={false} {...props} />
		</FormControl>
	)
}
