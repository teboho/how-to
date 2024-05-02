"use client";

import { useCategoriesState as useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import type { SelectProps } from 'antd';
import { Button, Form, FormProps, Input, InputNumber, Select, Tag, Typography } from "antd";
import useStyles from "./style";

type TagRender = SelectProps['tagRender'];

const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4, background: '#B64326' }}
        >
            {label}
        </Tag>
    );
};

const { Title } = Typography;

type FieldType = ITask;

const Page = (): React.ReactNode => {
    return (
        <div>
            <Title level={2}>Expenditure</Title>

        </div>
    );
}
export default Page;