/**
 * Created by jcf on 2017/1/6.
 */
function ItemService(opt_items){
    var items = opt_items || [];
    this.list = function(){
        return items;
    };
    this.add = function(item){
        items.push(item);
    }
}

angular.module('notesApp',[]).provider('ItemService',function(){
    var haveDefaultItems = true;
    this.disableDefaultItems = function(){
        haveDefaultItems =false;
    }

    //用于获取依赖模块的将是下列函数，而不是上面的提供器
    this.$get = [function(){
            var optItems = [];
            if(haveDefaultItems){
                optItems = [
                    {id: 1, label: 'Item 0'},
                    {id: 2, label: 'Item 1'}
                ]
            }
            return new ItemService(optItems);
    }]

}).config(['ItemServiceProvider',function(ItemServiceProvider){
    var shouldHaveDefaults = false;
    if(!shouldHaveDefaults){
        ItemServiceProvider.disableDefaultItems();
    }
}]).controller('MainCtrl',[function(){
    var self = this;
    self.tab ='first';
    self.open = function(tab){
        self.tab = tab;
    }
}]).controller('SubCtrl',['ItemService',function(ItemService){
    var self = this;
    self.list = function(){
        return ItemService.list();
    }
    self.add =function(){
        ItemService.add({
            id: self.list().length + 1,
            label: 'Item '+self.list().length
        })
    }
}])