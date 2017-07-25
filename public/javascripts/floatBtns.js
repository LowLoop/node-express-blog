/**
 * Created by j.frank on 2017/5/8 0008.
 */
$(function(){
    NProgress.start();
    var $gohome = $(".gohome");
    var $backTop = $("#backToTop");
    var $closeMsg = $("span[name='closeMsg']");//信息提示框的关闭按钮
    var $nav = $('.pagination');
    var current_page = Number($nav.attr('data-current-page'));
    var $navLi = $nav.find('li');
    var $pagePrev = $("#pagePrev");
    var $pageNext = $("#pageNext");

    $gohome.animate({//返回首页按钮初始化的动画效果
        bottom:"90%"
    }).animate({
        bottom:"80%"
    },200).animate({
        bottom:"83%"
    },200);

    $(window).scroll(function(){//监控窗口垂直偏移量
        var winTop = $(window).scrollTop();
        if(winTop > 10){
            $backTop.fadeIn();
        }else{
            $backTop.fadeOut();
        }
    });

    $backTop.click(function(){//返回顶部动画
        $("body,html").animate({
                scrollTop: 0
        },800);
    });

    $closeMsg.click(() =>{
        $closeMsg.parent().fadeOut();
    });

    //下面的是对于分页按钮的相关处理
    if (current_page) {
        $navLi.each(function (i) {
            var $li = $(this);
            var $a = $li.find('a');

            switch (current_page){//对于如果当期页码是第一页或者最后一页时 向前/向后翻页按钮 disabled
                case 1:
                    $pagePrev.parent().addClass('disabled');
                    $pagePrev.removeAttr("href");
                    $pageNext.attr("href","/?page="+(Number(current_page)+1));
                    break;
                case $navLi.length - 3:
                    $pageNext.parent().addClass('disabled');
                    $pageNext.removeAttr("href");
                    $pagePrev.attr("href","/?page="+(Number(current_page)-1));
                    break;
                default:
                    $pagePrev.attr("href","/?page="+(Number(current_page)-1));
                    $pageNext.attr("href","/?page="+(Number(current_page)+1));
                    break;
            }

            if ($a.text() == current_page) {
                $li.addClass('active disabled');
                $a.removeAttr('href');
            }
        });
    }

    //下面两个click是ibox 中 tool中上/下拉,关闭的操作
    $(".collapse-link").click(function() {
        var o = $(this).closest("div.ibox"),
            e = $(this).find("i"),
            i = o.find("div.ibox-content");
        i.slideToggle(200),
            e.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),
            o.toggleClass("").toggleClass("border-bottom"),
            setTimeout(function() {
                    o.resize(),
                        o.find("[id^=map-]").resize()
                },
                50)
    });

    $(".close-link").click(function() {
        var o = $(this).closest("div.ibox");
        o.remove()
    });

    /*ShowLoading_Canvas("canvas_c");
    setInterval(function () {
        try {
            if ($("#backstretch_img").css("opacity") != 0.5) {
                //$("#canvas_c").css("width", "400px");
                //$("#canvas_c").css("height", "300px");
                $("#canvas_c").css("opacity", "1");
            }
            else {
//$("#canvas_c").css("width", "20px");
//$("#canvas_c").css("height", "15px");
                $("#canvas_c").css("opacity", "0");
            }
        }
        catch (data) {

        }
    }, 1000);*/

    NProgress.done();

});