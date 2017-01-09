/**
 * Created by jcf on 2017/1/9.
 */
//http 默认config 设置
angular.module('notesApp',[]).controller('LoginCtrl',['$http',function($http){
    var self = this;
    self.user = {};
    self.message = 'Please login';
    self.login = function(){
        $http.psot('/api/login',self.user).then(
            function(resp){
                self.message = resp.data.msg;
            }
        )


    }
}]).config(['$httpProvider',function($httpProvider){
    $httpProvider.defaults.transformRequest.push(
        function(data){
            var requestStr;
            if(data){
                data = JSON.parse(data);
                for(var key in data){
                    if(requestStr){
                        requestStr += '&' + key + '=' +data[key];
                    } else {
                        requestStr = key + '=' + data[key];
                    }
                }
            }
            return requestStr;
        }
    )
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}])