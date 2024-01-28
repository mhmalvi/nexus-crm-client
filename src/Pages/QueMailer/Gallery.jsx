import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import DeleteImage from "./GalleryComponents/DeleteImage";
import Collage from "./GalleryComponents/Collage";

const Gallery = ({ galleryList, showGallery, setShowGallery }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [imageData, setImageData] = useState([galleryList]);
  const [totalSelected, setTotalSelected] = useState(0);
  const [checkedItems, setCheckedItems] = useState(
    new Array(galleryList.length).fill(false)
  );

  const [itemSelected, setItemSelected] = useState({ path: [] });

  useEffect(() => {
    const totalChecked = checkedItems.filter((isChecked) => isChecked).length;
    setTotalSelected(totalChecked);
    setImageData(galleryList);
  }, [checkedItems, galleryList]);

  const handleCancel = () => {
    setShowGallery(false);
  };
  return (
    <Modal
      title="Gallery"
      width="80%"
      visible={showGallery}
      open={showGallery}
      confirmLoading={confirmLoading}
      onOk={handleCancel}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okText="Close"
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between w-full">
          <DeleteImage
            setImageData={setImageData}
            setCheckedItems={setCheckedItems}
            setTotalSelected={setTotalSelected}
            imageData={imageData}
            checkedItems={checkedItems}
            totalSelected={totalSelected}
            itemSelected={itemSelected}
          />
        </div>
        <div className="grid grid-cols-5 items-center gap-8">
          <Collage
            setImageData={setImageData}
            setCheckedItems={setCheckedItems}
            imageData={imageData}
            checkedItems={checkedItems}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Gallery;
