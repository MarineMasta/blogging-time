//requires
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//using a lot of formating and function names from last homework, like findAll and destroy
//find all comments
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      //error
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', withAuth, (req, res) => {
  // check still in session before creating comment
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      //error
      .catch(err => {
        console.log(err);
        res.status(400).json({comment: 'Could not create this comment'});
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  // delete comment
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          //ID error
          if (!dbCommentData) {
            res.status(404).json({ message: 'This ID does not match any comment' });
            return;
          }
          res.json(dbCommentData);
        })
        //error
        .catch(err => {
          console.log(err);
          res.status(500).json({message: 'Could not delete this comment'});
        });
});

module.exports = router;