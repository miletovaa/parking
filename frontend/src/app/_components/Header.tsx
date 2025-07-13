'use client'
import { useRouter } from "next/navigation"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react"
import { TbLogout } from "react-icons/tb"

import { authApi } from '@/api'
import { useMeStore } from '@/providers/me-store-provider'

export default function Header() {
    const router = useRouter()

    const me = useMeStore((store) => store.me)
    const setMe = useMeStore((store) => store.update)

    const logout = () => {
        authApi().logout().then(() => {
            setMe(null)
            router.push("/login")
        }).catch(error => {
            console.error("Logout failed", error)
        })
    }

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
                    <>
                        <NavbarItem>
                            <Link href="/profile">
                                {me.name}
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                isIconOnly 
                                color="primary" 
                                variant="flat" 
                                className="hover:text-primary" 
                                onPress={logout}
                            >
                                <TbLogout />
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/login" variant="flat">
                            Login
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar>
    )
}
