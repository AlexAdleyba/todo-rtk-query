import List from "@mui/material/List"
import {Task} from "./Task/Task"
import {TaskStatus} from "../../../../lib/enums/enums"
import {PAGE_SIZE, useGetTasksQuery} from "../../../../api/tasksApi"
import {TasksSkeleton} from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import type {DomainTodolist} from "../../../../lib/types/types"
import {useState} from "react";
import {TasksPagination} from "../TasksPagination/TasksPagination";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {
    const [page, setPage] = useState(1)
    const {data, isLoading} = useGetTasksQuery({todolistId: todolist.id, args: {page}})

    let tasksForTodolist = data?.items

    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
    }

    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
    }

    if (isLoading) {
        return <TasksSkeleton/>
    }

    return (
        <>
            {tasksForTodolist?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <>
                    <List>
                        {tasksForTodolist?.map((task) => {
                            return <Task key={task.id} task={task} todolist={todolist}
                                         disabled={todolist.entityStatus === "loading"}/>
                        })}
                    </List>
                    {(data?.totalCount || 0) > PAGE_SIZE &&<TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage}/>}
                </>
            )}
        </>
    )
}
