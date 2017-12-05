/*
* @Author: Administrator
* @Date:   2017-12-06 00:33:51
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-06 00:59:33
*/
$(function () {
    let currentIndex=localStorage.currentIndex;
    let searchList=JSON.parse(localStorage.searchList);
    let current=searchList[currentIndex];
    let content=current.content;
    let title=current.title;
    console.log(title);
    $('.content').html(content);
    $('.head span').html(title);
    $('.left').click(function () {
        history.back();
    })

})