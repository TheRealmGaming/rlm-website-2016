if(Meteor.isServer) {
  var timeInMillis = 1000 * 600; // 10 mins
  FlowRouter.setPageCacheTimeout(timeInMillis)
};
