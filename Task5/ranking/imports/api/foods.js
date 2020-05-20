import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Foods = new Mongo.Collection('foods');
 
if (Meteor.isServer) {
    Meteor.publish('foods', function foodsPublication() {
      return Foods.find({});
    });
  }

Meteor.methods({
  'foods.insert'(text, image) {
    check(text, String);
    check(image, String);
    let path = `user-images/${this.userId}/${image}`;
    // Make sure the user is logged in before inserting a food
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let points = 0;
 
    Foods.insert({
      text,
      image,
      points,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'foods.remove'(foodId) {
    check(foodId, String);

    const food = Foods.findOne(foodId);
    if (food.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Foods.remove(foodId);
  },
  'foods.setPrivate'(foodId, setToPrivate) {
    check(foodId, String);
    check(setToPrivate, Boolean);

    const food = Foods.findOne(foodId);

    // Make sure only the food owner can make a food private
    if (food.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Foods.update(foodId, { $set: { private: setToPrivate } });
  },
  'foods.voteUp'(foodId){
    check(foodId, String);

    const food = Foods.findOne(foodId);

    if(food.owner === this.userId){
      throw new Meteor.Error('self voting is forbidden');
    }

    Foods.update(foodId, {$set: {points: food.points+1}});
  },
  'foods.voteDown'(foodId){
    check(foodId, String);

    const food = Foods.findOne(foodId);

    if(food.owner === this.userId){
      throw new Meteor.Error('self voting is forbidden');
    }

    Foods.update(foodId, {$set: {points: food.points-1}});
  }
});