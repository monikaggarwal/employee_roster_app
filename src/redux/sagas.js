import { put, takeLatest, call } from 'redux-saga/effects';
import { setEmployees } from './reducer';

function* fetchEmployeesSaga() {
  try {
    const response = yield call(fetch, '/sample-data.json');
    const data = yield response.json();
    yield put(setEmployees(data));
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

export function* rootSaga() {
  yield takeLatest('FETCH_EMPLOYEES', fetchEmployeesSaga);
}
