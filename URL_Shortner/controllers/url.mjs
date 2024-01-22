import { nanoid } from "nanoid"

import { URL } from "../models/url.mjs"
import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017/url').then(()=>console.log('DB connected')).catch((err)=>{
    console.log(err)
})
export const generateNewShortURL = async (req,res) => {

    const body = req.body;
    if(!body?.url){
        return res.status(400).json({error:'url in require'})
    }
    const shortId = nanoid(8)
    await URL.create(
        {
            shortId,
            redirectURL: body.url,
            visitHistory: [],
        }
    )
    return res.status(201).json({id: shortId})
}

export const redirectToWebsite = async (req, res) => {
    const id = req.params.id
    const entry = await URL.findOneAndUpdate({'shortId':id}, {$push:{
        visitHistory: [{ timestamp:  Date.now()}]
    }})
    res.redirect(entry.redirectURL)
}

export const getAnalyticsById = async (req, res) => {
    const id = req.params.id
    const entry = await URL.findOne({'shortId':id})
    res.status(200).json({
        totalClicks: entry.visitHistory.length, analytics:entry.visitHistory
    })
}

