import cheerio from "cheerio"
import { writeLog } from "../scraper"
/**
 * Extract Links:
 * Limit the number of extracted links per page to a configurable number (e.g., 10).
 * @param url - string of url
 */
export const extractLinks = async (html: string, breadth: number): Promise<string[]> => {
    const $ = await cheerio.load(html)
    // find all tags a and extract .attr() where it's href


    // ignore links that are # 
    const links = $('a[href]:not([href*="#"])')
    const linkArr = []

    for (let i = 0; i < breadth && i < links.length; i++) {
        linkArr.push((links.get(i).attribs.href))
    }

    return linkArr
}
