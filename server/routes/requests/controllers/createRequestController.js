const HttpStatus = require("http-status-codes");
const validator = require('validator');

const Request = require("../../../models/").Request;
const RequestValidator = require("../../../models/").RequestValidator;
const User = require("../../../models/").User;
const createErrorHandler = require("../../utils").createErrorHandler;


const RequestProperties = ['title', 'questions'];

function validateInput(req) {
    let payload = req.body;
    return validateFormat(payload, RequestProperties)
        && RequestValidator(payload.title, payload.questions);
}


function validateFormat(payload, properties){
    let res = true;
    properties.forEach(function (property) {
        res = res && payload.hasOwnProperty(property);
    });
    return res;
}


module.exports = function (req, res, next) {
    if (!validateInput(req)) {
        const errorMessage = 'please give the correct payload';
        createErrorHandler(res, HttpStatus.BAD_REQUEST)(errorMessage);
        return;
    }

    const userId = req.user._id;
    const payload = req.body;

    const newRequest = new Request({
        _creator: userId,
        title: payload.title,
        questions: payload.questions
    });

    newRequest.save()
        .then(function (newRequest) {
            const newRequestId = newRequest._id;

            // push the Request id in User's Requests
            User.findOneAndUpdate(
                {_id: userId},
                {
                    // add Request id to user.Requests
                    $push: {
                        "Requests": {_id: newRequestId}
                    },

                    // set the last modfied date
                    $set: {
                        "lastModifiedTime": Date.now()
                    }
                })
                .exec()
                .then(function (user) {
                    return res.json({
                        Request: newRequest
                    })
                })
                .catch(createErrorHandler(res, HttpStatus.NOT_FOUND));

            // push the whole Request into Activity's Request

        })
        .catch(function(error){console.log(error)});
};
