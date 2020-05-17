/**
 * WordsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function(req, res){

    Words.find({}).populate('category').populate('advancement').exec(function(err, words){
      if(err){
        res.send(500, {error: err});
      }
      res.view('words/list',{words:words});
  });


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

      Words.find({
        where: {
          or: [
          {nativeWord: {'contains': wordName}},
          {foreignWord: {'contains': wordName}},
        ]}
      }).populate('category').populate('advancement').exec(function(err, words){
        if(err){
          res.send(500, {error: err});
        }
        res.view('words/list',{words:words});
      });
  }
};

