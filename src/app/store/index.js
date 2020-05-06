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
                    }]
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