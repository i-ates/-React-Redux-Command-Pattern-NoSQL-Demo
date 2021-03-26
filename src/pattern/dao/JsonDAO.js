export default class JsonDAO{
    write(objects){
        localStorage.setItem('collections', JSON.stringify(objects));
    }
}
