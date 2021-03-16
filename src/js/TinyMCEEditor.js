jQuery(document).ready(function() {
    //var EnableEditor = function() {
    //TinyMCE
    tinymce.init({
        height: 800,
        language: 'zh_TW',
        min_width: '40%',
        max_width: '80%',
        min_height: '300px',
        selector: 'textarea#EditorContnet',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author',
        skin: 'oxide',
        resize: 'both',
        placeholder: "輸入內容...",
        content_css: 'dark',
        skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide' : 'oxide-dark'),

        plugins: [
            "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen",
            "image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount",
            "imagetools textpattern noneditable help charmap quickbars emoticons " //moxiemanager tinydrive tinycomments
        ],

        //選單設定
        menubar: false, //menubar: 'file edit insert view format table tools',
        quickbars_insert_toolbar: true,
        font_formats: "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; 微軟正黑體='Microsoft JhengHei'; 新細明體=PMingLiU; 細明體=MingLiU; 標楷體=DFKai-SB",
        toolbar: [
            "formatselect fontselect fontsizeselect| alignleft aligncenter alignright alignjustify | charmap emoticons code",
            "undo redo visualblocks | bold italic underline strikethrough forecolor backcolor | insertdatetime link unlink quickimage image quicktable table media insertfile preview"
        ], //addcomment removeformat numlist bullist outdent indent | insertfile |  | 
        contextmenu: 'link image table',

        //檔案資安設定
        automatic_uploads: false,
        block_unsupported_drop: true,
        file_picker_types: 'file, image, media', //檔案 圖片 影片
        images_upload_credentials: true,

        //圖片設定
        images_upload_url: '../php/postAcceptor.php', //上存檔案（PHP）
        images_upload_base_path: "img/", //Upload Location
        images_reuse_filename: true, //Multi FileName NOT
        relative_urls: false,
        image_title: true,
        allow_script_urls: true,
        remove_script_host: false,
        convert_urls: true,
        file_browser_callback: true,
        preview_styles: true,
        image_advtab: true,
        document_base_url: 'img/',

        file_picker_callback: function(callback, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = function() {
                var file = this.files[0];

                var reader = new FileReader();
                reader.onload = function() {
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    callback(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
            };

            input.click();
        },

        //影片設定
        media_live_embeds: true,

        //API項目
        //tinydrive_google_drive_key: 'AIzaSyCL0vnm0QZmRzor6vE98pX52SGpoEwbRpE',
        //tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',

        //手機設定
        mobile: {
            language: "zh_TW",
            language_url: "src/plugin/tinymce/js/tinymce/langs/zh_TW.js",
            theme: 'mobile',
            skin: 'oxide-dark',
            menubar: true,
            toolbar_mode: 'wrap',
            toolbar: [
                "undo redo styleselect fontsizeselect bold italic link image forecolor alignleft aligncenter alignright alignjustify charmap emoticons",
            ],

        },
    });

    $("#EditorAction").submit(function(e) {
        var data = tinymce.activeEditor.getContent({ format: 'json' });
        var Contnet = tinymce.get("EditorContnet").setContent(data);
        var obj = tinymce.activeEditor.getContent()
        $("#display-demo").html(Contnet);
        //console.log(Contnet);
        //console.log(obj);
        var str = tinymce.util.JSON.serialize(Contnet);
        //console.log(str);
        return false;
    });
    //};
});