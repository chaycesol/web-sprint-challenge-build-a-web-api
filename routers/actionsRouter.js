const express = require('express');

// Preserve the req.params values from the parent router for nested router
const router = express.Router({ mergeParams: true });

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel')

/* POST REQUESTS */
// create action to specific project by ID
router.post('/',  validateProjectId, validateAction, (req, res) => {
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

// Custom Middleware Functions

// validates that the project id exists 
function validateProjectId(req, res, next) {
    const projectId = req.params.id || req.body.project_id;
    Projects.get(projectId)
      .then((project) => {
        if (project) {
          req.project = project;
          return next();
        } else {
          res.status(400).json({ message: "that is not a valid id" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "cant fetch project from db" });
      });
  } 

  // validates that the body of the response is not empty and that you are not missing a required field
  function validateAction( req, res, next) {
    if (isEmpty(req.body)) {
      res.status(400).json({ message: 'missing action data' });
    } else if (!req.body.description) {
      res.status(400).json({ message: 'missing required text field' });
    } else {
      req.body.project_id = req.project.id
      next();
    }
  };
  
// helper function for validateAction to check if body of request is empty
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

module.exports = router;