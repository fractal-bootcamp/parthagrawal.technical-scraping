
/**
 * Implement a function that takes a URL as input and fetches the HTML content from that URL.
 * Log the size of the fetched HTML content in kilobytes.
 * @param url string
 * @returns html content, and size in kilobytes
 *  
 */
export const fetchHtml = () => {

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
 * 
 */
export const removeTag = () => {

}

/**
 * Save Processed HTML:
 * Save the cleaned HTML content to a file in an output directory.
 * Ensure the output directory exists; create it if it does not.

 */
export const saveHtml = () => {

}

/**
 * Extract Links:
 * Limit the number of extracted links per page to a configurable number (e.g., 10).
 * @param urls - string[] of url
 * What should the input be here?  
 */

export const extractLinks = () => {

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

export const writeLog = () => {

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




