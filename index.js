const express = require('express')
const app = express()
const port = 30000
const browser = require('./browser');
const uuid = require('uuid-random');
const _ = require('lodash')

app.use(express.json());
app.use(express.urlencoded());    

let allInstances = {

}

app.post('/instances', async (req,res) => {
    let newID = uuid()
    // let page = await browser.newPage()
    // page.responseHistory = []
    allInstances[newID] = await browser()
    // page.visit = page.goto
    // page.on('response', async (resp) => {
    //     try {
    //         let d =  await resp.text();
    //         page.responseHistory.push({status : resp.status(), 
    //             data:d, 
    //             url : resp.url()})
    
    //     } catch (e) {

    //     }
    //   })
    //   page.getHistory = () => {
    //       return page.responseHistory
    //   }
    res.send({id:newID})

})

app.post('/instances/:id/actions/:method', async (req,res) => {
    let id = req.params.id;
    let obj = allInstances[id]
    
    if (!obj) {
        console.log("404",req.url)
        res.status(404).json({text:`Instance ${id} not found`})
        return
    }
    let method = _.get(obj,req.params.method)
    let params = req.body || []
    

    if (!method) {
        res.status(405).json({text:`Method of ${method} of Instance ${id} not found`})
        return
    }
    try {
        console.log(req.url)
        
        let r = await method.call(obj, ... params);
        
        
        if (req.query && req.query.isInstance) {
            if (r) {
                let ret
                if (req.query.isArray) {
                    ret = r.map((nr) => {
                        let newID = uuid()
                        allInstances[newID] = nr
                        return {id:newID}
                    })
                    

                } else {
                    let newID = uuid()
                    allInstances[newID] = r
                    ret = {id:newID}
    
                }
                res.send(ret)
    
            } else {
                res.send({id:null})
            }
            return

        }
        
        try {
            res.json(r ) ;
        } catch (e) {
            res.status(200).send({})
        }

    } catch (e ) {
        console.error("error",e)
        res.status(500).send(e)
    }

    

        

     



})

app.delete('/instances/:id/actions', async (req,res) => {

})

app.get('/', async (req, res) => {
    const page = await browser.newPage();
    await page['goto']('https://www.google.com');
    await page.screenshot({ path: 'example.png' });
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})