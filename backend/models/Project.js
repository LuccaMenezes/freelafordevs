const mongoose = require('../db/conn')
const { Schema } = mongoose

const Project = mongoose.model(
   'Project',
   new Schema({
      title: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      subcategory: {
         type: String,
         required: true,
      },
      budget: {
         type: String,
         required: true,
      },
      model: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      skills: {
         type: String,
         required: true,
      },
      startdate: {
         type: String,
         required: true,
      },
      enddate: {
         type: String,
         required: true,
      },
      available: {
         type: Boolean
      },
      user: Object,
      freelancer: Object,
   }, { timestamps: true }),
)

module.exports = Project