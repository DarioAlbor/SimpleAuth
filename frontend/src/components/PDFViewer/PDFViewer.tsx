import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin } from "@react-pdf-viewer/search";



export default function TestViewer() {
  const fileUrl = "/recources/pdf.pdf";

  const searchPluginInstance = searchPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { ShowSearchPopoverButton } = searchPluginInstance;

  const handlePageChange = (e: any) => {
    localStorage.setItem("current-page", `${e.currentPage}`);
  };
  const {
    CurrentPageInput,
    GoToFirstPageButton,
    GoToLastPageButton,
    GoToNextPageButton,
    GoToPreviousPage
  } = pageNavigationPluginInstance;
  const currentPage = localStorage.getItem("current-page");
  const initialPage = currentPage ? parseInt(currentPage, 10) : 0;

  return (
    <>
      <div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <div
            className="rpv-core__viewer"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <div
              style={{
                alignItems: "center",
                backgroundColor: "#eeeeee",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                display: "flex",
                padding: "4px"
              }}
            >
              <ShowSearchPopoverButton />
              <div style={{ padding: "0px 2px" }}>
                <GoToFirstPageButton />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <GoToPreviousPage />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <CurrentPageInput />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <GoToNextPageButton />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <GoToLastPageButton />
              </div>
            </div>

            <div
              style={{
                flex: 1,
                overflow: "hidden"
              }}
            ></div>
            <div style={{ height: "720px" }}>
              <Viewer
                fileUrl={fileUrl}
                initialPage={initialPage}
                onPageChange={handlePageChange}
                plugins={[searchPluginInstance, pageNavigationPluginInstance]}
                defaultScale={1.2}
              />
            </div>
          </div>
        </Worker>
        {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <div style={{ height: "720px" }}>
        <Viewer
          fileUrl={demoFile}
          initialPage={initialPage}
          onPageChange={handlePageChange}
          plugins={[searchPluginInstance, pageNavigationPluginInstance]}
          defaultScale={1.2}
        />
      </div>
    </Worker> */}
      </div>
    </>
  );
}


// export default TestViewer