const Request = require("../../../models/").Request;
const createErrorHandler = require("../../utils").createErrorHandler;
const HttpStatus = require("http-status-codes");


function validateInput(req) {
    return validateParameters(req.params);
}

function validateParameters(prm) {
    return prm.hasOwnProperty('RequestId') && typeof prm.RequestId === 'string';
}


module.exports = function (req, res, next) {

    if (!validateInput(req)) {
        const errorMessage = 'please give the correct payload';
        createErrorHandler(res, HttpStatus.BAD_REQUEST)(errorMessage);
        return;
    }

    Request.findOne(
        {_id: req.params.RequestId, _creator: req.user._id, isDeleted: false})
        // .select("name totalCapacity groupCapacity endDate participants")
        .exec()
        .then(function (Request) {
            if (Request !== null) {
                return res.json({
                    Request: Request
                });
            } else {
                const errorMessage = "Cannot find an Request has id " + req.params.RequestId;
                return createErrorHandler(res, HttpStatus.NOT_FOUND)(errorMessage);
            }
        })
        .catch(createErrorHandler(res, HttpStatus.INTERNAL_SERVER_ERROR));
};
