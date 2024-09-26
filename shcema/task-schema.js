const mongoose = require('mongoose')
const {Schema, model} = mongoose
const slugify = require('slugify')


const taskSchema = new Schema(
    {
        slug:String,
        name: String,
        dueDate: Date,
        description: String,
    })


taskSchema.pre('save',function(next)
    {
        this.slug = slugify(this.name,{lower:true},'-')
        next()
    })

const taskModel = model('Task',taskSchema)

module.exports = taskModel