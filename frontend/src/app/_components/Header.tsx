'use client'
import { useRouter } from "next/navigation"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"
import { TbLogout, TbUser, TbLogin } from "react-icons/tb"
import { useTranslations } from "next-intl"

import { authApi } from '@/api'
import { useMeStore } from '@/providers/me-store-provider'
import LanguageSwitcher from './LanguageSwitcher'

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
                <NavbarItem>
                    <LanguageSwitcher />
                </NavbarItem>
                {me ? (
                    <>
                        <NavbarItem>
                            <Button 
                                isIconOnly 
                                as={Link} 
                                color="secondary" 
                                href="/profile" 
                                variant="bordered"
                                title={t('profile')}
                            >
                                <TbUser className="text-xl" />
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                isIconOnly 
                                color="secondary" 
                                variant="bordered" 
                                onPress={logout}
                                title={t('logout')}
                            >
                                <TbLogout className="text-xl" />
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} color="secondary" href="/login" variant="bordered">
                            <TbLogin className="text-xl" />
                            <span className="font-semibold">{t('login')}</span>
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar>
    )
}
