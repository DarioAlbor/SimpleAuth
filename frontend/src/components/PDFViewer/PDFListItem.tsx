import { useState } from "react";
import IPDFList from "./models/PDFList.model.ts";
import Modal from "./Modal.tsx";

const PDFListItem: React.FC<IPDFList> = ({ title, name, tags, path, url, description }: IPDFList) => {

  const [showModal, setShowModal] = useState<boolean>(false)



  return (
    <>
      <div onClick={() => setShowModal(!showModal)} className='box' title="¡Presiona para leer!">
        <img src="/images/viasalud.jpeg" alt="pdf" className="w-12 mx-auto block mb-3" />
        <div className="f">
          <h6 className='text-xl mb-1'> {title} </h6>
          <p className="text-sm">{name}</p>
        </div>
      </div>
      {showModal ? <Modal modalShow={showModal} modalClose={() => setShowModal(false)} url={url} /> : null}
    </>
  )
}

export default PDFListItem