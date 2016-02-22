angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaImagePicker, $cordovaFileTransfer) {
  $scope.getPicture = function() {
    var options = {
      maximumImagesCount: 1
    };

    //http://www.raymondcamden.com/2015/03/12/selecting-multiple-images-in-a-phonegapcordova-app/
    $cordovaImagePicker.getPictures(options).then(function(results) {
      $scope.originalImageUri = results[0];

      /*$cordovaFileTransfer.download(results[0], cordova.file.dataDirectory + 'image.jpg', {}, true).then (
        function(fileEntry) {
          $scope.originalImageUri = fileEntry.nativeURL;
          console.log('Original image URI: ' + $scope.originalImageUri);
        }, function (error) {
          console.log(error);
        }
      );*/
    }, function(error) {
      console.log('Error trying to load the image - ' + JSON.stringify(error));    // In case of error
    });
  };

  $scope.resizePicture = function() {
    var resizedImageUri = $scope.originalImageUri.replace(/(\.[\w\d_-]+)$/i, '_resized$1');

    var options = {
      sourceUri: $scope.originalImageUri,
      destinationUri: resizedImageUri,
      newWidth: 100,
      newHeight: 400,
      keepScale: true
    };

    ImageProcessing.resize(function(success) {
      $scope.resizedImageUri = resizedImageUri;

      console.log('Image resized!! - URI: ' + resizedImageUri);
    }, function(error) {
      console.log('Error trying to resize the image - ' + JSON.stringify(error));    // In case of error
    }, options)
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
