import app from './app';
import './datebase';

app.listen(app.get('port'))
console.log('Server on port: ', app.get('port'));