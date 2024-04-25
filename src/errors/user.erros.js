const EmailAlreadyInUseError = (res, email) => {
    return res.status(400).send(`The e-email ${email} is already in use`);
};

const NameAlreadyInUseError = (res) => {
    return res.status(400).send(`This userName is already in use`);
};

module.exports = { EmailAlreadyInUseError, NameAlreadyInUseError };
