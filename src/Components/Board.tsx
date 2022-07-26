import { useEffect, useState } from 'react'
import AddList from './AddList'
import { useSelector, useDispatch } from 'react-redux'
import List from './List'
import { dragDrop } from '../actions/actions'
import '../styles/board.css'

function Board() {
    const list = useSelector((state: any) => state.listReducer)
    const dispatch = useDispatch()
    const [addList, setAddList] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    function toggleAddlist() {
        setAddList((prevValue) => !prevValue)
    }

    function handleDragging(dragging: boolean) {
        setIsDragging(dragging)
    }

    function handleUpdate(deleteBoardId: number, taskData: string, newBoardId: number, taskId: number) {
        dispatch(dragDrop(deleteBoardId, newBoardId, taskData, taskId))
    }
    
    useEffect(() => {
        setAddList(false)
    }, [list.list.length])
    return (
        <div className={'board'}>
            {
                list.list.map((item: any) => {
                    return (
                        <List 
                            item={item}
                            isDragging={isDragging}
                            handleDragging={handleDragging}
                            handleUpdate={handleUpdate}
                        />
                    )
                })
            }
            <div style={{ padding: '1rem 0rem' }}>
                {
                    addList ? (
                        <div>
                            <AddList />
                        </div>
                    ) : (
                        <div style={{ marginLeft: 15 }}>
                            <button className={'new-list'} onClick={toggleAddlist} data-testId="add-list">+</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Board