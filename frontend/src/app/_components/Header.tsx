'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react"
import { use } from "react"
import { authApi } from "@/api"

export default function Header() {
    const me = null // TODO: use(authApi().me())

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <p className="font-bold text-inherit uppercase">Parking</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex" justify="center">
                <NavbarItem isActive>
                    <Link href="#">
                        Reserve a spot
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Price
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Contacts
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {me ? (
                    <NavbarItem>
                        <Link href="/profile">
                            {/* {me.name} */}
                        </Link>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem>
                            <Link href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="#" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    )
}
