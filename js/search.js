/*
* @Author: Administrator
* @Date:   2017-12-05 10:31:08
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-06 00:04:55
*/
$(document).ready(function() {

  $('section span').click(function () {
       
       history.back();
       

    })
    renderHistory();

    $('.label ul ').on('click','li',function () {
        let keyword=$(this).find('span').text()
        render(keyword);
    })

    $('input').blur(function () {
        let keyword=$('section input').val();
        render(keyword);
    })
    //点击进入详情页面
    $('#content ul').on('click','li',function () {
        let currentIndex=$(this).index();
        localStorage.currentIndex=currentIndex;
        location.href='detail2.html';
    })

    function renderHistory() {
        if (localStorage.record){
            let record=localStorage.record;
            let recordArr=record.split(',');
            let str='';
            recordArr.forEach(val=>{
                str+=`
                     <li><span>${val}</span></i></li>
                   `
            })
            $('.label ul').html(str);
        }
    }
    function render(keyword) {
        if (keyword!=''){
            $.ajax({
                url: `http://api.jisuapi.com/news/search?keyword=${keyword}&appkey=b0cc72e92512713a`,
                dataType:'jsonp',
                beforeSend:function(){
                $('#zhao').show();
            },
                success:function (res) {
                	 $('#zhao').hide();
                    $('.loading').hide();
                    let result=res.result.list;
                    let str1='';

                    if (result!=''){
                        localStorage.searchList=JSON.stringify(result);
                        if (localStorage.record){
                            let recordArr=localStorage.record.split(',')
                            if (!recordArr.includes(keyword)){
                                localStorage.record+=','+keyword;
                            }
                        }else{
                            localStorage.record=keyword;
                        }
                        $('.label').css('display','none');
                        result.forEach(function (val,index) {
                            let time=val.time.split(' ')[1];
                            if (val.pic==''){
                                str1+=`
                                   <li class="noimg">
                                        <div class="title-no">${val.title}</div>
                                        <div class="from-no">
                                            <span>
                                                 <span class="src-no">${val.src}</span>
                                                  <span class="time-no">${time}</span>
                                            </span>
                                        </div>
                                   </li>
                                `
                            }else{
                                str1+=`
                                    <li class="list">
                                      <div class="left"><img src="${val.pic}" alt=""></div>
                                      <div class="right">
                                          <div class="title">${val.title}</div>
                                          <div class="from">
                                            <span class="src">${val.src}</span>
                                            <span class="time">${time}</span>
                                          </div>
                                       </div>
                                    </li>
                                `
                            }
                        })
                        $('#content>ul').html(function (index,val) {
                            return str1;
                        })
                    }else {
                        $('.label').css('display','none');
                        str1='<p>加载失败，请重试</p>'
                        $('#content>ul').html(str1)
                    }
                }
            })
        }
    }

})















/*let arr;
let str;
	$('section span').click(function(){
		history.back();
	})
	let search='';
	if(localStorage.history){
		search=localStorage.history;
		arr=search.split(',')
    	str='';
    	arr.forEach(val=>{
        str+=`<span>${this.var}</span>`
    })
	}
$('input').blur(function() {
	if($(this).val()==""){
        return
    }
    search+=','+$(this).val();

    localStorage.history=search;
    $.ajax({
        url: 'http://api.jisuapi.com/news/search?keyword='+$(this).val()+'&appkey=b0cc72e92512713a',   
       
        dataType: 'jsonp',
        beforeSend:function(){

    	},
    success:function(res){

    	 let resultContent=res.result.list;
    	 console.log(res);
                let str1='';
                resultContent.forEach(function (val,index) {
                    let time=val.time.split(' ')[1];
                    if (val.pic==''){
                        str1+=`<a">
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
                        str1+=`<a">
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


});

});
*/






