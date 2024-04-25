"use client";

import { Form, Input } from "antd";

const Page = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    
    return (
        <>
            {/* Form for new task */}
            <Form
                name="new-task"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    label="Task Name"
                    name="taskName"
                    rules={[{ required: true, message: 'Please input the task name!' }]}
                >
                    <Input />   
                </Form.Item>
                <Form.Item
                    label="Task Description"
                    name="taskDescription"
                    rules={[{ required: true, message: 'Please input the task description!' }]} 
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Task Deadline"
                    name="taskDeadline"
                    rules={[{ required: true, message: 'Please input the task deadline!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Task Reward"
                    name="taskReward"
                    rules={[{ required: true, message: 'Please input the task reward!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Task Executor"
                    name="taskExecutor"
                    rules={[{ required: true, message: 'Please input the task executor!' }]}
                >
                    <Input />
                </Form.Item>
                
            </Form>
        </>
    );
}

export default Page;