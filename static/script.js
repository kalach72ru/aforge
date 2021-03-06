var current_token = $('#access_token').val();

//обратный отсчет
$('#seconds').text(3599);
var _Seconds = $('#seconds').text(), int;
        int = setInterval(function() { // запускаем интервал
                _Seconds = $('#seconds').text();
                if (_Seconds > 0) {
                        _Seconds--; // вычитаем 1
                        $('#seconds').text(_Seconds); // выводим получившееся значение в блок
                } else {
                        clearInterval(int); // очищаем интервал, чтобы он не продолжал работу при _Seconds = 0
                        alert('End!');
                }
        }, 1000);


// кнопка обновления токена        
var btn_get_token = document.getElementById('btn_update_token')
btn_update_token.onclick = function (){
        $.get('/update_token')
                .done(function(data){
                        $('#access_token').val(data['access_token']) // покажем новый токен
                        current_token = data['access_token']   // сохраним новый токен
                        $('#seconds').text(data['expires_in'])  // обновим счетчик обратного отсчета
                });
}

// кнопка обновления списка backets        
var btn_get_backets = document.getElementById('btn_get_backets')
btn_get_backets.onclick = function (){
        var url = "https://developer.api.autodesk.com/oss/v2/buckets";
        var current_token = $('#access_token').val();
        var header = 'Authorization: Bearer ' + current_token;
        $.ajax({
                dataType: "json",
                url: url, 
                headers: {
                        'Authorization': 'Bearer ' + current_token 
                },
                success: function ( data ) {
                        var div = $('#backets_list').empty()
                        data['items'].forEach(element => {
                                div.append("<div class='row'>\
                                                <div class='col'>"+element['bucketKey']+"</div>\
                                                <div class='col'>"+element['policyKey']+"</div>\
                                                <div class='col'>"+element['createdDate']+"</div>\
                                                <div class='col'><button id='btn_view_bucket_"+element['bucketKey']+"'>Показать модель</button></div>\
                                        </div>")
                                var btn_view_bucket = document.getElementById('btn_view_bucket_'+element['bucketKey'])
                                btn_view_bucket.onclick = function(){
                                        var model_thumb = document.getElementById('model_thumb')
                                }
                        });
                }
        });
}

// var viewer;
// var options = {
//     env: 'AutodeskProduction2',
//     api: 'streamingV2',  // for models uploaded to EMEA change this option to 'streamingV2_EU'
//     getAccessToken: function(onTokenReady) {
//         var token = 'YOUR_ACCESS_TOKEN';
//         var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
//         onTokenReady(current_token, timeInSeconds);
//     }
// };

// Autodesk.Viewing.Initializer(options, function() {

//     var htmlDiv = document.getElementById('model_viewer');
//     viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
//     var startedCode = viewer.start();
//     if (startedCode > 0) {
//         console.error('Failed to create a Viewer: WebGL not supported.');
//         return;
//     }

//     console.log('Initialization complete, loading a model next...');

// });
