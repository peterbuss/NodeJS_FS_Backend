const express = require('express');
const { postAuthor, getAuthorById, getAuthors, patchAuthor, deleteAuthor } = require('../services/authorService');
const router = express.Router();
const auth = require('../auth/authorization');


router.post('/', [auth, postAuthor]);
router.get('/', [auth, getAuthors]);
router.get('/:authorId', [auth, getAuthorById]);
router.patch('/:authorId', [auth, patchAuthor]);
router.delete('/:authorId', [auth, deleteAuthor]);


module.exports = router;