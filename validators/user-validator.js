const validator = require('validator');

const validateUserInput = (req, res, next) => {
    const { name, email, role } = req.body;

    // Validate name
    if (!name || validator.isEmpty(name)) {
        return res.status(400).json({
            message: "Name is required",
            data: null
        });
    }

    // Validate email
    if (!email || validator.isEmpty(email)) {
        return res.status(400).json({
            message: "Email is required",
            data: null
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Invalid email format",
            data: null
        });
    }

    // Validate role
    const validRoles = ['admin', 'user'];

    if (!role || validator.isEmpty(role)) {
        return res.status(400).json({
            message: "Role is required",
            data: null
        });
    }

    if (!validRoles.includes(role.toLowerCase())) {
        return res.status(400).json({
            message: `Role must be one of the following: ${validRoles.join(', ')}`,
            data: null
        });
    }

    next();
};

module.exports = {
    validateUserInput,
};
