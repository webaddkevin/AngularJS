/**
 * Created by jcf on 2017/1/3.
 */
angular.module('notesApp',[]).controller('ListCtrl',[function(){
    var self=this;
    self.items = [
        {id: 1,label: 'First',done: true},
        {id: 2,label: 'Second',done: false}
    ];
    self.getDoneClass = function(item){
        return {
            finished: item.done,
            undefished: !item.done
        }
    }

}])