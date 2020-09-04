const express = require('express');

// Preserve the req.params values from the parent router for nested router
const router = express.Router({ mergeParams: true });

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel')

/* POST REQUESTS */
// create action to specific project by ID
router.post('/', (req, res) => {
  const newPost = { ...req.body, project_id: req.params.id };

  Actions.insert(newPost)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
    });
});

/* GET REQUESTS */
// get all actions 
router.get('/', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error);
    });
});

// retrieve action by ID
router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
    });
});

/* PUT REQUESTS */
// adds an action by Project ID
router.put('/:id', (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
    });
});

/* DELETE REQUESTS */
// delete an action of a project by ID
router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then((action) => {
      res.status(200).json({ message: `action removed with ID ${req.params.id}` });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;