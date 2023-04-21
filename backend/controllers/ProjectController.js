const Project = require('../models/Project')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const { json } = require('express')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class ProjectController {

   // create a project
   static async create(req, res) {
      
      const {title, category, subcategory, budget, model, description, skills, startdate, enddate} = req.body

      const available = true

      //validations
      if (!title) {
         res.status(422).json({ message: 'O titulo é obrigatório!'})
         return
      }

      if (!category) {
         res.status(422).json({ message: 'A categoria é obrigatória!'})
         return
      }

      if (!subcategory) {
         res.status(422).json({ message: 'A subcategoria é obrigatória!'})
         return
      }

      if (!budget) {
         res.status(422).json({ message: 'O orçamento é obrigatório!'})
         return
      }

      if (!model) {
         res.status(422).json({ message: 'O modelo de trabalho é obrigatório!'})
         return
      }

      if (!description) {
         res.status(422).json({ message: 'A descrição é obrigatória!'})
         return
      }

      if (!skills) {
         res.status(422).json({ message: 'As habilidades são obrigatórias!'})
         return
      }

      if (!startdate) {
         res.status(422).json({ message: 'A data inicial é obrigatória'})
         return
      }

      if (!enddate) {
         res.status(422).json({ message: 'A data final é obrigatória'})
         return
      }

      //get project owner
      const token = getToken(req)
      const user = await getUserByToken(token)

      // create a project
      const project = new Project ({
         title,
         category,
         subcategory,
         budget,
         model,
         description,
         skills,
         startdate,
         enddate,
         available,
         user: {
            _id: user._id,
            name: user.name,
            email: user.email,
         },
      })

      try {

         const newProject = await project.save()
         res.status(201).json({ message: 'Projeto publicado com sucesso!', 
            newProject,
         })
      } catch (error) {
         res.status(500).json({ message: error})
      }
   }

   static async getAll(req, res) {
      const project = await Project.find().sort('-createdAt')

      res.status(200).json({
         project: project,
      })
   }

   static async getAllUserProjects(req, res) {

      // get user from token
      const token = getToken(req)
      const user = await getUserByToken(token)

      const project = await Project.find({'user._id': user._id}).sort('-createdAt')

      res.status(200).json({
         project,
      })
   }

   static async getAllUserFreelas (req, res) {

      // get user from token
      const token = getToken(req)
      const user = await getUserByToken(token)

      const project = await Project.find({'freelancer._id': user._id}).sort('-createdAt')

      res.status(200).json({
         project,
      })
   }

   static async getProjectById (req, res) {

      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!'})
         return
      }

      //check if project exists
      const project = await Project.findOne({ _id: id })
      
      if (!project) {
         res.status(404).json({ message: 'Projeto não encontrado!'})
      }

      res.status(200).json({
         project: project,
      })
   }

   static async removeProjectById (req, res) {
      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!'})
         return
      }

      //check if project exists
      const project = await Project.findOne({ _id: id })
      
      if (!project) {
         res.status(404).json({ message: 'Projeto não encontrado!'})
         return
      }

      // check if logged in user registered the project
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (project.user._id.toString() != user._id.toString()) {
         res.status(404).json({
            message:
               'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
         })
         return
      }

      await Project.findByIdAndRemove(id)
''
      res.status(200).json({ message: 'Projeto removido com sucesso!' })
   }

   static async updateProject(req, res) {
      const id = req.params.id

      const {title, category, subcategory, budget, model, description, skills, startdate, enddate, available} = req.body

      const updatedData = {}

      // check if project exists
      const project = await Project.findOne({ _id: id })

      if (!project) {
         res.status(404).json({ message: 'Projeto não encontrado!' })
         return
      }

      // check if user registered this project
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (project.user._id.toString() != user._id.toString()) {
         res.status(404).json({
            message:
               'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
         })
         return
      }

       //validations
       if (!title) {
         res.status(422).json({ message: 'O titulo é obrigatório!'})
         return
      } else {
         updatedData.title = title
      }

      if (!category) {
         res.status(422).json({ message: 'A categoria é obrigatória!'})
         return
      } else {
         updatedData.category = category
      }

      if (!subcategory) {
         res.status(422).json({ message: 'A subcategoria é obrigatória!'})
         return
      } else {
         updatedData.subcategory = subcategory
      }

      if (!budget) {
         res.status(422).json({ message: 'O orçamento é obrigatório!'})
         return
      } else {
         updatedData.budget = budget
      }

      if (!model) {
         res.status(422).json({ message: 'O modelo de trabalho é obrigatório!'})
         return
      } else {
         updatedData.model = model
      }

      if (!description) {
         res.status(422).json({ message: 'A descrição é obrigatória!'})
         return
      } else {
         updatedData.description = description
      }

      if (!skills) {
         res.status(422).json({ message: 'As habilidades são obrigatórias!'})
         return
      } else {
         updatedData.skills = skills
      }

      if (!startdate) {
         res.status(422).json({ message: 'A data inicial é obrigatória'})
         return
      } else {
         updatedData.startdate = startdate
      }

      if (!enddate) {
         res.status(422).json({ message: 'A data final é obrigatória'})
         return
      } else {
         updatedData.enddate = enddate
      }

      await Project.findByIdAndUpdate(id, updatedData)

      res.status(200).json({ message: 'Projeto atualizado com sucesso!' })
   }

   static async interview (req, res) {
      const id = req.params.id

      //check if exists
      const project = await Project.findOne({ _id: id })
      
      if (!project) {
         res.status(404).json({ message: 'Projeto não encontrado!'})
      }

      // check if logged in user registered the project
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (project.user._id.equals(user._id)) {
         res.status(404).json({
            message:
               'Você não pode agendar uma entrevista com seu próprio projeto!',
         })
         return
      }

      // check if user has already scheduled a interview
      if (project.freelancer) {
         if (project.freelancer._id.equals(user._id)) {
            res.status(404).json({
               message:
                  'Você já agendeu uma entrevista para esse projeto!',
            })
            return
         }
      }
      //add user to project
      project.freelancer = {
         _id: user._id,
         name: user.name,
         email: user.email
      }

      await Project.findByIdAndUpdate(id, project)

      res.status(200).json({
         message: `A entrevista foi agendada com sucesso, entre em contato com ${project.user.name} pelo email ${project.user.email}`
      })
   }

   static async concludeProject (req, res) {
      const id = req.params.id

      //check if project exists
      const project = await Project.findOne({ _id: id })
      
      if (!project) {
         res.status(404).json({ message: 'Projeto não encontrado!'})
         return
      }    

      // check if logged in user registered the project
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (project.user._id.toString() != user._id.toString()) {
         res.status(404).json({
            message:
               'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
         })
         return
      }

      project.available = false

      await Project.findByIdAndUpdate(id, project)

      res.status(200).json({
         message: 'Parabéns, o seu projeto foi concluido com sucesso!'
      })
   }
}