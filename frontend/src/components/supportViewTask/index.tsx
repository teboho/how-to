'use client';
import { ITask } from "@/providers/taskProvider/context";
import { Typography } from "antd";
import React from "react";
import useStyles from "./style";

const { Title } = Typography;

const SupportViewTask = ({
    task
}: {
    task?: ITask;
}): React.ReactNode => {
    return (
        <div>
            <Title level={2}>View Task</Title>
            <Title level={3}>Description</Title>
            <p>{task?.description}</p>
            <Title level={3}>Amount</Title>
            <p>{task?.amount}</p>
            <Title level={3}>Time Frame</Title>
            <p>{task?.timeFrame}</p>
        </div>
    );
}

export default SupportViewTask;