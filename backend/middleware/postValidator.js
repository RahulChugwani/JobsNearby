const {body, validationResult} = require('express-validator/check')

const postValidationRules = () =>{
    return[
        
        body('postTitle').exists().isAlpha().isString(),
        body('requirementType').exists().isAlpha().isString(),
        body('workerType').exists().isIn(['daily','monthly']),
        body('salaryRange').exists().isString(),
        body('numberOfWorkerRequired').exists().isInt(),
        //body('currentCity').exists().isString(),
        body('gender').exists().isIn(['male', 'female', 'not want to disclose']),
        body('inTime').optional().isString(),
        body('outTime').optional().isString(),
        body('workDescription').exists().isString(),
        body('facilityProvided').optional().isString(),
        body('requiredSkillSetsId').exists().isString(),
        body('comments').optional().isString(),

    ]
}

const postValidate = (req,res,next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next()
    }
    
    const extractedErrors = []
    errors.array().map( err => extractedErrors.push({ [err.param]: err.msg}))
    
    return res.status(422).json({
        errors: extractedErrors,
    });

}

module.exports = {
    postValidationRules,
    postValidate,
}