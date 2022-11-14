import { Router } from 'express'
import validateCheck from '../helpers/validator'
import { createPost, updatePost } from '../validator/userpost.validation'
import authCheck from '../helpers/verify.token'
import { createUserPost, getPostGeo, updateUserPost, deleteUserPost, getOnePost, dashboard } from '../controllers/userpost.controller'

const router = Router()

// Authenticated User Post Routes

router.post('/', validateCheck(createPost), authCheck, createUserPost);
router.get('/list', getPostGeo);
router.get('/dashboard', dashboard);
router.get('/:id', validateCheck(updatePost), authCheck, getOnePost);
router.put('/:id', validateCheck(updatePost), authCheck, updateUserPost);
router.delete('/:id', authCheck, deleteUserPost);



export default router