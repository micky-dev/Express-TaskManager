const express = require('express')
const taskModel = require('../shcema/task-schema')
const tasksRouter = express.Router()
require('.././shcema/task-schema')




tasksRouter.post('/create', async (req, res) => 
    {
        try
        {
            await taskModel.create(req.body)
            .then(() => 
                {
                    res.redirect('/')
                })
        }
        catch(error)
        {
            console.log(error)
        }

        //? Handle error in index.ejs
        
    })

tasksRouter.get('/retreive', async (req, res) => 
    {
        try
        {
            var locals = await taskModel.find()
        }
        catch(error)
        {
            console.log(error)
        }
        res.render('tasks',{locals:locals})
    })

tasksRouter.put('/put/:slug?',async (req, res) => 
        {
            try
            {
                if (req.params.slug)
                    {
                        const task = await taskModel.findOne({slug:req.params.slug})
                        const locals = 
                        {
                            slug:task.slug,
                            name:task.name,
                            dueDate:task.dueDate.toISOString().split('T')[0],
                            description:task.description
                        }
                        res.render('update',{locals:locals})
                    }else
                    {
                        await taskModel.findOneAndUpdate({slug:req.body.slug},req.body)
                        res.redirect('/tasks/retreive')
                    }

              
            }catch(error)
            {
                console.log(error)
            }
            
        })
    
tasksRouter.delete('/delete/:slug',async (req, res) => 
    {
        try
        {
            await taskModel.findOneAndDelete({slug:req.params.slug})
            res.redirect('/tasks/retreive')
        }catch(error)
        {
            console.log(error)
        }
        
    })




//* Create Task
// * Retreive Tasks
//? Update Task
//* Delete Task




module.exports = tasksRouter