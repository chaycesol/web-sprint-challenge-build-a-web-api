const express = require('express');

//import Project dataa
const Projects = require('../data/helpers/projectModel');

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