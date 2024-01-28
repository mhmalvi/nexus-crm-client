import React, { Suspense, useState } from "react";

const Collage = ({
  setCheckedItems,
  imageData,
  checkedItems,
  itemSelected,
  setItemSelected,
}) => {
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const toggleCheckbox = (index, url) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
    setClickedItemIndex(index);
    setItemSelected((prevSelected) => {
        const newPath = [...prevSelected.path];
        if (!newPath.includes(url)) {
          newPath.push(url);
        } else {
          newPath.splice(newPath.indexOf(url), 1);
        }
        return { path: newPath };
      });
  };

  return (
    <>
      {imageData?.map((item, index) => (
        <div
          key={index}
          onClick={() => toggleCheckbox(index, item.url)}
          className={`border border-slate-300 h-full flex items-center justify-center ${clickedItemIndex === index ? "clicked" : ""}`}
        >
          <div className="relative">
            {checkedItems[index] ? (
              <input
                type="checkbox"
                className="absolute"
                checked={checkedItems[index]}
                onChange={() => toggleCheckbox(index)}
              />
            ) : null}
            <Suspense fallback={<div>Loading...</div>}>
              <img className="w-full" src={item.url} alt={item.alt} />
            </Suspense>
          </div>
        </div>
      ))}
    </>
  );
};

export default Collage;
