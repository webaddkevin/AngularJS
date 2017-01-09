/**
 * Created by jcf on 2017/1/9.
 */
angular.module('notesApp',[]).controller('MainCtrl',['$http',function($http){
    var  self = this;
    self.items = [];

    self.newTodo = {};
    var fetchTodos = function(){
        return $http.get('/api/note').then(function(response){
            self.items = response.data;
        },function(errResponse){
            console.log('Error while fetching notes');
        })
    }
    fetchTodos();
    self.add = function(){
        $http.post('/api/note',self.newTodo).then(fetchTodos).then(function(response){
            self.newTodo = {};
        })
    }
}]).factory('loggingInterceptor',['$q',function($q){
    //登录拦截器
    return {
        request: function(config){
            console.log('Request made with ',config);
            return config;
            //如果发生了某种无法处理的错误或者满足特定条件的错误，可以直接调用
            //return $q.reject('Not allowed')
        },
        requestError: function(rejection){
            console.log('Request error due to ',rejection);
            //错误信息返回
            return $q.reject(rejection);
        },
        response: function(response){
            console.log('Response from server',response);
            //返回promise对象
            return response  || $q.when(response)
        },
        responseError: function(rejection){
            console.log('Error in response ',rejection)
            //继续执行以确保promise链上下一环能够接收到错误信息
            //如果有必要的话，也可以检查状态码
            // if (rejection.status === 403){
            //     返回 msg
            // }
            return $q.reject(rejection)
        }
    }
}]).config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push('loggingInterceptor');
}])