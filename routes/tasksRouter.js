const express = require('express')
const taskModel = require('../shcema/task-schema')
const tasksRouter = express.Router()





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

tasksRouter.get('/retreive/:updating?/:slug?/:name?/:dueDate?/:description?', async (req, res) => 
    {
        try
        {
            const locals = await taskModel.find()
            if (req.params.updating ==="true")
                {
                    locals.updating = true
                    const task = 
                    {
                        slug:req.params.slug,
                        name:req.params.name,
                        dueDate:req.params.dueDate,
                        description:req.params.description,
                    }
                    res.render('tasks',{locals:locals,task:task})
                }
                else
                {
                    res.render('tasks',{locals:locals}) 
                }
        }
        catch(error)
        {
            console.log(error)
        }
        
    })

tasksRouter.put('/put/:slug?',async (req, res) => 
        {
            try
            {
                if (req.params.slug)
                    {
                        const taskInstance = await taskModel.findOne({slug:req.params.slug})
                        const task = 
                        {
                            slug:taskInstance.slug,
                            name:taskInstance.name,
                            dueDate:taskInstance.dueDate.toISOString().split('T')[0],
                            description:taskInstance.description,
                        }
                        res.redirect(`/tasks/retreive/${true}/${task.slug}/${task.name}/${task.dueDate}/${task.description}`)
                    }else
                    {
                        await taskModel.findOneAndUpdate({slug:req.body.slug},req.body)
                        res.redirect('/tasks/retreive/')
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
//* Update Task
//* Delete Task

module.exports = tasksRouter