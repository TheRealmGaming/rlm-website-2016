Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  region: "eu-west-1",
  bucket: "the-realm-ireland",
  acl: "public-read",
  authorize: function () {
    let userFileCount = Files.find( { "userId": this.userId } ).count();
    return userFileCount < 3 ? true : false;
  },
  key: function ( file ) {
    var user = Meteor.users.findOne( this.userId );
    return user.username + "/" + file.name;
  }
});
