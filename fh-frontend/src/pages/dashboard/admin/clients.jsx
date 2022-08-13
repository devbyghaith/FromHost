import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import * as styles from '../../../styles/dashboard/main';
import * as tableStyles from '../../../styles/dashboard/tables';
import * as buttonsStyles from '../../../styles/buttons';
import * as inputStyles from '../../../styles/inputs';

import { useUser } from '../../../providers/auth';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../../components/sidebar';
import Modal from '../../../components/modals';

export default function Clients() {
    var user = useUser();
    var navigate = useNavigate();

    var [error, setError] = useState(false);
    var [loading, setLoading] = useState(true);
    var [clients, setClients] = useState([]);

    useEffect(() => {
        fetch("http://localhost/admin/clients", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((response) => {
            setLoading(false);
            if (response.error) return setError(true);
            if (response.data) return setClients(response.data);
        }).catch((error) => {
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <>
            <styles.page>
                <Sidebar user={user} />
                <styles.content>
                    <styles.dashboard>
                        <tableStyles.container>
                            <tableStyles.header>العملاء</tableStyles.header>
                            <tableStyles.content>
                                {
                                    loading
                                    ? <BarLoader color={"var(--colors-main)"} width={"25%"} />
                                    : (
                                        error
                                        ? <>حدث خطأ اثناء محاولة الاتصال مع الخادم</>
                                        : (
                                            <tableStyles.table>
                                                <tableStyles.tableRow>
                                                    <tableStyles.tableHeader>#</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>ايدي العميل</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>المشتريات</tableStyles.tableHeader>
                                                </tableStyles.tableRow>
                                                {clients.map((client, index) => (
                                                    <tableStyles.tableRow key={`0x${index + 1}`}>
                                                        <tableStyles.tableData>{index + 1}</tableStyles.tableData>
                                                        <tableStyles.tableData>{client.user}</tableStyles.tableData>
                                                        <tableStyles.tableData>{client.totalActivations}</tableStyles.tableData>
                                                    </tableStyles.tableRow>
                                                ))}
                                            </tableStyles.table>
                                        )
                                    )
                                }
                            </tableStyles.content>
                        </tableStyles.container>
                    </styles.dashboard>
                </styles.content>
            </styles.page>
        </>
    );
};