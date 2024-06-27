

import * as cheerio from 'cheerio'
import { fetchHtml, scraper } from './scraper'




// fetchHtml("https://www.google.com").then(response => { console.log(response) })

scraper("https://google.com", 10, 10, 10, 10)