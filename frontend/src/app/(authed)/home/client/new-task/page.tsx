"use client";

import { useTaskActions } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { Button, ConfigProvider, Form, FormProps, Input, InputNumber, Typography } from "antd";
import useStyles from "./style";

const { Title } = Typography;

type FieldType = ITask;

const Page = () => {
    const { postTask } = useTaskActions();
    const { styles, cx, theme } = useStyles();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        values.status = 0;
        postTask(values);
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    
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
                    label="Task Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input the task amount!' }]}
                >
                    <InputNumber prefix="R"  />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Task Time Frame"
                    name="timeFrame"
                    help="The time frame is in hours"
                    rules={[{ required: true, message: 'Please input the task timeframe!' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBgContainer: "#fff",
                                colorPrimaryActive: "#B64326",
                                colorBgTextActive: "#B64326"
                            }        
                        }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </ConfigProvider>
                </Form.Item>                
            </Form>
        </section>
    );
}

export default Page;