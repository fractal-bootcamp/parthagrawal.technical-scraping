

import * as cheerio from 'cheerio'
import { fetchHtml, scraper } from './scraper'




// fetchHtml("https://www.google.com").then(response => { console.log(response) })

scraper("http://localhost:3000", 10, 10, 10, 10)