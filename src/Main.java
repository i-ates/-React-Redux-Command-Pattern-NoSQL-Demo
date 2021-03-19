public class Main {

    public static void main(String argv[]) {
        System.out.println("Hello world");
        GUI gui = new GUI(new Invoker(new Middleware(new XmlDAO("C:\\Users\\ismail\\Desktop\\PrettyFormatter\\xmlfile.xml"))));
        gui.addElement(new Student("a", "said"));
        gui.addElement(new Student("b", "ismail"));
        list(gui);
        gui.undo();
        gui.commit();
        gui.redo();
        gui.commit();

        // https://examples.javacodegeeks.com/core-java/xml/parsers/documentbuilderfactory/create-xml-file-in-java-using-dom-parser-example/
    }

    public static void list(GUI gui){
        gui.getInvoker().getMiddleware().getObjects().forEach(System.out::println);
        System.out.println("hello");
    }
}
