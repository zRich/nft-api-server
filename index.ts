import express, { Express, Request, Response } from "express";
require('dotenv').config();

import fs from 'fs'


const app: Express = express();
const port = process.env.PORT;
const IMAGE_SERVER = process.env.IMAGE_SERVER;

// token id api router
app.get('/api/token/:token_id', function(req: Request, res: Response) {
  const tokenId = parseInt(req.params["token_id"]).toString()

  const data = {
    "description": "西沙餐厅 NFT",
    "external_url": "https://openseacreatures.io/3",
    "image": `${IMAGE_SERVER}/${tokenId}.jpg`,
    "name": `西沙餐厅 NFT #${tokenId}`,
  }

  res.send(data)
})

//send image to user by token id

app.get('/api/image/:token_id', function(req: Request, res: Response) {
    const tokenId = parseInt(req.params["token_id"]).toString()
    //check if the image exists
    const imageFile = `${__dirname}/images/${tokenId}.jpg`
    if (!fs.existsSync(imageFile)) {
        res.sendFile(`${__dirname}/images/no-exist.jpg`)
        return
    }
    
    res.sendFile(`${imageFile}`)
})

app.listen(port, () => {
  console.log("Server is runing...")
})
