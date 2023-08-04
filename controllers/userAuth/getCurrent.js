const getCurrent = async(req, res) => {
try {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription
    })

} catch (error) {
    
}
}
module.exports = getCurrent;