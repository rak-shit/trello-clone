import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, editTask } from '../actions/actions'
import '../styles/list.css'

interface ITaskProps {
    taskItem: string
    title: string
}

function Task({taskItem, title}: ITaskProps) {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState<boolean>(false)
    const [editTaskName, setEditTaskName] = useState<string>('')

    function handleEdit(taskItem: string) {
        setEdit((edit) => !edit)
        setEditTaskName(taskItem)
    }

    function handleEditTaskName(event: any) {
        setEditTaskName(event.target.value)
    }

    function handleSave() {
        setEdit((edit) => !edit)
        dispatch(editTask(taskItem, editTaskName, title))
    }
    function handleDelete(taskItem: string) {
        console.log('delete')
        dispatch(deleteTask(taskItem, title))
    }
    return (
        <div className={'list-item'}>
            {
                edit ?
                    (
                        <>
                            <input data-testid={`input-${taskItem}`} style={{ padding: '8px', border: 'none', borderRadius: '5px' }} type={'text'} value={editTaskName} onChange={(event) => handleEditTaskName(event)} />
                            <div className='task-action'>
                                <button data-testid={`save-${taskItem}`} onClick={handleSave}>Save</button>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <span className='task-item'>{taskItem}</span>
                            <div className='task-action'>
                                <button className='task-item' data-testid={`edit-${taskItem}`} onClick={() => handleEdit(taskItem)}>Edit</button>
                                <button className='task-item' data-testid={`${taskItem}`} onClick={() => handleDelete(taskItem)}>Delete</button>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Task