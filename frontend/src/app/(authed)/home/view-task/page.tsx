"use client";
import ClientViewTask from "@/components/clientViewTask";
import ExecutorViewTask from "@/components/executorViewTask";
import SupportViewTask from "@/components/supportViewTask";
import { useAuthState } from "@/providers/authProvider";
import { useOfferActions, useOfferState } from "@/providers/offerProvider";
import { IOffer } from "@/providers/offerProvider/context";
import { usePaymentActions } from "@/providers/paymentProvider";
import { IPayfastResponse } from "@/providers/paymentProvider/context";
import { useReviewActions, useReviewState } from "@/providers/reviewProvider";
import { IReview } from "@/providers/reviewProvider/context";
import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { AbpTokenProperies } from "@/utils";
import { FormProps, Layout, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import type { HookConfig } from "react-paystack/dist/types";
import useStyles from "./style";
import withAuth from "@/hocs/withAuth";

const { Title } = Typography;
const { Sider } = Layout;

type FieldType = ITask;
type ReviewFieldType = IReview;

const Page = () => {
    const { getTask, completeTask, upViews, putTask } = useTaskActions();
    const { task } = useTaskState();
    const { decodedToken } = useAuthState();
    const { postOffer, getMyOffer, getTaskOffers, acceptOffer } = useOfferActions();
    const { offer, offers } = useOfferState();
    const { postPayment } = usePaymentActions();
    const { postReview } = useReviewActions();
    const { review } = useReviewState();
    const { styles, cx } = useStyles();
    const params = new URLSearchParams(useSearchParams());

    const config: HookConfig = {
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""
    }
    const initPayment = usePaystackPayment(config);

    const _taskId = params.get("id");
    const roleKey = AbpTokenProperies.role;
    const role = decodedToken ? `${decodedToken[roleKey]}` : "";

    useEffect(() => {
        if (_taskId) {
            getTask(_taskId);
            getTaskOffers(_taskId);

            if (role.toLocaleLowerCase() === "executor") {
                upViews(_taskId);
            }
        }
    }, []);

    /**
     * Pops up the Paystack payment modal
     * @param offerId the offer id
     * @param execId person who made the offer
     */
    const goPay = (offerId: string, execId: number) => {
        initPayment({
            config: {
                amount: 500, // cents
                email: "teboho.dev@gmail.com",
                reference: `paystack-howto-${(new Date()).getTime().toString()}`,
                currency: "ZAR",
                channels: ["card", "bank", "eft"],
            },
            onSuccess: (response: IPayfastResponse) => {
                console.log(response);
                acceptOffer(offerId);
                postPayment({
                    beneficiaryId: execId,
                    amount: 500,
                    reference: response.reference,
                    bank: response.bank,
                    transaction: response.transaction,
                    taskId: _taskId as string
                });
            },
            onClose: () => {
                console.log("closed");
            }
        });
    };

    const onExecutorFinish: FormProps<IOffer>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (_taskId) {
            values.taskId = _taskId;
            values.status = 0;
            postOffer(values);
        }
    }

    const acceptFinish: FormProps<IOffer>['onFinish'] = (values) => {
        console.log('Accept Success:', values);
        if (task?.status === 0) {
            values.status = 1;
            if (values.id && values.creatorUserId && _taskId) {
                goPay(values.id, values.creatorUserId);
            }
        }
        else if (task?.status === 1) {
            console.log('Completing:', task);
            if (task.id) {
                completeTask(task.id);
            }
        }
    }

    const clientViewTask = () => <ClientViewTask task={task} offers={offers} goPay={goPay} />;
    const executorViewTask = () => <ExecutorViewTask task={task} />;
    const supportViewTask = () => <SupportViewTask task={task} />;

    switch (role.toLocaleLowerCase()) {
        case "support":
        case "admin":
            return supportViewTask();
        case "executor":
            return executorViewTask();
        case "client":
        default:
            return clientViewTask();
    }
}

export default withAuth(Page);