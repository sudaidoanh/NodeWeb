
module.exports = function SortMidleware(req, res, next) {

    res.locals._sort = {
        enabled: false,
        type: 'default',
        
    };

    if(req.query.hasOwnProperty('_sort')) {
        // req.locals._sort.enabled = true;
        // req.locals._sort.type = req.query.type;
        // req.locals._sort.name = req.query.column;

        Object.assign(res.locals._sort, {
            enabled : true,
            type : req.query.type,
            column : req.query.column
        })
    }

    next();
}