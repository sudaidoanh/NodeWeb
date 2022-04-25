const Test = require('../models/Test');
const { mongooseToObject } = require('../../ulti/mongoose');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class PeopleController{

    create(req, res) {
        res.render('test/create');
    }

    storage(req, res, next) {
        const formData = req.body;
        const test = new Test(formData);
        test.save()
            .then(() => res.redirect('/people'))
            .catch(next);
    }

    edit(req, res, next) {
        // Test.findById(req.params.id)
        Test.findOne( {slug: req.params.slug })
            .then(test => res.render('test/edit', {
                test: mongooseToObject(test)
            }))
            .catch(next);
    }

    update(req, res, next) {
        Test.updateOne({ slug: req.params.slug}, req.body)
            .then(() => res.redirect(`/people/${req.params.slug}`))
            .catch(next);
    }
    
    show(req, res, next) {
        Test.findOne({ slug: req.params.slug })
            .then((test) => 
                res.render('test/show', { 
                    test: mongooseToObject(test) 
                })
            )
            .catch(next);
    }

    delete(req, res, next) {
        Test.delete({ slug: req.params.slug})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    permanentlyDelete(req, res, next) {
        Test.deleteOne({ slug: req.params.slug})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    trash(req, res, next) {
        Test.findDeleted({})
            .then(test => {
                res.render('test/trash', {
                    test: mutipleMongooseToObject(test) 
                });
            })
            .catch(next);
    }

    restore(req, res, next) {
        Test.restore({ slug: req.params.slug})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Test.delete({ slug:{ $in:  req.body.peopleSlugs }})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;  
            case 'restore':
                Test.restore({ slug:{ $in:  req.body.peopleSlugs }})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break; 
            default:
                res.render({ message: 'Action invalid'});
        }
    }

    index(req, res, next) {
        let peopleQuery = Test.find({});

        if(req.query.hasOwnProperty('_sort')) {
            peopleQuery = peopleQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([peopleQuery, Test.countDocumentsDeleted() ])
            .then(([test, deletedCount]) => 
                res.render('test/test', {
                    deletedCount,
                    test: mutipleMongooseToObject(test) 
                }))
            .catch(next);
    }
    
}

module.exports = new PeopleController;