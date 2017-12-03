$(function () {
    var myScroll;
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
    $.ajax({
        url:'http://api.jisuapi.com/news/channel?appkey=b0cc72e92512713a',
        dataType:'jsonp',
        success:function (res) {
            let result=res.result;
            let str='';
            result.forEach(function (val,index) {
                if (index==0){
                    str+=`<li class="active">${val}</li>`
                }else{
                    str+=`<li>${val}</li>`
                }
            })
            $('#scroller>ul').html(str);
            render($('#scroller>ul li.active').text(),0,2);
            $('#scroller>ul').on('click','li',function () {
                loading($(this));
                $('#scroller>ul li').removeClass('active');
                $(this).addClass('active');
                let channel=$(this).text();
                $('#content>ul').html('');
                render(channel,0,2);

            })
            $('.more .load').on('click',function () {
                // alert(1)
                render($('#scroller>ul li.active').text(),$('#content>ul li').length,2);
            })
        }
    })
    function render(channel,start,num) {
        $.ajax({
            url:`http://api.jisuapi.com/news/get?channel=${channel}&start=${start}&num=${num}&appkey=ca4fded345f068da`,
            dataType:'jsonp',
            success:function (res) {
                let resultContent=res.result.list;
                let str1='';
                resultContent.forEach(function (val,index) {
                    let time=val.time.split(' ')[1];
                    if (val.pic==''){
                        str1+=`<a href="${val.url}">
                                   <li class="noimg">
                                        <div class="title-no">${val.title}</div>
                                        <div class="from-no">
                                            <span>
                                                 <span class="src-no">${val.src}</span>
                                                  <span class="time-no">${time}</span>
                                            </span>
                                        </div>
                                   </li></a>
                                `
                    }else{
                        str1+=`<a href="${val.url}">
                                    <li class="list">
                                      <div class="left"><img src="${val.pic}" alt=""></div>
                                      <div class="right">
                                          <div class="title">${val.title}</div>
                                          <div class="from">
                                            <span class="src">${val.src}</span>
                                            <span class="time">${time}</span>
                                          </div>
                                       </div>
                                    </li></a>
                                `
                    }
                })
                $('#content>ul').html(function (index,val) {
                    return val+str1;
                })
            }

        })
    }
    function loading(e) {
        $(e).ajaxSend(function () {
            $('.waiting').show();
            console.log(111)
        })
        $(e).ajaxComplete(function () {
            $('.waiting').hide();
        });
    }
})
