# Poll-er
**Poll** info here

## Install Dependencies
`$ npm install`

## Build
`$ npm run build`

## Run
`$ npm run start`

## For Developer
+ Install `nodemon` and `webpack` globally
`$ npm install --global nodemon webpack`
+ Automatic src transpile on change
`$ webpack --progress --colors --watch`
+ Automatic restart node server on change
`$ nodemon build/app-server.js`
+ Install `React Developer Tools` for Chrome 
<a href="https://goo.gl/uNQAJA"><img src="http://chart.apis.google.com/chart?cht=qr&chs=120x120&choe=UTF-8&chld=H|0&chl=https://goo.gl/uNQAJA"/></a>
+ For IntelliJ WebStorm user:
"uncheck File > Settings... > System Settings > Use safe write (save changes to a temporary file first)."

## To-Do
+ **Socket Security** with Socket IO Namespaces & Socket Authorization
+ **Render Performance** with `shouldComponentUpdate()` lifecycle function
+ Fix `Board` graphs, so that results is ordered
if the first received answer is *d*, bar that represent *d* will be on the left most
+ **CAS** implement CAS

## Contributors
+ 1
+ 2
+ 3
