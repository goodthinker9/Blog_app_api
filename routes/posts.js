import express from 'express'

const router=express.Router()

router.get("/test",(req,res)=>{
    res.json("this is post page")
})

export default router