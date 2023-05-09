import {FC, memo, useState} from "react";
import {Item} from "../../types/Item";
import "./TaskItem.css"

import checkbox_unchecked_icon from './assets/checkbox-unchecked.svg'
import checkbox_disabled_icon from "./assets/checkbox-disabled.svg"
import trash_icon from "./assets/delete-new-value.svg"

import TaskTag from "../TaskTag/TaskTag";

const month_array: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const day_array: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

interface TaskItemProps {
    item: Item,
    deleteItem: (id: string) => void,
    checkItem: (id: string) => void
}

const TaskItem: FC<TaskItemProps> = memo(({item, deleteItem, checkItem}) => {


    const [isLoading, setIsLoading] = useState<boolean>(false)

    const parsed_date: Date = new Date(Date.parse(item.date))
    const today: Date = new Date();

    let day_text: string;

    if (parsed_date.getFullYear() === today.getFullYear()
        && parsed_date.getMonth() === today.getMonth()
        && parsed_date.getDate() === today.getDate()
    ) {
        day_text = 'Today'
    } else if (parsed_date.getFullYear() === today.getFullYear()
        && parsed_date.getMonth() === today.getMonth()
        && parsed_date.getDate() - today.getDate() === 1
    ) {
        day_text = 'Tomorrow'
    } else if (parsed_date.getFullYear() === today.getFullYear()
        && parsed_date.getMonth() === today.getMonth()
        && parsed_date.getDate() - today.getDate() === -1
    ) {
        day_text = 'Yesterday'
    } else {
        day_text = `${day_array[parsed_date.getDay()]}, ${parsed_date.getDate()} ${month_array[parsed_date.getMonth()]}`
    }

    const handleCheck = () => {
        setIsLoading(true);
        checkItem(item.id)
    }

    const handleDelete = () => {
        setIsLoading(true);
        deleteItem(item.id)
    }

    return (
        <div className={`task-item ${isLoading ? "task-item--loading" : null}`}>

            <button className={"task-item__checkbox"} onClick={handleCheck}>
                <img
                    className={item.isChecked ? "task-item__checkbox-img task-item__checkbox-img--checked" : "task-item__checkbox-img task-item__checkbox-img--unchecked"}
                    src={item.isChecked ? checkbox_disabled_icon : checkbox_unchecked_icon}
                    alt={item.isChecked ? "Uncheck" : "Check"}/>
            </button>

            <div className={"task-item__info"}>
                <h3 className={`task-item__title`}>{item.title}</h3>

                <div className={"task-item__bottom"}>
                    <TaskTag name={item.tag} isColored={!item.isChecked}/>
                    <div className={`task-item__date `}>{day_text}</div>
                </div>
            </div>

            {!item.isChecked &&
                <div className={"task-item__controls"}>
                    <button className={"task-item__control-item"} onClick={handleDelete}>
                        <img src={trash_icon} alt={"Delete"}/>
                    </button>
                </div>
            }
        </div>
    )
})

export default TaskItem