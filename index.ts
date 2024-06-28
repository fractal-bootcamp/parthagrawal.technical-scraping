

import * as cheerio from 'cheerio'
import { fetchHtml, scrapeLink } from './scraper'
import process from 'process';




// fetchHtml("https://www.google.com").then(response => { console.log(response) })

// scraper("http://localhost:3000", 10, 10, 10, 10)

var args = process.argv;

console.log("number of arguments is " + args.length)

args.forEach((val, index) => {
    console.log(`${index}: ${val}`)
})

try {

    const link = args[2]
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    if (!urlRegex.test(link)) {
        throw new Error('Invalid. Ensure URL is formatted correctly')
    }
    try {
        const depth = args[3]
        if (!parseInt(depth)) {
            throw new Error('Invalid. Ensure depth is formatted correctly. ')
        }
        scrapeLink(link, parseInt(depth))
    }
    catch {
        console.error('Invalid depth provided')
    }
}
catch {
    console.error('Invalid link provided')
}

