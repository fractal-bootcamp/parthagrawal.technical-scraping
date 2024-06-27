

import * as cheerio from 'cheerio'
import { fetchHtml, scrapeLink, scraper } from './scraper'




// fetchHtml("https://www.google.com").then(response => { console.log(response) })

// scraper("http://localhost:3000", 10, 10, 10, 10)

scrapeLink("http://localhost:3000", 10)