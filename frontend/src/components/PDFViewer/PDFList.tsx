import IPDFList from "./models/PDFList.model.ts";
import PDFListItem from "./PDFListItem.tsx";

interface PDFLists {
  lists: IPDFList[]
}

const PDFList: React.FC<PDFLists> = ({ lists }: PDFLists) => {
  return (
    <div className="grid">
      {lists?.map((list, i) => {
        return <PDFListItem key={i} title={list.title} url={list.url} name={list.name} description={list.description} path={list.path} tags={list.tags} />
      })}

    </div>
  )
}

export default PDFList