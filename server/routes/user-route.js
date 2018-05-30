'use strict';

import {authController, userController} from '../controllers/index';
import {check, validate} from '../helpers/validate-helper';

module.exports = (app, router) => {

    router
        .route('/users/')
        .get([
            authController.isAuth
        ], userController.getUser)
        .put([
            authController.isAuth
        ], userController.update);

    router
        .route('/users/:email/verify')
        .post([
            authController.isAuth
        ], userController.verifyEmail);

    router
        .route('/users/sendCodeUnlock')
        .get([
            authController.isAuth
        ], userController.sendCodeUnlock);

    router
        .route('/users/unlockAllAlbum')
        .post([
            check('code').exists().withMessage('code is required field'),
            validate,
            authController.isAuth
        ], userController.unlockAllAlbum);

    router
        .route('/users/addEmail')
        .post([
            check('email').exists().withMessage('Email is required field'),
            validate,
            authController.isAuth
        ], userController.addEmail);

    router
        .route('/users/removeEmail')
        .post([
            check('email').exists().withMessage('Email is required field'),
            validate,
            authController.isAuth
        ], userController.removeEmail);

    router
        .route('/users/settings')
        .get([
            authController.isAuth
        ], userController.getSetting)
        .put([
            authController.isAuth
        ], userController.updateSetting);

    router
        .route('/users/payments')
        .post([
            check('planId').exists().withMessage('planId is required field'),
            validate,
            authController.isAuth
        ], userController.payment)
        .put([
            check('planId').exists().withMessage('planId is required field'),
            validate,
            authController.isAuth
        ], userController.updatePayment);

};