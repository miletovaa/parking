'use client'
import { useRouter } from "next/navigation"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react"
import { TbLogout } from "react-icons/tb"
import { useTranslations } from "next-intl"

import { authApi } from '@/api'
import { useMeStore } from '@/providers/me-store-provider'

export default function Header() {
    const router = useRouter()
    const t = useTranslations('header')

    const me = useMeStore((store) => store.me)
    const setMe = useMeStore((store) => store.update)

    const logout = () => {
        authApi().logout().then(() => {
            setMe(null)
            router.push("/login")
        }).catch(error => {
            console.error(t("logout_failed"), error)
        })
    }

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <p className="font-bold text-inherit uppercase">{t('parking')}</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex" justify="center">
                <NavbarItem isActive>
                    <Link href="#">
                        {t('reserve_a_spot')}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        {t('price')}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        {t('contacts')}
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
                                title={t('logout')}
                            >
                                <TbLogout />
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/login" variant="flat">
                            {t('login')}
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar>
    )
}
