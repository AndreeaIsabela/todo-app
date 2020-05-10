import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { defaultSatate } from '../../server/defaultState';
import * as mutations from './mutations';
import * as sagas from './sagas.mock' 

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({
        tasks(tasks = defaultSatate.tasks, action) {
            switch (action.type) {
                case mutations.CREATE_TASK:
                    return [...tasks,{
                        id:action.taskID,
                        name:"New Task",
                        group:action.groupID,
                        owner:action.ownerID,
                        isComplete:false
                    }];
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? 
                            {...task, isComplete: action.isComplete} : 
                            task;
                    } );
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ?
                            {...task, group: action.groupID} :
                            task
                    });
                case mutations.SET_TASK_NAME: 
                    return tasks.map(task => {
                        return (task.id === action.taskID) ?
                            {...task, name: action.name} :
                            task
                    });
                }
            return tasks;
        },
        comments(comments = defaultSatate.comments, action) {
            return comments;
        },
        groups(groups = defaultSatate.groups, action) {
            return groups;
        },
        users(users = defaultSatate.users, action) {
            return users;
        },
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}