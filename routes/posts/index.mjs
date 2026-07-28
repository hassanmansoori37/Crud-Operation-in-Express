import express from 'express'
import { title } from 'node:process';

const router = express.Router()

let allPosts = [];

router.post('/post' , (req, res) => {
    // console.log(req.body);

    if(!req.body.title){
        res.status(400).send({
            message: "title is required"
        })
    }

     if(!req.body.description){
        res.status(400).send({
            message: "description is required"
        })
    }


    

    const newPost = {
        title: req.body.title,
        description: req.body.description,
        id: new Date().getTime(),
    }

    allPosts.unshift(newPost)
    // console.log(title);
    // console.log(description);
    
    
    res.status(201).send({
        message: "post created"
    })
})

router.get('/post' , (req, res) => {
    res.status(200).send({
        message: "all post fetched",
        data: allPosts
    })
})

router.get('/post/:postId' , (req, res) => {
    const postId = req.params.postId
    if(!postId){
        return res.status(400).send({
            message: "post id is required"
        })
        
    }

    const post = allPosts.find((singlePost) => {
        return singlePost.id == postId
    })

   if(!post){
        return res.status(404).send({
             message: "page not found"
        })
       
    }
    res.send({
        message: "post fetched",
        data: post,
    })
})

router.put('/post/:postId' , (req, res) => {
     const postId = req.params.postId

      if(!req.body.title){
        res.status(400).send({
            message: "title is required"
        })
    }

     if(!req.body.description){
        res.status(400).send({
            message: "description is required"
        })
    }


    if(!postId){
        return res.status(404).send({
            message: "post id is required"
        })
        
    }

    const post = allPosts.find((singlePost) => {
        return singlePost.id == postId
    })

    if(!post){
        return res.status(404).send({
             message: "page not found"
        })
       
    }

    const newPosts = allPosts.map((singlePost) => {
        return singlePost.id == postId ? {
            ...singlePost,
            title: req.body.title,
            description: req.body.description,
        }
        : singlePost
    })

    allPosts = newPosts
    res.send({
        message: "post edit"
    })
})

router.delete('/post/:postId' , (req, res) => {
    const postId = req.params.postId
    if(!postId){
        return res.status(404).send({
            message: "post id is required"
        })
        
    }

    const post = allPosts.find((singlePost) => {
        return singlePost.id == postId
    })

    if(!post){
        return res.status(404).send({
             message: "page not found"
        })
       
    }
     const newPosts = allPosts.filter((singlePost) => {
        return singlePost.id != postId
     })

     allPosts = newPosts
    res.send({
        message: "post deleted"
    })
})

export default router