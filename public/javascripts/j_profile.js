$(function(){
    var jcrop_api,
        boundx,
        boundy;
    var $myCanva = $("#myCanva");

    var imgData = null;
    var userId = document.getElementById('userId').value;
    var $btnSave = $("#btnSave");
    //var $btnUpdateUserInfo = $("#updateUserInfo");

    var xsize = $myCanva.width();
    var ysize = $myCanva.height();

    $('#upLoadImg1').on('change', function() {
        if (document.getElementById("upLoadImg1").files.length === 0) {
            return;
        }
        var oFile = document.getElementById("upLoadImg1").files[0];
        if (!oFile) {
            return;
        }
        var fileName = oFile.name;
        var fileSize = oFile.size;
        var fileType = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
        if (fileType != '.jpg' && fileType != '.jpeg' && fileType != '.gif' && fileType != '.png' && fileType != '.bmp') {
            alert("请选择jpg,png,gif,bmp格式的图片");
            return;
        }
        if (fileSize > 1 * 1024 * 1024) {
            alert('最大支持1MB的图片');
            return;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(oFile);
        // 成功读取
        fileReader.onload = function(e) {
            // 显示弹窗
            $('.cover').show();
            $('#Img1').removeAttr('src');
            // 将弹窗中的图片路径设置为选择的图片的base64
            $('#Img1').attr('src', e.target.result);

            // 裁切组件初始化
            initJcrop();
        };
    });

    function initJcrop() {
        if (typeof jcrop_api != 'undefined'){
            jcrop_api.destroy();
        }

        $('#Img1').Jcrop({
            onChange: updateCoords,
            onSelect: updateCoords,
            aspectRatio: xsize / ysize,
            boxWidth: 280,
            boxHeight: 280
        }, function() {
            //var ctx = document.getElementById('myCanva').getContext('2d');
            //弹窗中显示的图片尺寸
            var bb = this.getBounds();
            var bWidth = Number(bb[0]) / 2;
            var bHeight = Number(bb[1]) / 2;
            boundx = bb[0];
            boundy = bb[1];
            //设置初始选中裁切范围
            this.setSelect([0, 0, bWidth, bHeight]);

            jcrop_api = this;

            //ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, 100, 100);//初始绘制canva预览图

        });
    }

    function updateCoords(c) {
        if (parseInt(c.w) > 0){
            var rx = xsize / c.w;
            var ry = ysize / c.h;
            var img = document.getElementById('Img1');
            var ctx = document.getElementById('myCanva').getContext('2d');
            //绘制canvas画布
            ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, 100, 100);
            imgData = document.getElementById('myCanva').toDataURL();
            //ctx.drawImage(img, c.x, c.y, Math.round(rx * boundx), Math.round(ry * boundy), 0, 0, 100, 100);
        }

    }
    $btnSave.click(function(){
        if(imgData != null){
            $.ajax({
                url: '/user/updateHeadPortrait',
                type: 'POST',
                dataType: 'JSON',
                cache: false,
                data: {
                    'headPortrait': imgData,
                    'userId':userId
                },
                success: function(res) {
                    console.log(res);
                    swal({
                        title: "上传成功!",
                        text: "成功更换了头像",
                        type: "success"
                    },function(){
                        window.location.reload();//刷新当前页面
                    });
                },
                error: function(err) {
                    console.log(err);
                    swal({
                        title: "上传失败!",
                        text: "更换头像失败,"+err,
                        type: "error"
                    },function(){
                        window.location.reload();//刷新当前页面
                    });
                }
            });
        }

    });

    /*$btnUpdateUserInfo.click(function(){
        let message = "ajaxtest!!!";
        $.ajax({
            url: '/user/updateUserInfo',
            type: 'POST',
            dataType: 'JSON',
            cache: false,
            data: {
                'message': message
            },
            success: function(res) {
                console.log(res);
                alert(res);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });*/

});