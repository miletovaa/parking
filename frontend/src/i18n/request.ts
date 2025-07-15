import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieHeader = (await headers()).get('cookie') || ''
  const match = cookieHeader.match(/(?:^|; )NEXT_LOCALE=([^;]*)/)
  const locale = match ? decodeURIComponent(match[1]) : 'en'

    return {
        locale,
        messages: (await import(`./locales/${locale}.json`)).default
    };
});