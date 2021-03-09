//特殊功能
function chgSTY(style) {
    document.getElementById("result").value = style;
};

jQuery(document).ready(function() {
    //CSS設定
    jQuery('.configure_editor').css({
        'min-height': '600px',
    });
    jQuery('.contact').css({
        'border-radius': '12px',
        'margin-top': '150px',
        'background-repeat': 'no-repeat',
        'background-size': '100%',
        'margin': '',
    });

    jQuery('[data-whatever="@styleSelect"]').click(function() {
        console.log("OK button correct1");
        //彈出視窗CSS調整
        jQuery('.modal-title').html('<h4>樣式選擇</h4>');
        jQuery('.mod_styleSelect').css({
            'text-align': 'center',
        });
        jQuery('.mod_styleSelect').show();
        jQuery('.mod_dynamicSelect').hide();
        jQuery('.mod_FreeEditor').hide();
        jQuery('.mod_Calendar').hide();
        jQuery('.mod_self_carousel').hide();

        //載入指定頁面- src/index/???.html
        jQuery('.contact').html('<div class="cont"></div>');
        jQuery('.cont').load('src/index/contact.html');
        jQuery('.cont').css({
            'margin': '10%',
        });

        //特定載入功能
        jQuery('.mod_styleSelect').html('<input type="text" id="result" style="display: none;" />');
        jQuery('.modal-footer').html('<button type="button" class="styupdate btn btn-primary float-right" id="styupdate">確定</button>');

        jQuery('.styupdate').click(function() {
            var style = document.getElementById('result').value;
            jQuery('.contact').css({
                'background-image': 'url(' + style + ')',
            });
        });

        //樣式選擇API導入 - [開始]
        jQuery.ajax({
            url: "https://testapi.ladraw.com:21016/Services/APIService.asmx/GetContactBackgroundTemplate",
            type: "POST",
            dataType: "JSON",
            ContentType: "application/x-www-form-urlencoded",
            success: function(result, xhr, status, error) {
                var len = result.Template.length;
                for (let i = 0; i < len; i++) {
                    var id = result.Template[i].TemplateID;
                    var IMG = result.Template[i].Image;
                    var sty = result.Template[i].Style;

                    jQuery('.mod_styleSelect').append(
                        '<label class="styobj" for="' + id + '">\
                            <input type="image" class="btn-check" name="style" id="' + id + '" value="' + sty + '" onclick="chgSTY(this.value)" src="' + IMG + '" style="width:200px;border-radius:12px;padding:0.5em;border-radius: 10px;">\
                        </label>'
                    );
                };
            },
            error: function(xhr, status, error) {
                console.log(error);
            },
        });
        //樣式選擇API導入 - [結束]
    });

    //彈性編輯設定 - [開始]
    jQuery('[data-whatever="@dynamicSelect"]').click(function() {

        console.log("OK button correct2");
        //彈出視窗CSS調整
        jQuery('.modal-title').html('<h4>彈性編輯</h4>');
        jQuery('.mod_styleSelect').hide();
        jQuery('.mod_dynamicSelect').show();
        jQuery('.mod_FreeEditor').hide();
        jQuery('.mod_Calendar').hide();
        jQuery('.mod_self_carousel').hide();

        //特定載入功能
        jQuery('.modal-footer').html('<button type="button" class="dynamicSelect btn btn-primary float-right" id="dynamicSelect">確定</button>');

        //次選單
        jQuery('.mod_dynamicSelect').html('<div class="menu1"></div><div class="sub_settings"></div>');
        jQuery('.menu1').css('text-align', 'center');
        jQuery('.modal-body .menu1').html(
            '<div class="btn-group btn-group-toggle" data-toggle="buttons">\
                <button class="btn btn-primary">顏色選擇</button>\
                <button class="btn btn-primary">上傳背景圖片</button>\
                <button class="btn btn-primary">上傳背景素材</button>\
            </biv>');
        jQuery('.sub_settings').html('Readt Test');

    });
    //彈性編輯設定 - [結束]

    //自定編輯設定 - [開始]
    jQuery('[data-whatever="@FreeEditor"]').click(function() {
        console.log("OK button correct3");
        //彈出視窗CSS調整
        jQuery('.modal-title').html('<h4>自定編輯</h4>');
        jQuery('.mod_styleSelect').hide();
        jQuery('.mod_dynamicSelect').hide();
        jQuery('.mod_FreeEditor').show();
        jQuery('.mod_Calendar').hide();
        jQuery('.mod_self_carousel').hide();

        //特定載入功能
        jQuery('.modal-footer').html('<button type="button" class="FreeEditor btn btn-primary float-right" id="FreeEditor">確定</button>');
    });
    //自定編輯設定 - [結束]

    //行事曆設定 - [開始]
    jQuery('[data-whatever="@Calendar"]').click(function() {
        console.log("OK button correct4");
        //彈出視窗CSS調整
        jQuery('.modal-title').html('<h4>行事曆</h4>');
        jQuery('.mod_styleSelect').hide();
        jQuery('.mod_dynamicSelect').hide();
        jQuery('.mod_FreeEditor').hide();
        jQuery('.mod_Calendar').show();
        jQuery('.mod_self_carousel').hide();

        //特定載入功能
        jQuery('.modal-footer').html('<button type="button" class="Calendar btn btn-primary float-right" id="Calendar">確定</button>');

        //載入指定頁面- src/index/???.html
        jQuery('.contact').load('src/dist/index.html');
    });
    //行事曆設定 - [結束]

    //輪播設定 - [開始]
    jQuery('[data-whatever="@self_carousel"]').click(function() {
        console.log("OK button correct5");
        //彈出視窗CSS調整
        jQuery('.modal-title').html('<h4>輪播測試</h4>');
        jQuery('.mod_styleSelect').hide();
        jQuery('.mod_dynamicSelect').hide();
        jQuery('.mod_FreeEditor').hide();
        jQuery('.mod_Calendar').hide();
        jQuery('.mod_self_carousel').show();

        //載入頁面-範例
        //定義輪播工具

        var carousel =
            '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="1000">\
                <div class="carousel-inner" role="listbox" style="height:480px; text-align:center; !important;">\
                    <div class="carousel-item active">\
                        <img src="http://ondinas.com.br/site/wp-content/themes/options/images/skins/headers/full_width/header-autumnBreeze.jpg" id="img1" class="center-block w-auto" style="height:480px" alt="First slide">\
                    </div>\
                    <div class="carousel-item">\
                        <img src="http://www.boostnet.in/wp-content/uploads/2016/10/Header-1.png" id="img2" class="center-block w-auto" style="height:480px" alt="Second slide">\
                    </div>\
                    <div class="carousel-item">\
                        <img src="https://steklin.ru/wp-content/uploads/2019/12/Header-PNG-Pic.png" id="img3" class="center-block w-auto" style="height:480px" alt="Third slide">\
                    </div>\
                </div>\
            </div>';

        var addmoreBTN = '<div class="tools text-center">\
                            <button type="button" class="addBTN btn btn-primary">\
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">\
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>\
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                </svg>\
                                新增輪播圖片\
                            </button>\
                        </div>\
                        <div class="addpic"></div>';


        //上傳工具/功能
        jQuery('.mod_self_carousel').html(addmoreBTN);

        var vieID = 0;
        jQuery(document).on('click', '.addBTN', function() {
            jQuery('.addpic').append('<div class="tag" id="tag' + vieID + '">\
                                        <img id="imageResult_' + vieID + '" src="#" alt="DEMO" class="imageResult_ img-fluid rounded shadow-sm mx-auto d-block">\
                                        <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">\
                                            <input id="upload_' + vieID + '" type="file" onchange="readURL(this);" class="uploadInput_ form-control border-0" name="imageResult_' + vieID + '">\
                                            <div class="input-group-append">\
                                                <label for="upload_' + vieID + '" class="btn btn-light m-0 rounded-pill px-4">\
                                                    <small class="font-weight-bold text-muted">限於JPG PNG GIF 格式 & 小於6M上限</small>\
                                                </label>\
                                            </div>\
                                        <button type="button" class="rmBTN btn btn-secondary rounded-pill" id="rmBTN sliderIMG_' + vieID + '">刪除</button>\
                                        </div>\
                                    </div>');
            vieID++;
        });

        jQuery(document).on('click', '.rmBTN', function() {
            jQuery(this).parent().parent().remove();
        });

        $('.contact').html(carousel);

        $(".carousel").carousel();
        //特定載入功能
        $('.modal-footer').html('<button type="button" class="imgupdate btn btn-primary float-right" id="imgupdate">確定</button>');

        jQuery('.imgupdate').click(function() {
            jQuery('.carousel-inner').empty();
            var slideShowIMG = $(jQuery('.imageResult_')[0]).attr('src');
            var PreViewID = $(jQuery('.imageResult_')[0]).attr('id');
            jQuery('.carousel-inner').append('<div class="carousel-item active"><img src="' + slideShowIMG + '" id="' + PreViewID + '" class="center-block w-auto" style="height:480px" alt="' + PreViewID + '"></div>');
            var countIMG = jQuery('.imageResult_').length;
            for (let i = 1; i < countIMG; i++) {
                var PreViewID1 = $(jQuery('.imageResult_')[i]).attr('id');
                var slideShowIMG1 = $(jQuery('.imageResult_')[i]).attr('src');

                jQuery('.carousel-inner').append('<div class="carousel-item"><img src="' + slideShowIMG1 + '" id="' + PreViewID1 + '" class="center-block w-auto" style="height:480px" alt="' + PreViewID1 + '"></div>');
            };
        });
    });
});

function readURL(input) {
    var PreViewIMGBox = jQuery(input).attr('name');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            jQuery('#' + PreViewIMGBox).attr('src', e.target.result).attr('width', '200px');
        };
        reader.readAsDataURL(input.files[0]);
    };
};
