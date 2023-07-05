import React, { useContext, useEffect, useState } from "react";
import Styles from "./ApexCharts.module.css";
import Chart from "react-apexcharts";
import { AppContext } from "../App";

const ApexCharts = () => {
    const { diceNumSum, diceCounter, step } = useContext(AppContext);

    const generateCategories = (start, end) => {
        return Array.from(
            { length: end - start + 1 },
            (_, index) => start + index
        );
    };

    const [options, setOptions] = useState({
        chart: {
            id: "dice-distribution",
        },
        xaxis: {
            categories: [],
        },
    });

    const [series, setSeries] = useState([
        {
            name: "series-1",
            data: [],
        },
    ]);

    useEffect(() => {
        const minDiceNumSum = Math.floor(1 * diceCounter);
        const maxDiceNumSum = Math.floor(6 * diceCounter);

        const newCategories = generateCategories(minDiceNumSum, maxDiceNumSum);
        setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
                ...prevOptions.xaxis,
                categories: newCategories,
            },
        }));
        setSeries((prevSeries) => [
            {
                ...prevSeries[0],
                data: Array(maxDiceNumSum - minDiceNumSum + 1).fill(0),
            },
        ]);
    }, [diceCounter]);

    useEffect(() => {
        setSeries((prevSeries) => {
            const updatedData = [...prevSeries[0].data];
            const minDiceNumSum = Math.floor(2.8 * diceCounter);
            const index = diceNumSum - minDiceNumSum;
            if (index >= 0 && index < updatedData.length) {
                updatedData[index] += 1;
            }
            return [
                {
                    ...prevSeries[0],
                    data: updatedData,
                },
            ];
        });
    }, [diceNumSum, diceCounter]);

    return (
        <div className={Styles.container}>
            <Chart
                options={options}
                series={series}
                type="line" // radar - line(TB) - area - bar
                width={1150}
                height={220}
            />
        </div>
    );
};

export default ApexCharts;
