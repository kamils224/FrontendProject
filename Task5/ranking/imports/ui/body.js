import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import {Foods } from '../api/foods.js';
 
import './food.js';
import './body.html';
 

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('foods');
});

Template.body.helpers({
    foods() {
        const instance = Template.instance();
        return Foods.find({}, { sort: { points: -1 } });
      },
});

Template.body.events({
    'submit .new-food'(event) {
      // Prevent default browser form submit
      event.preventDefault();
  
      // Get value from form element
      const target = event.target;
      const text = target.text.value;
      const image = 'empty';
  
      Meteor.call('foods.insert', text, image);
  
      // Clear form
      target.text.value = '';
    },
  });