FakeDogs = new Mongo.Collection("dogs");
FakeParks = new Mongo.Collection("parks");

var paw = {
  init : function(){
    

    if (Meteor.isClient) {
      // counter starts at 0
      Session.setDefault('counter', 0);
      

      Template.body.helpers({
        friends: function () {
          return FakeDogs.find();
        },
        mapLoaded : function(){
            return paw.map.init("paw-map");
        }
      });

      Template.dogProfile.helpers({
        currentPark : function(dog){
          return "none";
        }
      });

      Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
      });
    }

    if(Meteor.isServer){
      Meteor.startup(function () {
        paw.spoofer.generateObjects(FakeDogs, "dogs");
        paw.spoofer.generateObjects(FakeParks, "parks");
      });
      
    }


    Accounts.onLogin(function(){
      Meteor.users.update({_id:Meteor.user()._id}, { $set: {profile: paw.spoofer.getUserData()} });

    });
  },
  spoofer : {
    getUserData : function(){
      var data = Meteor.user().profile;
      if(!data){
           data = {}
        }

      data.firstName = "John";
      data.lastName = "Doe";
      data.dogs = [
        {
          name : "Burt",
          age: 2,
          breed: "Beagle",
          likes: "belly rubs, treats",
          dislikes: "cats, trees",
          image: "http://www.dogbreedinfo.com/images24/BeagleBayleePurebredDogs8Months2.jpg",
          owner: Meteor.user()._id,
          checkIn: {
            latitude: null,
            longitude: null
          }

        }

      ];
      return data;
    },
    generateObjects : function(collection, objName){
      var count = collection.find().count();
      var file = objName + ".json";

      //console.log(count);

      if (count > 0) collection.remove({}); // undoing previous code

      Assets.getText(file, function(err, data) {
        
        var json = EJSON.parse(data);

        //console.log(json);

        var content = json[objName];

        //console.log(content[0]);

        for(var i = 0; i < content.length; i++){
          //console.log(content[i]);
          collection.insert(content[i]);
        }

      });
    }
  },
  map : {
    init : function(divId){
      var success = false;
      navigator.geolocation.getCurrentPosition(function(position){
          var lat = position.coords.latitude;
          var lon = position.coords.longitude
          L.mapbox.accessToken = 'pk.eyJ1IjoidG5zaW5nbGUiLCJhIjoiY2lmbHVpYmZpZm80bnNlbTcxbWJ1ZzBydyJ9.TF4-8iEqdwgSPKIembmNrw';
          L.mapbox.map(divId, 'tnsingle.cifluiaagfoh8rylxcx6xc3w7', {scrollWheelZoom: false}).setView([lat,lon], 14);

          Meteor.users.update({_id:Meteor.user()._id}, { $set: {'profile.checkIn': {'latitude' : lat,'longitude' : lon}} });

          success = true;
          },
          function(){
            console.log("nope");
          });

        return success;
    }

    
  }
}

paw.init();

