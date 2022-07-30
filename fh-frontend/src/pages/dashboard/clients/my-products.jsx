import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import * as styles from '../../../styles/dashboard/main';
import * as tableStyles from '../../../styles/dashboard/tables';
import * as buttonsStyles from '../../../styles/buttons';
import * as inputStyles from '../../../styles/inputs';

import { useUser } from '../../../providers/auth';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../../components/sidebar';

export default function MyProducts() {
    var user = useUser();
    var navigate = useNavigate();

    var [error, setError] = useState(false);
    var [loading, setLoading] = useState(true);
    var [activations, setActivations] = useState([]);

    var [isEditing, setIsEditing] = useState(false);
    var [editingActivation, setEditingActivation] = useState(null);
    var [newAddress, setNewAddress] = useState(null);

    useEffect(() => {
        fetch("http://localhost/clients/my-products", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((response) => {
            setLoading(false);
            if (response.error) return setError(true);
            if (response.data) return setActivations(response.data);
        }).catch((error) => {
            setLoading(false);
            setError(true);
        });
    }, []);

    function SubmitUpdate() {
        let editedActivation = activations.find((activation) => activation.id === editingActivation);

        if (editedActivation) {
            if (editedActivation.address == newAddress) return setNewAddress(null);

            setIsEditing(false);
            setEditingActivation(null);

            fetch("http://localhost/clients/my-products", { method: "POST", credentials: "include", headers: { ['Content-Type']: 'application/json' }, body: JSON.stringify({ activation: editedActivation.id, address: newAddress }) })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) return setError(true);
                if (response.data) return setActivations(response.data);
            }).catch((error) => {
                setError(true);
            });
        };
    };

    function CancelUpdate() {
        setIsEditing(false);
        setEditingActivation(null);
        setNewAddress(null);
    };

    return (
        <styles.page>
            <Sidebar user={user} />
            <styles.content>
                <styles.dashboard>
                    <tableStyles.container>
                        <tableStyles.header>المنتجات الخاصة بك</tableStyles.header>
                        <tableStyles.content>
                            {
                                loading
                                ? <BarLoader color={"var(--colors-main)"} width={"25%"} />
                                : (
                                    error
                                    ? <>حدث خطأ اثناء محاولة الاتصال مع الخادم</>
                                    : (
                                        activations?.length <= 0
                                        ? <>انت لا تمتلك اي منتج حتى الان</>
                                        : (
                                            <tableStyles.table>
                                                <tableStyles.tableRow>
                                                    <tableStyles.tableHeader>#</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>اسم المنتج</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>ايبي الخادم (للتغيير اضغط على الايبي)</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>تاريخ التفعيل</tableStyles.tableHeader>
                                                </tableStyles.tableRow>
                                                {activations.map((activation, index) => {
                                                    return (
                                                        <tableStyles.tableRow key={`Ax${index + 1}`}>
                                                            <tableStyles.tableData>{index + 1}</tableStyles.tableData>
                                                            <tableStyles.tableData>{activation.product.name}</tableStyles.tableData>
                                                            {
                                                                isEditing && editingActivation === activation.id
                                                                ? <tableStyles.tableData flexRow={true}>
                                                                    <inputStyles.text defaultValue={activation.address} placeholder={"ايبي الخادم"} onKeyUp={((event) => setNewAddress(event.target.value))} />
                                                                    <buttonsStyles.success onClick={SubmitUpdate}>تغيير</buttonsStyles.success>
                                                                    <buttonsStyles.danger onClick={CancelUpdate}>إلغاء</buttonsStyles.danger>
                                                                </tableStyles.tableData>
                                                                : <tableStyles.tableData editAble={true} onClick={(event) => {
                                                                    event.preventDefault();
                                                                    setIsEditing(true);
                                                                    setEditingActivation(activation.id);
                                                                }}>{activation.address}</tableStyles.tableData>
                                                            }
                                                            <tableStyles.tableData>{new Date(activation.activatedAt).toLocaleDateString()}</tableStyles.tableData>
                                                        </tableStyles.tableRow>
                                                    )
                                                })}
                                            </tableStyles.table>
                                        )
                                    )
                                )
                            }
                        </tableStyles.content>
                    </tableStyles.container>
                </styles.dashboard>
            </styles.content>
        </styles.page>
    );
};