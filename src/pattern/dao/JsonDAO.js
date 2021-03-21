export default class JsonDAO{
    write(objects){
        console.log(objects);
        localStorage.setItem('objects', JSON.stringify(objects));
    }
}
