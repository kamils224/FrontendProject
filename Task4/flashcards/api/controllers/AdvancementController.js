/**
 * AdvancementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: function(req, res){
        Advancement.find({}).exec(function(err, adv){
            if(err){
              res.sen(500, {error: err});
            }
            res.view('advancement/list',{advancement:adv});
        });
      },
      add: function(req, res){
          res.view('advancement/add');
      },
      create: function(req, res){
        var advLevel = req.body.advLevel;
        Advancement.create({level: advLevel}).exec(function(err){
          if(err){
            res.send(500, {error: err});
          }
          res.redirect('/advancement/list');
      });
    
      },
      delete: function(req, res){
        Advancement.destroy({id:req.params.id}).exec(function(err){
          if(err){
            res.send(500,{error: err});
          }
          res.redirect('/advancement/list');
        });
        return false;
      },
      edit: function(req, res){
        Advancement.findOne({id:req.params.id}).exec(function(err, adv){
            if(err){
              res.send(500, {error: err});
            }
            res.view('advancement/edit', {advancement: adv});
        });
      },
      update: function(req, res){
        var advLevel = req.body.advLevel;
    
        Advancement.update({id: req.params.id},{level: advLevel}).exec(function(err){
          if(err){
            res.send(500, {error: err});
          }
          res.redirect('/advancement/list');
        });
        return false
      }

};

