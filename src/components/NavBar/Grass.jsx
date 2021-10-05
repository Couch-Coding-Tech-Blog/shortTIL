import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import moment from "moment";

function Grass({ postData }) {
  const [grassData, setGrassData] = useState(false);
  //moment 현재 날짜
  const nowDate = moment().format("YYYY-MM-DD");
  //moment로 현재 연도 1월 1일부터 시작
  const fromDate = moment()
    .set("month", 0)
    .startOf("month")
    .format("YYYY-MM-DD");
  useEffect(() => {
    setGrassData(getGrassData(postData));
  }, [postData]);

  //날짜 배열을 published_at만 빼내어 nivo/calendar컴포넌트에서 필요로 하는 형식으로 바꿔서 리턴함
  //[{"id": 1633397021724,"title": "다시또새글","author": "anonymous","published_at": "2021-10-05","body": "새글새글"},...] 
  // => [{"value": 1,"day": "2015-05-01"},{"value": 2,"day": "2015-05-02"}...]
  function getGrassData(postData) {
     // console.log(JSON.stringify(postData))
    let postDataCount = [];
    let grassData = [];
    postData.map((item) => {
      const date = moment(item["published_at"]).format("YYYY-MM-DD");
      return postDataCount[date] === undefined
        ? (postDataCount[date] = 1)
        : (postDataCount[date] = postDataCount[date] + 1);
    });
     for (var key in postDataCount) {
            grassData.push({ value: postDataCount[key], day: key });
          }
    return grassData;
  }

  return (
    <div style={{ height: "200px" }}>
      <ResponsiveCalendar
        data={grassData}
        from={fromDate}
        to={nowDate}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
}

export default Grass;
