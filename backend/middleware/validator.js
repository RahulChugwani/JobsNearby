const {body, validationResult} = require('express-validator/check')

const uservalidationRules = () =>{
    console.log("validaterules1")
    return[
        body('firstname').exists().withMessage('must enter required field')
                         .isAlpha().withMessage('must be alphabets').isString().withMessage('field must be string'),

        body('lastname').exists().withMessage('must enter required field')
                        .isAlpha().withMessage('must be alphabets').isString().withMessage('field must be string'),

        body('email').optional().isEmail().withMessage('field must be an email'),

        body('usertype').exists().withMessage('must enter required field')
                        .isIn(['labour', 'owner']).withMessage('field must be from given dropdown options'),

        body('phoneNo').exists().withMessage('must enter required field')
                       .isInt().withMessage('field must be an integer value'),

        body('currentCity').exists().withMessage('must enter required field')
                           .isString().withMessage('field must be string'),

        body('gender').exists().withMessage('must enter required field')
                      .isIn(['male', 'female', 'not want to disclose']).withMessage('field must be from given dropdown options'),

        body('isVerified').exists().withMessage('must enter required field')
                          .isIn(['true', 'false']).withMessage('field must be true or false'),

        body('dob').isISO8601().withMessage('field must be picked from date calendar'),

    ]
}

const validate = (req,res,next) => {
    console.log("vlidate1");
    const errors = validationResult(req);
    console.log(errors);

    if(errors.isEmpty()){
        console.log("validate properly");
        return next()
    }

    console.log("not validate properly");
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map( err => extractedErrors.push({ [err.param]: err.msg}))
    console.log("error in validator.js");
    
    return res.status(420).json({
        errors: extractedErrors,
    });

}

module.exports = {
    uservalidationRules,
    validate,
}