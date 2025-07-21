import { heroui } from "@heroui/react"

// #140D4F (primary for light, background for dark), 
// #FFE734, 
// #0081AF (secondary), 
// #00ABE7, 
// #2DC7FF (text for dark)

export default heroui({
    themes: {
        light: {
            colors: {
                primary: {
                    DEFAULT: "#2DC7FF",
                    500: "#2DC7FF",
                },
                secondary: {
                    DEFAULT: "#00ABE7",
                    500: "#00ABE7",
                },
                warning: "#FFE734",
                background: "#FAFEFF",
                foreground: "#140D4F",
                divider: "#E5E5E5",
            }
        },
        dark: {
            colors: {
                primary: {
                    DEFAULT: "#2DC7FF",
                    500: "#2DC7FF",
                },
                secondary: {
                    DEFAULT: "#0081AF",
                    500: "#0081AF",
                },
                warning: "#FFE734",
                background: "#0E0E22",
                foreground: "#FAFEFF",
                content1: "#141424", // modal's bg
                divider: "#24243C", // divider
            }
        }
    }
})