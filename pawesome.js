if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}


Accounts.onLogin(function(){
  var data = spoofUserData();
  console.log(data);
  Meteor.users.update({_id:Meteor.user()._id}, { $set: {profile: data} });

});

//Meteor.users.update({_id:Meteor.user()._id}, { $set: spoofUserData() });

function spoofUserData(){
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
        breed: "beagle",
        likes: "belly rubs, treats",
        dislikes: "cats, trees",
        image: "http://www.dogbreedinfo.com/images24/BeagleBayleePurebredDogs8Months2.jpg"
      }
    ];
    return data;
}
