import { Page } from '../browser'
import { Crawler } from '../crawler'

const crawl = async (page: Page) => {
  const elements = await page.query('.w-grid-item-h')

  return await Promise.all(
    elements.map(async (element) => {
      const [start, title, url] = await Promise.all([
        element.childText('.event_date'),
        element.childText('.event_titles'),
        element
          .query('.w-grid-item-anchor')
          .then((element) => element?.getAttribute('href')),
      ])
      return { start, title, url }
    })
  )
}

const prepareDate = (date: string) => {
  const cleaned = date.slice(5)
  return [cleaned, 'dd.MM.yyyy']
}

export default {
  name: 'Bierhübeli',
  url: 'https://bierhuebeli.ch',
  crawl,
  prepareDate,
} as Crawler
