from flask import Flask, render_template, url_for
import requests
from aforge.secret.config import ClientData


autodesk_auth_url = 'https://developer.api.autodesk.com/authentication/v1/authenticate'


app = Flask(__name__)

access_token = ''

@app.route("/update_token")
def update_token():
    data = autodesk_auth_l2(autodesk_auth_url)
    return data

@app.route("/")
def hello_world():
    data = autodesk_auth_l2(autodesk_auth_url)
    # text = '{"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJkYXRhOnJlYWQiXSwiY2xpZW50X2lkIjoibHRkT2JUbUFpQ0lRTndDdUxlUUdGWHpWN2xKTGRJeTkiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvYWp3dGV4cDYwIiwianRpIjoiaTZLMWUwUndzM1pCbzRqdVNybWEyem9nRzRIT0gyR2dVQWtUU0Y2dm9Wa2syY1FyaWFBQ3ZpNGZIQ2tReGtDRyIsImV4cCI6MTYzODAyOTkzMX0.XAadU6vBNfDDwNlxhC5c2k1yW38iDNEFNEJNVo4oIL4NeO_UrnJs03cHcb2d5jddwY01AHu3_68ttEp_Kju3NEilxrWreg_A2D7p_opbKXrM-X8QsmVEtmcuONKAjXQk08vkQUU_385KGyNWZcjNcck4w44G8TbyXud-mXi3X1o6TXokdDtSvKwBChwPrDpy3uQMpytqpVcumM3xxhnzR1cRDw1VtaaXUqep3I16fVx9AK68PJfwt8cRt54iLOGFKSIqGNOSNtZ7eBUzwi4cks5ghHWBi0jGq5_v-HV-sJDJiM_xR7RdBPdJEqeFYGiMpWmxmtjUbXMNMTPl7LW_9A","token_type":"Bearer","expires_in":3599}'
    access_token = data['access_token']
    expires_in = data['expires_in']
    url_js_script = url_for('static', filename='script.js')
    return render_template('index.html', js_script=f'{url_js_script}', access_token=f'{access_token}')

@app.route("/get_backet_list")
def get_backet_list():
    pass

def autodesk_auth_l2(url):
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    client_data = ClientData()  # секретные данные в отдельном классе

    params = {
        'client_id': client_data.get_client_id(),
        'client_secret': client_data.get_client_secret(),
        'grant_type': 'client_credentials',
        'scope': 'data:write data:read bucket:read bucket:create bucket:delete'
    }
    req = requests.post(url, data=params, headers=headers)
    data = req.json()
    return data


def main():
    print(f'Программа запущена.')
    autodesk_auth_l2(autodesk_auth_url)


if __name__ == '__main__':
    app.run()

