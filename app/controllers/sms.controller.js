

exports.verifySms = (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log(req)
    res.status(200).json({message: 'success'})
};


exports.sendSms = (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log(req)
    res.status(200).json({message: 'success'})      
};