const puppeteer = require('playwright');

let browser

(async() => {
    
    // module.browser = await puppeteer['chromium'].launch({executablePath:process.env['chrome_path'], headless:false,defaultViewport: null, args: ['--start-maximized']});
    
    // Object.getOwnPropertyNames(keyboard).forEach(console.log)
})();



 module.exports = async () => {
     if (!browser) {
        browser = await puppeteer['chromium'].launch({executablePath:process.env['chrome_path'], headless:false,defaultViewport: null, args: ['--start-maximized']});
     }
    let page = await browser.newPage()
    page.responseHistory = []
        // page.visit = page.goto
    page.on('response', async (resp) => {
        try {
            let d =  await resp.text();
            page.responseHistory.push({status : resp.status(), 
                data:d, 
                url : resp.url()})
    
        } catch (e) {

        }
      })
      page.getHistory = () => {
          return page.responseHistory
      }
      return page;
 }

//  (async() => {
    
//     let page = await exports();
//     page.goto("https://www.google.com")
   
//  })();
 

 
//     page 
//     BrowserPage() {
//         this.page = await browser.newPage()

//     }
    
// }