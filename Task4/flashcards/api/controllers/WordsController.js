/**
 * WordsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 //pagination limit
const limit = 50;

module.exports = {
  list: function(req, res){
    var page = 1;
    var pages = 1;
    if (req.query.page){
      page = req.query.page
      if(page < 1){
        res.send(404, {error: 'Not found'})
      }
    }
    Words.count().exec(function(err, numOfInstances){
      if(err){
        res.send(500, {error: err});
      }
      pages = Math.ceil(numOfInstances/limit);
      Words.find({skip: (page-1) * limit, limit : limit}).populate('category').populate('advancement').exec(function(err, words){
        if(err){
          res.send(500, {error: err});
        }
        var nextUrl = parseInt(page) === pages ? '#' : `/words/list?page=${parseInt(page)+1}`;
        var previousUrl = parseInt(page) === 1 ? '#' : `/words/list?page=${(page-1)}`;
        res.view('words/list', {words:words, nextUrl:nextUrl, previousUrl: previousUrl});
    });
    })
  },
  add: function(req, res){
    Categories.find({}).exec(function(err,categories){
      if(err){
        res.send(500, {error: err});
      }
      Advancement.find({}).exec(function(err,advancement){
        if(err){
          res.send(500, {error: err});
        }
        res.view('words/add',{categories: categories, advancement: advancement});
      });
    });
  },
  create:function(req, res){
    var nativeWord = req.body.nativeWord;
    var foreignWord = req.body.foreignWord;
    var category = req.body.category;
    var advancement = req.body.advancement;

    Words.create({nativeWord: nativeWord, foreignWord:foreignWord,category:category, advancement:advancement}).exec(function(err){
        if(err){
          res.send(500, {error: err});
        }
        res.redirect('/words/list');
    });
  },
  delete: function(req, res){
    Words.destroy({id:req.params.id}).exec(function(err){
      if(err){
        res.send(500,{error: 'Database Error'});
      }
      res.redirect('words/list');
    });
    return false;
  },
  edit: function(req, res){
    Words.findOne({id:req.params.id}).exec(function(err, word){
        if(err){
          res.send(500, {error: err});
        }
        Categories.find({}).exec(function(err,categories){
          if(err){
            res.send(500, {error: err});
          }
          Advancement.find({}).exec(function(err,advancement){
            if(err){
              res.send(500, {error: err});
            }
            res.view('words/edit', {word: word, categories: categories, advancement: advancement});
          });
        });
    });
  },
  update: function(req, res){
    var nativeWord = req.body.nativeWord;
    var foreignWord = req.body.foreignWord;
    var category = req.body.category;
    var advancement = req.body.advancement; 

    Words.update({id: req.params.id},{nativeWord: nativeWord, foreignWord:foreignWord,category:category, advancement:advancement}).exec(function(err, word){
      if(err){
        res.send(500, {error: err});
      }
      res.redirect('/words/list');
    });
    return false
  },
  search: function(req, res){
    var wordName = req.query.word;
    var page = 1;
    var pages = 1;
    if (req.query.page){
      page = req.query.page
    }
    if(page < 1){
      res.send(404, {error: 'Not found'})
    }

    Words.count().exec(function(err, numOfInstances){
      if(err){
        res.send(500, err);
      }
      pages = Math.ceil(numOfInstances/limit);
      Words.find({
        where: {
          or: [
          {nativeWord: {'contains': wordName}},
          {foreignWord: {'contains': wordName}},
        ]},
        skip: (page-1) * limit, 
        limit : limit,
  
      }).populate('category').populate('advancement').exec(function(err, words){
        if(err){
          res.send(500, {error: err});
        }
        var nextUrl = parseInt(page) === pages ? '#' : `/words/search?page=${parseInt(page)+1}&word=${wordName}`;
        var previousUrl = parseInt(page) === 1 ? '#' : `/words/search?page=${page-1}&word=${wordName}`;
        res.view('words/list',{words:words, nextUrl:nextUrl, previousUrl: previousUrl});
      });
    });
  }
};

