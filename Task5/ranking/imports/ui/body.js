import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import {Foods } from '../api/foods.js';
 
import './food.js';
import './body.html';
import {isFileImage} from '../utils/utils.js';
 
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('foods');
});

Template.body.helpers({
    foods() {
        const instance = Template.instance();
        let sortOrder = instance.state.get('toggleSorting')? 1 : -1;

        if(instance.state.get('showMyItems')){
          return Foods.find({owner: Meteor.userId()}, { sort: { points: sortOrder } });
        }
        return Foods.find({owner: {$ne: Meteor.userId()}}, { sort: { points: sortOrder } });
      },
});


const MAX_FILESIZE = 524288;
Template.body.events({
    'submit .new-food'(event) {
      // Prevent default browser form submit
      event.preventDefault();
  
      // Get value from form element
      const target = event.target;
      const text = target.text.value;
      const file = target.foodImage.files[0];
      console.log(file);
      if(!file || !isFileImage(file)){
        alert("You must add any image file");
        target.foodImage.value = '';
        return;
      }

      if (file.size > MAX_FILESIZE){
        alert("Maximum filesize is 0.5 MB");
        target.foodImage.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) =>{
        const image = e.target.result;
        Meteor.call('foods.insert', text, image);
      }
      reader.readAsDataURL(file);  
      // Clear form
      target.text.value = '';
      target.foodImage.value = '';
    },
    'change .toggle-sorting'(event, instance){
      instance.state.set('toggleSorting',event.target.checked);
    },
    'change .show-my-items'(event, instance){
      instance.state.set('showMyItems',event.target.checked);
    }
  });

