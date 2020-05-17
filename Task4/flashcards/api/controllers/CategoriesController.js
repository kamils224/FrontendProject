/**
 * CategoriesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function(req, res){
    Categories.find({}).exec(function(err, categories){
        if(err){
          res.sen(500, {error: err});
        }
        res.view('categories/list',{categories:categories});
    });
  },
  add: function(req, res){
      res.view('categories/add');
  },
  create: async function(req, res){
    var categoryName = req.body.categoryName;
    Categories.create({name: categoryName}).exec(function(err){
      if(err){
        res.send(500, {error: err});
      }
      res.redirect('/categories/list');
  });

  },
  delete: function(req, res){
    Categories.destroy({id:req.params.id}).exec(function(err){
      if(err){
        res.send(500,{error: err});
      }
      res.redirect('/categories/list');
    });
    return false;
  },
  edit: function(req, res){
    Categories.findOne({id:req.params.id}).exec(function(err, category){
        if(err){
          res.send(500, {error: err});
        }
        res.view('categories/edit', {category: category});
    });
  },
  update: function(req, res){
    var categoryName = req.body.categoryName;

    Categories.update({id: req.params.id},{name: categoryName}).exec(function(err){
      if(err){
        res.send(500, {error: err});
      }
      res.redirect('/categories/list');
    });
    return false
  }
};

