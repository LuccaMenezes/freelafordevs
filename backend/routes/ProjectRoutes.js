const router = require('express').Router()

const ProjectController = require('../controllers/ProjectController')

// middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', verifyToken, ProjectController.create);
router.get('/', ProjectController.getAll);
router.get('/myprojects', verifyToken, ProjectController.getAllUserProjects);
router.get('/myfreelas', verifyToken, ProjectController.getAllUserFreelas);
router.get('/:id', ProjectController.getProjectById);
router.delete('/:id', verifyToken, ProjectController.removeProjectById)
router.patch('/:id', verifyToken, ProjectController.updateProject)
router.patch('/interview/:id', verifyToken, ProjectController.interview)
router.patch('/conclude/:id', verifyToken, ProjectController.concludeProject)

module.exports = router;