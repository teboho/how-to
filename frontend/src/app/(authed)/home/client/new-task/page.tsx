"use client";

import { useCategoriesState as useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import type { SelectProps } from 'antd';
import { Button, Form, FormProps, Input, InputNumber, Select, Tag, Typography } from "antd";
import useStyles from "./style";
import { useEffect, useState } from "react";

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
    const { task } = useTaskState();
    const { postTask } = useTaskActions();
    const { categories } = useCategoriesState();
    const { postTaskCategory } = useCategoryActions();
    const { styles, cx, theme } = useStyles();
    const [time, setTime] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setTotal(amount * time);
    }, [amount, time])

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        values.status = 0;
        if (values?.categories?.length > 0) {
            postTask(values, values?.categories);
            if (task !== undefined) {
                values.categories.forEach((categoryId: string) => postTaskCategory(categoryId, `${task.id}`));
            }
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const onAmountChange = (value: number | null) => {
        value && setAmount(value);
    }

    const onTimeChange = (value: number | null) => {
        value && setTime(value);
    }



    const options = categories?.map(category => ({ label: category.title, value: category.id, color: colors[Math.floor(Math.random() * colors.length)] }));

    return (
        <section>
            <Title level={2}>New Task</Title>
            <Form
                name="new-task"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                initialValues={{}}
                className={cx(styles.form)}
            >
                <Form.Item<FieldType>
                    label="Ttitle"
                    name="title"
                    rules={[{ required: true, message: 'Please input the task title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Task Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the task description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Task Time Frame"
                    name="timeFrame"
                    help="The time frame is in hours"
                    rules={[{ required: true, message: 'Please input the task timeframe!' }]}
                >
                    <InputNumber onChange={onTimeChange} />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Task Amount (ZAR per hour)"
                    name="amount"
                    rules={[{ required: true, message: 'Please input the task amount!' }]}
                >
                    <InputNumber prefix="R" onChange={onAmountChange} />
                </Form.Item>
                <label>Total: {total} rands.</label>
                <Form.Item
                    label="Category"
                    name="categories"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        defaultValue={[]}
                        style={{ width: '100%', backgroundColor: '#B64326' }}
                        options={options}
                        maxCount={3}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </section>
    );
}

export default Page;