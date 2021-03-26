const puppeteer = require('playwright');

global.myBrowser = null;

 module.exports = async () => {
     
     if (!global.myBrowser) {
         global.myBrowser = await puppeteer['chromium'].launch({executablePath:process.env['chrome_path'], headless:false,defaultViewport: null, args: ['--start-maximized']});
     }
    let page = await global.myBrowser.newPage()
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