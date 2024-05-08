import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { ITaskCategory } from "@/providers/categoryProvider/context";
import { Tag } from "antd";
import { useEffect } from "react";

const TaskCategories = ({ taskId }: {
    taskId?: string
}) => {
    const { executorCategories, taskCategories } = useCategoriesState();
    const { getLocalCategory, getLocalTaskCategories } = useCategoryActions();

    useEffect(() => {
        let _c = taskCategories?.filter(b => b.taskId == taskId)?.map((bridge: ITaskCategory) => 
            getLocalCategory(bridge.categoryId)?.title
        );
        console.log(taskId, _c);
    }, [taskCategories]);

    return (
        <>
            {taskCategories?.filter(b => b.taskId == taskId)?.map((bridge: ITaskCategory) => {
                <Tag>{getLocalCategory(bridge.categoryId)?.title}</Tag>
            })}
        </>
    );
}

export default TaskCategories;