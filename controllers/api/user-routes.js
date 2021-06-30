const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// find all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Could not find all users'});
      });
  });

// find 1 user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
          ]

    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'ID does not match a user' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Could not find the user'});
      });
  });

//create post
router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      github: req.body.github
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.github = dbUserData.github;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    });
  });

  // logging a user in
  router.post('/login', (req, res) => {
    User.findOne({
      //email
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      //invalid email
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
      //check pass
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      //invalid password
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      //session info
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.github = dbUserData.github;
        req.session.loggedIn = true;
  
        //logged message
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

//logged out
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

//update user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'ID does not match user' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Could not update the user'});
      });
  });

// delete user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'ID does not match user' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Could not delete the user'});
      });
  });

module.exports = router;