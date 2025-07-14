import { useTranslations } from 'next-intl'

export default function Home() {
    const t = useTranslations('not_found')

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">404 - {t('title')}</h1>
                <p className="text-lg">{t('description')}</p>
            </div>
        </>
    )
}