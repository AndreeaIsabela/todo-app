import axios from "axios";
import { take, put, select } from "redux-saga/effects";
import { v1 as uuid } from "uuid";
import * as mutations from "./mutations";

const url = "http://localhost:7777";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = "U1";
    const taskID = uuid();
    const createTask = mutations.createTask(taskID, groupID, ownerID);
    yield put(createTask);

    const { res } = yield axios.post(url + "/task/new", {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "New task",
      },
    });
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE,
    ]);
    axios.put(url + "/task/update", {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}
