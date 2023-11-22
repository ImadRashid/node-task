const successResponse = (res, data, message) => {
    return res.status(200).json({ success: true, payload: { data, message } })
}

const failedResponse = (res, error, errorMessage) => {
    console.log(error)
    return res.status(400).json({ success: false, error: { message: errorMessage } })
}

module.exports = {
    successResponse,
    failedResponse
}