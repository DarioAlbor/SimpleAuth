import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin } from "@react-pdf-viewer/search";


interface IModalProps {
  onHideModal?: () => void
  url: string,
  modalShow: boolean
  modalClose: any
}

const Modal = ({ modalShow, url, modalClose }: IModalProps): JSX.Element => {
  const fileUrl2 = `/recources/${url}`;

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

  return <> {

    <div
      className="modal">
      <button
        onClick={modalClose}
        className="modal-close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="modal-content">

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <div
            className="rpv-core__viewer viewer-wrapper"

          >
            <div className="top-bar"
            >
              <div style={{ padding: "0px 2px" }}>
                <ShowSearchPopoverButton />
              </div>
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

            <div style={{ height: "720px" }}>
              <Viewer
                fileUrl={`${fileUrl2}`}
                initialPage={initialPage}
                onPageChange={handlePageChange}
                plugins={[searchPluginInstance, pageNavigationPluginInstance]}
                defaultScale={1.5}
              />
            </div>
          </div>
        </Worker>
      </div>
    </div>
  }
  </>

}

export default Modal;