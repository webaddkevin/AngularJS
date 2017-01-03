/**
 * Created by jcf on 2017/1/3.
 */
describe('Controller:ListCtrl',function(){
    //在每次运行测试前都重新实例化一个模块
    beforeEach(module('notesApp'));
    var ctrl;
    //每次单元测试前都实例化一个新的控制器
    beforeEach(inject(function($controller){
        ctrl = $controller('ListCtrl');
    }))
    it('should have items available on load',function(){
        expect(ctrl.items).toEqual([
            {id: 1,label: 'First',done: true},
            {id: 2,label: 'Second',done: false}
        ])
    })

    it('should have highlight items based on state',function(){
        var item = {id: 1,label: 'Fisrst',done: true};
        var actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeTruthy();
        expect(actualClass.undefished).toBeFalsy();
        item.done = false;
        actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeFalsy();
        expect(actualClass.undefished).toBeTruthy()
    })
})