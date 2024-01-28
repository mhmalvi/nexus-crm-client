import { handleDeleteImage } from "../../../Components/services/que-mail";
import { message } from "antd";
const DeleteImage = ({
  setImageData,
  setCheckedItems,
  imageData,
  checkedItems,
  setTotalSelected,
  totalSelected,
  itemSelected,
}) => {
  console.log(itemSelected);

  const handleDeleteSelected = async () => {
    const resRmTemp = await handleDeleteImage(itemSelected);
    const updatedImageData = imageData.filter(
      (_, index) => !checkedItems[index]
    );
    const updatedCheckedItems = checkedItems.filter(
      (_, index) => !checkedItems[index]
    );
    if (resRmTemp?.status === 200) {
      message.success("Template successfully removed");
      setImageData(updatedImageData);
      setCheckedItems(updatedCheckedItems);
      setTotalSelected(0);
    } else {
      message.warning(resRmTemp?.message || "Something went wrong");
    }
  };
  return (
    <>
      {totalSelected > 0 ? (
        <>
          <h3 className="m-0 p-0 text-xl ">
            {totalSelected}{" "}
            {totalSelected === 1 ? "item selected" : "items selected"}
          </h3>
          <button
            className="px-4 py-2 border border-slate-300 rounded-md"
            onClick={handleDeleteSelected}
          >
            {totalSelected === 1 ? "Delete File" : "Delete Files"}
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default DeleteImage;
