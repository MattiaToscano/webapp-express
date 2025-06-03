const setImagePath = (req, res, next) => {
    res.locals.imagePath = (filename) => {
        return `/img/${filename}`;
    };
    next();
};


module.exports = setImagePath
