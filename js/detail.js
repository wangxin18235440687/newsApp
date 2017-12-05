/*
* @Author: Administrator
* @Date:   2017-12-06 00:33:51
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-06 01:10:21
*/
$(function () {
    let index= localStorage.index;
    let channel=localStorage.channel;
    $.ajax({
        url:`https://api.jisuapi.com/news/get?channel=${channel}&start=${index}&num=1&appkey=b0cc72e92512713a`,
        dataType:'jsonp',
        success:function (res) {
            let content=res.result.list[0].content;
            let title=res.result.list[0].title;
            $('.content').html(content);
            $('.head span').html(title)

        }
    })
    $('.left').click(function () {
        location.href='index.html';
    })

})