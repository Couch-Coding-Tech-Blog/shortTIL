import { Button } from "antd";
import React from "react";

const TagFiltering = ({ onFiltering }) => {
  const categoryList = ["ALL", "Java", "Python", "JavaScript"];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        columnGap: "5px",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}
    >
      {categoryList.map((category, idx) => (
        <Button onClick={onFiltering} key={idx} shape="round">
          {category}
        </Button>
      ))}
    </div>
  );
};

export default TagFiltering;
