Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 2000
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  region: "eu-west-1",
  bucket: "the-realm-ireland",
  acl: "public-read",
  AWSAccessKeyId: "AKIAJMY6TVHBE4A5V6QQ",
  AWSSecretAccessKey: "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",
  authorize: function () {
    let userFileCount = Files.find( { "userId": this.userId } ).count();
    return userFileCount < 3 ? true : false;
    if (!this.userId) {
      message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }
  },
  key: function ( file ) {
    var user = Meteor.users.findOne( this.userId );
    return user.username + "/" + file.name;
  }
});
