Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function () {
      return Resolutions.find();
    }
  });

    Template.resolution.helpers({
      time: function() {
        return moment(this.createdAt).fromNow();
      }
    });

   Template.body.events({
     'submit .new-resolution': function(event) {
       var title = event.target.title.value;
       var cat = event.target.cat.value;

       Resolutions.insert({
         title: title,
         cat: cat,
         createdAt: new Date()
       });

       event.target.title.value = "";
       event.target.cat.value="";

       return false;
     }

   });

   Template.resolution.events({
     'click .delete': function(){
       Resolutions.remove(this._id);
     }
   });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
