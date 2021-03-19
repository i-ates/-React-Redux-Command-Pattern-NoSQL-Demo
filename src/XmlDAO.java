import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class XmlDAO implements IDAO {

    private String outputFilePath;
    public XmlDAO(String path) {
       this.outputFilePath=path;
    }

    @Override
    public List<Object> read() {
        return new ArrayList<>();
    }

    @Override
    public void write(List<Object> objects) {

        try {

            DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();

            DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();

            Document document = documentBuilder.newDocument();
            Element students= document.createElement("students");
            document.appendChild(students);
            objects.forEach(o->{
//                Element element = document.createElement(String.valueOf(o));
//                students.appendChild(element);
//                element.appendChild(document.createTextNode("ismail"));
//                Attr attr=document.createAttribute("id");
//                attr.setValue("120");
//                element.setAttributeNode(attr);
                Element element = document.createElement(((Student) o).getId());
                element.appendChild(document.createTextNode(((Student) o).getName()));
                students.appendChild(element);
            });




            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource domSource = new DOMSource(document);
            StreamResult streamResult = new StreamResult(new File(outputFilePath));


            transformer.transform(domSource, streamResult);

            System.out.println("Done creating XML File");

        } catch (ParserConfigurationException | TransformerException pce) {
            pce.printStackTrace();
        }
    }


    public String getOutputFilePath() {
        return outputFilePath;
    }

    public void setOutputFilePath(String outputFilePath) {
        this.outputFilePath = outputFilePath;
    }
}
