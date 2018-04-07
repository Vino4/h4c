const HttpStatus = require("http-status-codes");

const Request = require("../../../models/").Request;
const User = require("../../../models/").User;
const createErrorHandler = require("../../utils").createErrorHandler;
const ObjectIdIsValid = require("mongoose").Types.ObjectId.isValid;


function validateInput(req) {
    return validateParameters(req.params);
}

function validateParameters(prm) {
    return prm.hasOwnProperty('RequestId') && typeof prm.RequestId === 'string'
        && ObjectIdIsValid(prm.RequestId);
}


module.exports = function (req, res, next) {

    if (!validateInput(req)) {
        const errorMessage = 'please give the correct RequestId';
        createErrorHandler(res, HttpStatus.BAD_REQUEST)(errorMessage);
        return;
    }

    const RequestId = req.params.RequestId,
        userId = req.user._id;

    Request.findOneAndRemove(
        {_id: RequestId, _creator: userId}
    ).exec()
        .then(function (Request) {
            /* if this Request is not found */
            if (Request === null) {
                const errorMessage = "Cannot find Request has id " + req.params.RequestId + " to delete";
                return createErrorHandler(res, HttpStatus.NOT_FOUND)(errorMessage);
            }

            /* remove this item from User.Requests array */
            User.findOneAndUpdate(
                {_id: userId},
                {$pull: {'Requests': RequestId}},
                {new: true}
            ).exec().then(function (user) {
                return res.status(HttpStatus.OK).json({
                    Request: Request,
                });
            })
                .catch(createErrorHandler(res, HttpStatus.INTERNAL_SERVER_ERROR));


        })
        .catch(createErrorHandler(res, HttpStatus.INTERNAL_SERVER_ERROR));
};
