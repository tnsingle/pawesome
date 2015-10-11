var paw = {
  init : function(){
    FakeDogs = new Mongo.Collection("dogs");

    if (Meteor.isClient) {
      // counter starts at 0
      Session.setDefault('counter', 0);
      paw.spoofer.generateUsers(FakeDogs);

      Template.body.helpers({
        friends: function () {
          return FakeDogs.find({});
        }
      });

      Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
      });
    }


    Accounts.onLogin(function(){
      Meteor.users.update({_id:Meteor.user()._id}, { $set: {profile: paw.spoofer.getUserData()} });

    });
  },
  spoofer : {
    fakeDogs : [
      {
        name: "Bo",
        age: 7,
        breed: "German Shepard",
        likes: "children, strangers",
        dislikes: "smaller dogs",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Jordan Williams" // ideally this would be an id
      },{
        name: "Lassie",
        age: 1,
        breed: "Pomeranian",
        likes: "frisbee",
        dislikes: "large dogs",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Alice Wrinkle" // ideally this would be an id
      },{
        name: "Toy",
        age: 1,
        breed: "Mutt",
        likes: "children, playing catch, sleeping",
        dislikes: "cats",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Britt Neek" // ideally this would be an id
      },{
        name: "Mooshoe",
        age: 3,
        breed: "Chow",
        likes: "long walks, belly rubs",
        dislikes: "squirrels",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Hank Token" // ideally this would be an id
      },{
        name: "Daisy",
        age: 6,
        breed: "German Shepard",
        likes: "fetch, naps",
        dislikes: "sirens, vacuums",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Tony Becker" // ideally this would be an id
      },{
        name: "Princess",
        age: 12,
        breed: "Poodle",
        likes: "ice cubes, naps",
        dislikes: "males, puppies",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Jason Hugh" // ideally this would be an id
      },{
        name: "Buddy",
        age: 3,
        breed: "Mutt",
        likes: "fetch",
        dislikes: "children",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Wilson Jefferies" // ideally this would be an id
      },{
        name: "Toby",
        age: 9,
        breed: "Golden Retriever",
        likes: "children, food (anything)",
        dislikes: "smaller dogs",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Morgan Freeman" // ideally this would be an id
      },{
        name: "Koi",
        age: 7,
        breed: "Pug",
        likes: "belly rubs, cuddling",
        dislikes: "puppies",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Seth Rogan" // ideally this would be an id
      },{
        name: "Ruby",
        age: 2,
        breed: "Golden Doodle",
        likes: "children, fetch",
        dislikes: "smaller dogs",
        image: "https://openclipart.org/image/2400px/svg_to_png/166603/DogProfile.png",
        owner: "Ashley Davidson" // ideally this would be an id
      }
    ],
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

        }

      ];
      return data;
    },
    generateUsers : function(collection){
      _.each(paw.spoofer.fakeDogs, function(dog) { 
        collection.insert(dog);
      });
    }
  }
}

paw.init();

