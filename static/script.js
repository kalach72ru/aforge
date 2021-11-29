
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
                        $('#access_token').val(data['access_token'])
                        $('#seconds').text(data['expires_in'])
                });
}