"use client";

import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { Typography, List, Card, Flex, Button, Form, Input } from "antd";
import { useEffect } from "react";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { tasks } = useTaskState();
    const { getTasks } = useTaskActions();

    useEffect(() => {
        getTasks();
    }, []);
    
    return (
        <>
            <Title level={2}>New Tasks</Title>
            <Flex>
                <div></div>
                <img width={300} src="/unDraw/undraw_undraw_undraw_undraw_undraw_undraw_undraw_users_per_minute_1e4q_t22j_-1-_0ngf_-1-_27dv_30ul_legv_-1-_0f3m.svg" alt="No tasks" />
            </Flex>
            <hr />
            <List
                dataSource={tasks?.filter(t => t.status === 0) || []}
                renderItem={(item) => (
                <List.Item
                    key={item.id}
                >
                    <List.Item.Meta
                        title={item.title}
                        description={<>
                            <Paragraph>
                                Description: {item.description}
                            </Paragraph>
                            <Paragraph>
                                Amount: R {item.amount}
                            </Paragraph>
                            <Paragraph>
                                Duration: {item.timeFrame} hours
                            </Paragraph>
                            <Button type="primary">Accept</Button>
                            <Form>
                                <Form.Item>
                                    {/* Counter price */}
                                    <Form.Item
                                        name="price"
                                        label="Price"
                                        rules={[{ required: true, message: 'Please input the price!' }]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                    {/* Counter duration */}
                                    <Button type="primary" htmlType="submit">Counter</Button>
                                </Form.Item>
                            </Form>
                        </>}
                    >
                    </List.Item.Meta>
                </List.Item>
                )}
            />
        </>
    );
}

export default Page;