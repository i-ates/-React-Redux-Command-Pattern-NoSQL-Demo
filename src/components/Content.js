import ContentHeader from "./ContentHeader";
import Collections from "./Collections";
import Documents from "./Documents";
import Preview from "./Preview";
import PageHeader from "./PageHeader";

export default function Content() {
  return (
    <>
      <PageHeader/>
      <div className="container mt-4" style={{ height: "600px" }}>
        <ContentHeader />
        <div className="row justify-content-center no-gutters h-100 bg-white border rounded">
          <Collections />
          <Documents />
          <Preview />
        </div>
      </div>
    </>
  );
}
