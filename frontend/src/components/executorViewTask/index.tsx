'use client';
import { useOfferActions, useOfferState } from "@/providers/offerProvider";
import { IOffer, OfferStatus } from "@/providers/offerProvider/context";
import { ITask } from "@/providers/taskProvider/context";
import { Form as AntdForm, Button, FormProps, InputNumber, Layout, Tag, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import useStyles from "./style";

const { Title, Paragraph } = Typography;
const { Sider } = Layout;

const ExecutorViewTask = ({
    task,
}: {
    task?: ITask;
}): React.ReactNode => {
    const { styles, cx } = useStyles();
    const { postOffer, getMyOffer } = useOfferActions();
    const { offer } = useOfferState();

    const _taskId = task?.id;

    useEffect(() => {
        if (_taskId) {
            getMyOffer(_taskId);
        }
    }, [_taskId]);

    const onExecutorFinish: FormProps<IOffer>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (_taskId) {
            values.taskId = _taskId;
            values.status = 0;
            postOffer(values);
        }
    }

    return (
        <section className={cx(styles.section)}>
            {
                offer?.status === 1 ? (
                    <Layout>
                        <Sider width={"60%"}>
                            <article className={cx(styles.article)}>
                                <Title level={2}>View Task</Title>
                                <Title level={3}>Description</Title>
                                <Paragraph>{task?.description}</Paragraph>
                                <Title level={3}>Amount</Title>
                                <Paragraph>{task?.amount}</Paragraph>
                                <Title level={3}>Time Frame</Title>
                                <Paragraph>{task?.timeFrame}</Paragraph>
                            </article>
                        </Sider>
                        <Sider width={"39%"}>

                        </Sider>
                    </Layout>
                )
                    : (
                        <article className={cx(styles.article)}>
                            <Title level={2}>View Task</Title>
                            <Title level={3}>Description</Title>
                            <Paragraph>{task?.description}</Paragraph>
                            <Title level={3}>Amount</Title>
                            <Paragraph>{task?.amount}</Paragraph>
                            <Title level={3}>Time Frame</Title>
                            <Paragraph>{task?.timeFrame}</Paragraph>
                        </article>
                    )
            }
            <hr />
            <Title level={3}>Alternative Offer</Title>
            {(!offer) && (
                <Formik enableReinitialize={true}
                    initialValues={{
                        counterAmount: task?.amount || 0,
                        status: 0,
                        taskId: _taskId || ""
                    }}
                    onSubmit={onExecutorFinish}
                >
                    <Form
                        name="new-offer"
                        className={cx(styles.form)}
                    >
                        <AntdForm.Item label="Counter Amount">
                            <Field name="counterAmount" type="number" prefix="R" as={InputNumber} />
                        </AntdForm.Item>
                        <Button type="primary" htmlType="submit">Submit Offer</Button>
                    </Form>
                </Formik>
            )}
            {(offer) && (<>
                <Title level={3}>Your Offer</Title>
                <Paragraph>R {offer.counterAmount}</Paragraph>
                <Paragraph>Status: {offer.status === 0 ? <Tag color="green">{OfferStatus.NEW}</Tag> : <Tag>{OfferStatus.Accepted}</Tag>}</Paragraph>
            </>)}
        </section>
    );
}

export default ExecutorViewTask;