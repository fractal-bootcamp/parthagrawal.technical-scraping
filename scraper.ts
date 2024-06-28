import * as cheerio from 'cheerio';
import { promises as fs } from 'fs'
import path from 'path';
import { extractLinks } from './func/extractLinks';

/**
 * Implement a function that takes a URL as input and fetches the HTML content from that URL.
 * Log the size of the fetched HTML content in kilobytes.
 * @param url string
 * @returns html content
 *  
 */
export const fetchHtml = async (url: string) => {
    try {

        const response = await fetch(url);
        const html = await response.text()

        return html
    }
    catch (error) {
        debugger;
        return ""
    }

}


type RemoveTargets = {
    tags: string[],
    classes: string[],
    ids: string[],
    tagsWithAttributes: [
        {
            tag: string,
            attribute: {
                key: string,
                value: string
            }
        }
    ]

}
/**
 * Enables functionality to clean up the HTML by removing certain elements such as:
 * script tags
 * Elements with the class .vector-header
 * nav tags
 * Elements with the ID #p-lang-btn
 * Elements with the class .infobox
 * Ensure all stylesheet links (link rel="stylesheet") are filtered out
 * Filter 
 * @param html - HTML as a string
 * @param tags - string[] of tags to be removed 
 * @param classes
 * @param ids
 * @param tagsWithAttributes
 * @returns modified HTML
 * 
 */
export const removeTag = (html: string, { tags, classes, ids, tagsWithAttributes }: RemoveTargets): string => {
    const $ = cheerio.load(html)

    // tags
    tags.forEach((tag) => {
        $(tag).remove();
    })

    // classes
    classes.forEach((classElem) => {
        $(`[class="${classElem}"]`).removeClass(classElem)
    })

    //ids
    ids.forEach((idElem) => {
        $(`[id = "${idElem}"]`)
    })

    //tags with attributes
    tagsWithAttributes.forEach((elem) => {
        $(`${elem.tag}[${elem.attribute.key}="${elem.attribute.value}"]`).remove()
    })




    return $.html()

}

/**
 * Finds a tag
 * @param html - string of html
 * @param tag  - string tag to be found 
 * @returns 
 */

export const findTag = (html: string, tag: string) => {
    const $ = cheerio.load(html)
    const found = $('body').find(tag)
    return found

}


/**
 * Save Processed HTML:
 * Save the cleaned HTML content to a file in an output directory.
 * Ensure the output directory exists; create it if it does not.
 * @param html - string
 * @param description
 * @returns file path

 */

import crypto from 'crypto';

export const saveHtml = async (html: string, description: string): Promise<string> => {
    const outputDir = './output';

    // Sanitize the description: remove slashes and other problematic characters
    const sanitizedDescription = description.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    // Generate a timestamp
    const timestamp = Date.now();

    // Generate a short hash to ensure uniqueness
    const hash = crypto.createHash('md5').update(html).digest('hex').substring(0, 6);

    const fileName = `${timestamp}_${sanitizedDescription}_${hash}.html`;
    const filePath = path.join(outputDir, fileName);

    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Write the file
    await fs.writeFile(filePath, html, 'utf-8');

    return filePath;
}



/**
 * Traversal Depth:
 * Implement functionality to traverse links up to a specified depth from the initial page.
 * Depth should be a configurable parameter.
 * @param html - the page itself.
 * @param url ? should this be a parameter?  
 * Question - what am I actually passing to these functions? is it an HTML page? and I basically traverse those? 
 * I should test this out. 
 * @returns ?? what should this return? should this return anything? 
 * Should this essentially store the result of the traversed links?

 */

export const traverseLinks = () => {

}

/** 
 * Logging:
 * Log meaningful messages at various steps, such as when a page is being loaded, 
 * the size of the fetched HTML, and the links being processed.
 * 
 * @param input - string of what is being inputted. not sure if this should be basically as 
 * wide as possible
 * @returns ?? should this do a console.log or should this write the log somewhere?
 * 
 * 
 */

export const writeLog = (input: string) => {
    console.log(input)

}

/** 
 * Command-Line Interface:
 * The script should be runnable from the command line and take a URL and a depth as an argument.
 * If no URL is provided, the script should log an error message and exit.
 * @param input - string from CMDline
 * maybe this will have to be in the main body of the script... or it 
 * receives parameters from the main body of the script once it's called


 */

export const parseCmdInput = () => {

}


/**
 * The main function - it'll recursively call itself and all of the other functions
 * @param seedUrl 
 * @param maxDepth 
 * @param maxBreadth 
 * @param depthCounter - this will get smaller and smaller
 * @param breadthCounter - this will get smaller and smaller
 */
// export const scraper = async (
//     seedUrl: string,
//     maxDepth: number,
//     maxBreadth: number = 10,
//     depthCounter: number,
//     breadthCounter: number

// ) => {

//     const fetched = await fetchHtml(seedUrl)
//     writeLog("html: " + fetched)
//     writeLog("size of fetched html: " + await fetched.length)


//     writeLog('html saved to' + saveHtml(fetched, "fetched_HTML"))



//     // // const cleanh2 = removeTag(fetched, 'h2')
//     // writeLog('cleaned HTML: ' + cleanh2)
//     // writeLog('cleaned html saved to' + await saveHtml(cleanh2, "cleaned_h2"))


//     const cleanedHtml = removeTag(fetched, blackListElems)
//     writeLog('cleaned HTML: ' + cleanedHtml)
//     writeLog('cleaned html saved to' + await saveHtml(cleanedHtml, "cleaned_tags"))

//     const linkArr = await extractLinks(cleanedHtml, 10)
//     writeLog('links extracted: ' + linkArr)




// }

export const scrapeLink = async (link: string, depthCounter: number) => {
    if (depthCounter <= 0) {
        return;
    }

    const fetched = await fetchHtml(link)
    writeLog('fetched page ' + link)
    const cleanedHtml = await removeTag(fetched, blackListElems)
    writeLog('cleaned page ' + link)
    debugger;
    saveHtml(cleanedHtml, `${link.replace(/^.*?:\/\//, '')};
}`)
    writeLog('saved page ' + link)


    const linkArr = await extractLinks(cleanedHtml, 10)
    linkArr.forEach((link) => {

        depthCounter--;
        return scrapeLink(link, depthCounter);
        return;

    })

    writeLog('completed layer #' + depthCounter)

    return
}

const blackListElems: RemoveTargets = {
    tags: [
        "script",
        "nav",
    ],
    classes: [
        "vector-header",
        "infobox"

    ],
    ids: [
        "#p-lang-btn",
    ],
    tagsWithAttributes: [
        {
            tag: "link",
            attribute: {
                key: 'rel',
                value: 'stylesheet'
            }

        }

    ]

}





