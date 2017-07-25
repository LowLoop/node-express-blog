/**
 * Created by j.frank on 2017/3/20 0020.
 */
$(function(){
    var $btnRegister = $("#register");//导航栏右侧注册,登陆按钮
    var $btnLogin = $("#login");

    var $signBox = $("#signBox");//登陆/注册.弹窗box

    var $upWrap = $("#upWrap");//弹窗中,登陆,注册的包裹层
    var $inWrap = $("#inWrap");

    var $registerForm = $("#registerForm");//注册弹窗
    var loginIndex;

    var $novelForm = $("#novelForm");//发表文章表单

    $btnLogin.click(function(){//登陆 弹窗
        $upWrap.css("display","none");
        $inWrap.css("display","block");
        $signBox.removeClass("hide");
        loginIndex = layer.open({
            type:1,
            area: ['90%', '80%'],
            fix: false, //不固定
            maxmin: false,
            title: ['登陆', 'font-size:18px;'],
            content:$signBox
        });
    });

    $btnRegister.click(function(){//注册 弹窗
        $inWrap.css("display","none");
        $upWrap.css("display","block");
        $signBox.removeClass("hide");
        loginIndex = layer.open({
            type:1,
            area: ['90%', '80%'],
            fix: false, //不固定
            maxmin: false,
            title: ['注册', 'font-size:18px;'],
            content:$signBox
        });
        $(this).parent().removeClass("active");
    });

    //$registerForm.submit(function(ev){ev.preventDefault();});
    //$novelForm.submit(function(ev){ev.preventDefault();});

    /*$registerForm.bootstrapValidator('validate');//触发表单验证
    $registerForm.submit(function(ev){ev.preventDefault();});

    $btnSubmit.click(function(){
        var bootstrapValidator = $registerForm.data('bootstrapValidator');
        bootstrapValidator.validate();

        if(bootstrapValidator.isValid()){//验证是否通过
            //$registerForm.submit();
            $.ajax({
                 url:"/signup",
                 type:"POST",
                 data:$('#registerForm').serialize(),
                 success:function(data){
                    //layer.alert("恭喜您!注册成功");
                    alert("222");
                     console.log(data);
                     layer.msg("恭喜您!注册成功.");
                     layer.close(loginIndex);
                 },
                 error:function(XMLHttpRequest, textStatus, errorThrown){
                     alert(3333);
                     layer.msg("注册失败,错误信息:"+textStatus);
                     /*alert(XMLHttpRequest.status);
                     alert(XMLHttpRequest.readyState);
                     alert(textStatus);
                 }
             });
        }else{
            return false;
        }

    });*/
});