import requests

autodesk_auth_url = 'https://developer.api.autodesk.com/authentication/v1/authenticate'
def autodesk_auth_l2():
    url = autodesk_auth_url
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    params = {
        'client_id': 'ltdObTmAiCIQNwCuLeQGFXzV7lJLdIy9',
        'client_secret': 'CZQjy8932uRGvKKS',
        'grant_type': 'client_credentials',
        'scope': 'data:read'
    }
    req = requests.post(url, data=params, headers=headers)
    print(req.text)


def main():
    print(f'Программа запущена.')
    autodesk_auth_l2()


if __name__ == '__main__':
    main()
