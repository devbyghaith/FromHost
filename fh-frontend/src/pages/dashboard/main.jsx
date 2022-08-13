import React, { useEffect, useState } from 'react';

import * as statisticsStyles from '../../styles/dashboard/statistics';
import * as styles from '../../styles/dashboard/main';

import { useUser } from '../../providers/auth';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/sidebar';
import { BarLoader } from 'react-spinners';

export default function Dashboard() {
    var user = useUser();
    var navigate = useNavigate();

    var [statistics, setStatistics] = useState(null);
    var [statisticsLoading, setStatisticsLoading] = useState(true);
    var [statisticsError, setStatisticsError] = useState(false);

    useEffect(() => {
        setStatisticsLoading(true);

        fetch("http://localhost/statistics", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((response) => {
            if (response.error) setStatisticsError(true);
            else setStatistics(response.data);

            setStatisticsLoading(false);
        }).catch((error) => {
            setStatisticsError(true)
            setStatisticsLoading(false);
        });
    }, []);

    return (
        <styles.page>
            <Sidebar user={user} />
            <styles.content>
                <styles.dashboard>
                    {
                        statisticsLoading
                        ? (
                            <statisticsStyles.container>
                                <statisticsStyles.card style={{ padding: "2rem" }}>
                                    <BarLoader color={'var(--colors-main)'} width="100%" />
                                </statisticsStyles.card>
                            </statisticsStyles.container>
                        )
                        : (
                            <statisticsStyles.container>
                                <statisticsStyles.card>
                                    <div>
                                        <statisticsStyles.title>Users</statisticsStyles.title>
                                        <statisticsStyles.description>Total users using our service</statisticsStyles.description>
                                    </div>
                                    <statisticsStyles.value>{statistics.users ?? 0}</statisticsStyles.value>
                                </statisticsStyles.card>
                                <statisticsStyles.card>
                                    <div>
                                        <statisticsStyles.title>Products</statisticsStyles.title>
                                        <statisticsStyles.description>Total products created</statisticsStyles.description>
                                    </div>
                                    <statisticsStyles.value>{statistics.products ?? 0}</statisticsStyles.value>
                                </statisticsStyles.card>
                                <statisticsStyles.card>
                                    <div>
                                        <statisticsStyles.title>Activations</statisticsStyles.title>
                                        <statisticsStyles.description>Total activations</statisticsStyles.description>
                                    </div>
                                    <statisticsStyles.value>{statistics.activations ?? 0}</statisticsStyles.value>
                                </statisticsStyles.card>
                            </statisticsStyles.container>
                        )
                    }
                    <styles.footer>© From Host | 2022 - {new Date().getUTCFullYear()}</styles.footer>
                </styles.dashboard>
            </styles.content>
        </styles.page>
    );
};