import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const TaskDetail = ({
    id,
    comments,
    task,
    isComplete,
    groups,
    setTaskCompletion
}) => {
    return (
        <div>
            <div>
                <input value={task.name} />
            </div>
            <div>
                <button onClick={() => setTaskCompletion(id, isComplete)}>{isComplete ? 'Reopen' : 'Complete'}</button>
            </div>
            <div>
                <select>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <Link to="/dashboard">
                    <button>Done</button>
                </Link>
            </div>
        </div>
    )
}

const maspStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const task = state.tasks.find(task => task.id === id);
    const groups = state.groups;
    return {
        id,
        task,
        groups,
        isComplete: task.isComplete
    }
}
const mapDsipatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        setTaskCompletion(id, isComplete) {
            dispatch(mutations.setTaskCompletion(id, isComplete));
        }
    }
}

export const ConnectedTaskDetail = connect(maspStateToProps, mapDsipatchToProps)(TaskDetail);