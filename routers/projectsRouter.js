const express = require('express');

//import Project dataa
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

// initializing router
const router = express.Router()


/* GET REQUESTS */
// Returns List of Projects
router.get('/', (req, res) => {
    Projects.get()
    .then((projects) => {
        res.status(200).json(projects)
    })
    .catch((err) => {
        res.status(500).json({message: 'cannot retrieve projects,'})
    })
});
// Returns Specific Project with Actions by Project ID
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch((err) => {
        res.status(500).json({error: 'cannot fetch project with that id'})
    })
});

// // Returns list of actions for Specific project by Project ID
// router.get('/:id/actions', (req, res) => {
//     Projects.getProjectActions(req.params.id)
//     .then((actions) => {
//         res.status(200).json(actions)
//     })
//     .catch((err) => {
//         res.status(404).json({message: `actions for ${req.params.id} not found`})
//     })
// });

/* POST REQUESTS */
// Add a New Project
router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then((project) => {
        res.status(200).json(project).end()
    })
    .catch((err) => {
        res.status(500).json({message: 'unable to submit data', error: {err}})
    })
});

//Add action to Project by ID
router.post('/:id/actions', (req, res) => {
   const newAction = {...req.body, id: Number(req.params.id)}

   Actions.insert(req.body)
   .then((newAction) =>{
       res.status(200).json(newAction)
   })
   .catch((err) => {
       res.status(500).json({ message: 'unable to add action to project'})
   })
});


/* PUT REQUESTS */
router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
        res.status(200).json(updatedProject)
    })
    .catch((err) => {
        res.status(500).json({message: `unable to update or cant find a project with ID ${req.params.id}. please try again`})
    })
})

/* DELETE REQUESTS */
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then((deleted) => {
        res.status(201).json({message: `deleted project id: ${req.params.id}`})
    })
    .catch((err) => {
        res.status(500).json({error: 'error deleting project or cant find id. please try again.'})
    })
})

module.exports = router;