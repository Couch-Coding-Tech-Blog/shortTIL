import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import moment from "moment";
import "./style.scss";

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
        const newGrassData = getGrassData(postData);
        setGrassData(newGrassData);
    }, [postData]);

    async function addDataCount(item, postDataCount) {
        return new Promise((resolve) => {
            const date = moment(item["published_at"]).format("YYYY-MM-DD");
            resolve( postDataCount[date] === undefined
                ? (postDataCount[date] = 1)
                : (postDataCount[date] = postDataCount[date] + 1));
        });
    }

    function getGrassData(postData) {
        let postDataCount = [];
        let grassData = [];
        postData.map(async (item) => {
            await addDataCount(item, postDataCount);
        });
        for (const key in postDataCount) {
            grassData.push({ value: postDataCount[key], day: key });
        }
        return grassData;
    }

    return (
      <div className="contribute">
        <div className="inner">
          <p>Contribute visualization</p>
          <div className="grass">
              <ResponsiveCalendar
                  data={grassData}
                  from={fromDate}
                  to={nowDate}
                  emptyColor="#eeeeee"
                  colors={["#81c9e6", "#a0dbec", "#61DAFB", "#0e58c9"]}
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
        </div>
      </div>
    );
}

export default Grass;

