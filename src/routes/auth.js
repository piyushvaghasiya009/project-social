import { Router } from 'express'
import { signUp, signIn } from '../validator/auth.validation'
import validateCheck from '../helpers/validator';
import { createUser, logInUser } from '../controllers/auth.controller'

const router = Router()

// Register User Routes
router.post('/signup', validateCheck(signUp), createUser);
router.post('/signin', validateCheck(signIn), logInUser);

export default router;