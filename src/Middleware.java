import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Middleware {

    private List<Student> objects;
    private IDAO dao;

    public Middleware(IDAO dao) {
        this.dao = dao;
        this.readFile();
    }

    public void readFile(){
        this.objects = dao.read().stream().map(o -> (Student) o).collect(Collectors.toList());
    }

    public void commit() {
        this.dao.write(Arrays.asList(objects.toArray()));

    }
    public void addElement(Student parameter) {
        this.objects.add(parameter);
    }

    public void removeElement(Student parameter) {
        this.objects.remove(parameter);
    }

    public List<Student> getObjects() {
        return objects;
    }

    public void setObjects(List<Student> objects) {
        this.objects = objects;
    }

    public IDAO getDao() {
        return dao;
    }

    public void setDao(IDAO dao) {
        this.dao = dao;
    }
}
