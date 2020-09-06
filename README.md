# Test-conducir-app

Una app para preparar el test B de conducir de la DGT

Está disponible en https://test-conducir.balbona.me/

## Installation

```bash
git clone https://github.com/NiciusB/test-conducir-app.git
cd test-conducir-app
```
Encontrarás dos directorios: client y server

Para configurar client:
```bash
cd client
echo "API_URL=http://localhost:5015" > .env
yarn install
```

Para configurar server:
```bash
cd server
echo "API_URL=http://localhost:5015" > .env
yarn install
```

## Starting dev enviroment

Abre dos pestañas en la terminal, y ejecuta esto estando en los directorios respectivos:
```bash
yarn start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
