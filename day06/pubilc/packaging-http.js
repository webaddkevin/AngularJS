/**
 * Created by jcf on 2017/1/9.
 */
//推荐做法
封装http服务
angular.module('notesApp',[]).factory('NoteService',['$http',function($http){
    return {
        query: function(){
            return $http.get('/api/notes')
        }
    }
}])
