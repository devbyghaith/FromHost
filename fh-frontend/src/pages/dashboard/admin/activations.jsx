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

export default function Activations() {
    var user = useUser();
    var navigate = useNavigate();

    var [error, setError] = useState(false);
    var [loading, setLoading] = useState(true);
    var [activations, setActivations] = useState([]);
    var [products, setProducts] = useState([]);
    var [filter, setFilter] = useState(null);

    useEffect(() => {
        fetch("http://localhost/admin/activations", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((response) => {
            if (response.error) setError(true);
            if (response.data) setActivations(response.data);
            
            fetch("http://localhost/admin/products", { method: "GET", credentials: "include" })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                if (response.error) setError(true);
                if (response.data) setProducts(response.data);
            }).catch((error) => {
                setLoading(false);
                setError(true);
            });
        }).catch((error) => {
            setLoading(false);
            setError(true);
        });
    }, []);

    var [semiDelete, setSemiDelete] = useState(null);

    function Deactivate(activationId) {
        // console.log(semiDelete, activationId);
        // setActivations(activations.filter((activation) => activation.id !== activationId));

        fetch("http://localhost/admin/activations", { method: "DELETE", credentials: "include", headers: { ['Content-Type']: 'application/json' }, body: JSON.stringify({ activation: activationId }) })
        .then((response) => response.json())
        .then((response) => {
            if (response.error) return setError(true);
            if (response.data) return setActivations(response.data);
        }).catch((error) => {
            setError(true);
        });
    };

    var [userToActivate, setUserToActivate] = useState(null);
    var [addressToActivate, setAddressToActivate] = useState(null);
    var [productToActivate, setProductToActivate] = useState(null);
    var [displayActivationModal, setDisplayActivationModal] = useState(false);

    function handleClose() {
        setDisplayActivationModal(false);
        setProductToActivate(null);
        setAddressToActivate(null);
        setUserToActivate(null);
    };

    return (
        <>
            {displayActivationModal && <>
                <Modal modalData={{
                    title: "نموذج التفيل",
                    choices: [
                        {
                            type: "TEXT_INPUT",
                            placeholder: "ايدي الشخص",
                            htmlKeys: {
                                onKeyUp: (event) => setUserToActivate(event.target.value ? event.target.value : null),
                            }
                        },
                        {
                            type: "TEXT_INPUT",
                            placeholder: "ايبي الخادم",
                            htmlKeys: {
                                onKeyUp: (event) => setAddressToActivate(event.target.value ? event.target.value : null),
                            }
                        },
                        {
                            type: "SELECT_MENU",
                            placeholder: (productToActivate ? productToActivate.name : "اختر المنتج من هنا"),
                            choices: products.map((product) => ({
                                name: product.name,
                                onSelect: () => setProductToActivate(productToActivate === product ? null : product.id)
                            })),
                        },
                        {
                            type: "BUTTON",
                            text: "تفعيل",
                            buttonType: "success",
                            htmlKeys: {
                                disabled: (!userToActivate || !addressToActivate || !productToActivate),
                                onClick: (event) => {
                                    if (!userToActivate || !addressToActivate || !productToActivate) return;

                                    fetch("http://localhost/admin/activations", { method: "POST", credentials: "include", headers: { ['Content-Type']: 'application/json' }, body: JSON.stringify({ user: userToActivate, address: addressToActivate, product: productToActivate }) })
                                    .then((response) => response.json())
                                    .then((response) => {
                                        if (response.error) return setError(true);
                                        if (response.data) return setActivations(response.data);
                                    }).catch((error) => {
                                        setError(true);
                                    });

                                    handleClose();
                                },
                            }
                        },
                        {
                            type: "BUTTON",
                            text: "إلغاء",
                            buttonType: "danger",
                            htmlKeys: {
                                onClick: (event) => handleClose()
                            }
                        }
                    ]
                }}/>
            </>}
            <styles.page>
                <Sidebar user={user} />
                <styles.content>
                    <styles.dashboard>
                        <tableStyles.container>
                            <tableStyles.header>
                                <div>التفعيلات</div>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto auto",
                                    gap: "1rem"
                                }}>
                                    <buttonsStyles.success onClick={() => setDisplayActivationModal(true)}>تفعيل</buttonsStyles.success>
                                    <inputStyles.text onChange={(event) => setFilter(event.target.value)} placeholder={'Search for a activation...'} />
                                </div>
                            </tableStyles.header>
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
                                                    <tableStyles.tableHeader>المستخدم</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>اسم المنتج</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>ايبي الخادم</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>تاريخ التفعيل</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>التحكم</tableStyles.tableHeader>
                                                </tableStyles.tableRow>
                                                {activations.filter((activation) => (filter?.length ? activation.user.user.includes(filter) || activation.address.includes(filter) : true)).map((activation, index) => (
                                                    <tableStyles.tableRow key={`0x${index + 1}`}>
                                                        <tableStyles.tableData>{index + 1}</tableStyles.tableData>
                                                        <tableStyles.tableData>{activation.user.user}</tableStyles.tableData>
                                                        <tableStyles.tableData>{activation.product.name}</tableStyles.tableData>
                                                        <tableStyles.tableData>{activation.address}</tableStyles.tableData>
                                                        <tableStyles.tableData>{new Date(activation.activatedAt).toLocaleDateString()}</tableStyles.tableData>
                                                        <tableStyles.tableData>
                                                            <buttonsStyles.danger onClick={() => {
                                                                if (semiDelete === activation.id) Deactivate(activation.id)
                                                                else setSemiDelete(activation.id)
                                                            }}>{semiDelete === activation.id ? "متأكد من الحذف؟" : "حذف"}</buttonsStyles.danger>
                                                        </tableStyles.tableData>
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