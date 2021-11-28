var btn_get_token = document.getElementById('btn_get_token')

btn_get_token.onclick = function (){
        var client_id = document.getElementById('client_id').value
        // var client_secret = document.getElementById('client_secret').value
        var client_secret = $('#client_secret').val()
        alert(client_id+':'+client_secret)
}