import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"
import { TbLanguage } from "react-icons/tb"

import { languages, getCurrentLocale } from '@/i18n/locales'

export default function LanguageSwitcher() {
    const router = useRouter()
    const [currentLocale, setCurrentLocale] = useState<string | Promise<string>>(getCurrentLocale())

    const changeLanguage = async (locale: string) => {
        document.cookie = `NEXT_LOCALE=${locale}; path=/;`
        setCurrentLocale(locale)
        router.refresh()
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    isIconOnly
                    color="secondary"
                    variant="bordered"
                    className="text-xl"
                >
                    <TbLanguage />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                selectedKeys={[currentLocale as string]}
                selectionMode="single"
                variant="flat"
            >
                {languages && languages?.map(lang => (
                    <DropdownItem key={lang.code} onPress={() => changeLanguage(lang.code)}>
                        {lang.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}