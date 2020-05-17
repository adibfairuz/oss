import { watchGetUser, watchPostUser} from './user';
import { watchGetAsyncStorage, watchSetAsyncStorage, watchRemoveAsyncStorage } from './asyncStorage';
import {watchGetProfile, watchEditProfile, watchEditPassword} from './profile'
import {watchGetConfigForm, watchEditConfigForm, watchAddConfigForm, watchDeleteConfigForm} from './configForm'
import {all, fork} from 'redux-saga/effects';

export default function* sagas () {
    yield all([
        fork(watchGetUser),
        fork(watchPostUser),
        fork(watchGetAsyncStorage),
        fork(watchSetAsyncStorage),
        fork(watchRemoveAsyncStorage),
        fork(watchGetProfile),
        fork(watchEditProfile),
        fork(watchEditPassword),
        fork(watchGetConfigForm),
        fork(watchEditConfigForm),
        fork(watchAddConfigForm),
        fork(watchDeleteConfigForm)
    ]);
};