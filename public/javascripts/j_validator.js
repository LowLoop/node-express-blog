/**
 * Created by j.frank on 2017/4/5 0005.
 */
$(function(){
    $("form[name='registerForm']").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {/*验证*/
            userName: {/*键名username和input name值对应*/
                message: 'The username is not valid',
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '用户名不能为空'
                    },
                    stringLength: {/*长度提示*/
                        min: 6,
                        max: 20,
                        message: '用户名长度必须在6到20之间'
                    }/*最后一个没有逗号*/
                }
            },
            userPasd: {
                message:'密码无效',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18之间'
                    }
                }
            }
        }
    });

    $("form[name='loginForm']").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {/*验证*/
            inUserName: {/*键名username和input name值对应*/
                message: 'The username is not valid',
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '用户名不能为空'
                    },
                    stringLength: {/*长度提示*/
                        min: 6,
                        max: 20,
                        message: '用户名长度必须在6到20之间'
                    }/*最后一个没有逗号*/
                }
            },
            inUserPasd: {
                message:'密码无效',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18之间'
                    }
                }
            }
        }
    });

    $("#novelForm").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {/*验证*/
            novelTitle: {/*键名novelTitle和input name值对应*/
                message: 'The novelTitle is not valid',
                validators: {
                    notEmpty: {/*非空提示*/
                        message: '标题不能为空'
                    }
                }
            },
            novelContent: {
                message:'内容无效',
                validators: {
                    notEmpty: {
                        message: '内容不能为空'
                    }
                }
            }
        }
    });

    /*$("#profileForm").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {/!*输入框不同状态，显示图片的样式*!/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {/!*验证*!/
            checkNewPasd: {
                validators: {
                    identical: {
                        field: 'newPasd',
                        message: '*两次输入密码不一致'
                    }
                }
            }
        }
    });*/

});