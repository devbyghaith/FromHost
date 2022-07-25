import React from 'react'

import * as styles from '../../styles/authentication/login';

import HandleLogin from '../../utilities/functions/handle-login';

export default function Login() {
    return (
        <styles.container>
            <styles.form>
                <styles.header>
                    <styles.title>تسجيل الدخول</styles.title>
                </styles.header>
                <styles.splitter />
                <styles.buttons>
                    <styles.button onClick={HandleLogin}>تسجيل دخول بأستخدام ديسكورد</styles.button>
                    <styles.button>دخول الديسكورد الخاص بنا </styles.button>
                </styles.buttons>
                <styles.footer>© From Host | 2022 - {new Date().getUTCFullYear()}</styles.footer>
            </styles.form>
        </styles.container>
    );
};