﻿window.mobSocial.factory('authProvider', ['$q', 'localStorageService', '$rootScope', 'webClientService', 'loggedInUserKey', 'userInfoKey', function ($q, localStorageService, $rootScope, webClientService, loggedInUserKey, userInfoKey) {
    var freshLoadComplete = false;
    return {
        markLoggedIn: function(user) {
            localStorageService.set(loggedInUserKey, true);
            localStorageService.set(userInfoKey, user);
            this.setLoggedInUser(user);
        },
        setLoggedInUser: function (user) {
            $rootScope.CurrentUser = user;
            $rootScope.UnreadNotificationCount = function () {
                if ($rootScope.CurrentUser || !$rootScope.CurrentUser.Notifications)
                    return 0;
                return $rootScope.CurrentUser.Notifications.reduce(function(total, n) {
                    if (n.EventName != "UserSentFriendRequest" && !n.IsRead)
                        total++;
                    return total;
                }, 0);
            };
            $rootScope.PendingFriendRequestsCount = function () {
                if ($rootScope.CurrentUser || !$rootScope.CurrentUser.Notifications)
                    return 0;
                return $rootScope.CurrentUser.Notifications.reduce(function (total, n) {
                    if (n.EventName == "UserSentFriendRequest") {
                        if (!n.FriendStatus && n.FriendStatus != 0)
                            n.FriendStatus = 2; //status to show accept or decline button
                        if (n.FriendStatus == 2)
                            total++;
                    }
                    return total;
                }, 0);
            };
        },
        getLoggedInUser: function () {
            var self = this;
            if (!freshLoadComplete && self.isLoggedIn() == true) {
                //get user from server
                webClientService.get("/api/users/get/me", null,
                    function (response) {
                        if (response.Success) {
                            self.markLoggedIn(response.ResponseData.User);
                            freshLoadComplete = true;
                        }
                    });
            } else {
                return localStorageService.get(userInfoKey);
            }
        },
        isLoggedIn: function () {
            //Authentication logic here
            if (localStorageService.get(loggedInUserKey)) {
                return true;
            } else {
                //Else send a rejection
                return $q.reject('Not Authenticated');
            }
        },
        logout: function() {
            localStorageService.set(loggedInUserKey, false);
            localStorageService.set(userInfoKey, null);
        }
    };
}]);