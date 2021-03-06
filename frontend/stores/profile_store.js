const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const ProfileConstants = require("../constants/profile_constants");

let ProfileStore = new Store(AppDispatcher);


let _profiles = {};
let _errors;

// profiles are users with more information

ProfileStore.__onDispatch = function(payload){
  switch (payload.actionType){
  case ProfileConstants.PROFILE_RECEIVED:
    addProfile(payload.profile);
    ProfileStore.__emitChange();
    break;
  case ProfileConstants.PROFILES_RECEIVED:
    resetProfiles(payload.profiles);
    ProfileStore.__emitChange();
    break;
  case ProfileConstants.ERROR:
    setErrors(payload.errors);
    ProfileStore.__emitChange();
    break;
  }
};

ProfileStore.all = function(){
  let allProfiles = [];
  Object.keys(_profiles).forEach((userid) => {
    allProfiles.push(_profiles[userid]);
  });

  return allProfiles;
};

ProfileStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
}

ProfileStore.find = function(user_id){
  return _profiles[user_id];
};

const addProfile = function(profile){
  _profiles[profile.user.id] = profile;
};

const resetProfiles = function(profiles){
  _profiles = {};
  profiles.forEach((profile) => {
    _profiles[profile.user.id] = profile;
  });
};

const setErrors = function(errors){
  _errors = errors
};

module.exports = ProfileStore;
