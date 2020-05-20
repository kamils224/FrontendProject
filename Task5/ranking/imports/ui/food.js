import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './food.html';

Template.food.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.food.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('foods.setChecked', this._id, !this.checked);
 
 
  },
  'click .delete'() {
    Meteor.call('foods.remove', this._id);
  },
  'click .vote-up'(){
    if(!Meteor.user()){
      alert("Log in to vote");
      return;
    }
      Meteor.call('foods.voteUp', this._id);
  },
  'click .vote-down'(){
    if(!Meteor.user()){
      alert("Log in to vote");
      return;
    }
    Meteor.call('foods.voteDown', this._id);
}
});