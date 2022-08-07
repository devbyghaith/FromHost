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

export default function Products() {
    var user = useUser();
    var navigate = useNavigate();

    var [error, setError] = useState(false);
    var [loading, setLoading] = useState(true);
    var [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost/admin/products", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((response) => {
            setLoading(false);
            if (response.error) return setError(true);
            if (response.data) return setProducts(response.data);
        }).catch((error) => {
            setLoading(false);
            setError(true);
        });
    }, []);

    var [semiDelete, setSemiDelete] = useState(null);

    function DeleteProduct(productId) {
        fetch("http://localhost/admin/products", { method: "DELETE", credentials: "include", headers: { ['Content-Type']: 'application/json' }, body: JSON.stringify({ product: productId }) })
        .then((response) => response.json())
        .then((response) => {
            if (response.error) return setError(true);
            if (response.data) return setProducts(response.data);
        }).catch((error) => {
            setError(true);
        });
    };

    var [productToCreate, setProductToCreate] = useState(null);
    var [displayProductModal, setDisplayProductModal] = useState(false);

    function handleClose() {
        setDisplayProductModal(false);
        setProductToCreate(null);
    };

    return (
        <>
            {displayProductModal && <>
                <Modal modalData={{
                    title: "نموذج الإنشاء",
                    choices: [
                        {
                            type: "TEXT_INPUT",
                            placeholder: "اسم المنتج الجديد",
                            htmlKeys: {
                                onKeyUp: (event) => setProductToCreate(event.target.value ? event.target.value : null),
                            }
                        },
                        {
                            type: "BUTTON",
                            text: "إنشاء المنتج",
                            buttonType: "success",
                            htmlKeys: {
                                disabled: !productToCreate?.length,
                                onClick: (event) => {
                                    if (!productToCreate?.length) return;

                                    fetch("http://localhost/admin/products", { method: "POST", credentials: "include", headers: { ['Content-Type']: 'application/json' }, body: JSON.stringify({ product: productToCreate }) })
                                    .then((response) => response.json())
                                    .then((response) => {
                                        if (response.error) return setError(true);
                                        if (response.data) return setProducts(response.data);
                                    }).catch((error) => {
                                        setError(true);
                                    });

                                    handleClose();
                                }
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
                                <div>المنتجات</div>
                                <div>
                                    <buttonsStyles.success onClick={() => setDisplayProductModal(true)}>إنشاء منتج</buttonsStyles.success>
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
                                                    <tableStyles.tableHeader>اسم المنتج</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>تاريخ الإنشاء</tableStyles.tableHeader>
                                                    <tableStyles.tableHeader>التحكم</tableStyles.tableHeader>
                                                </tableStyles.tableRow>
                                                {products.map((product, index) => (
                                                    <tableStyles.tableRow key={`0x${index + 1}`}>
                                                        <tableStyles.tableData>{index + 1}</tableStyles.tableData>
                                                        <tableStyles.tableData>{product.name}</tableStyles.tableData>
                                                        <tableStyles.tableData>{new Date(product.createdAt).toLocaleDateString()}</tableStyles.tableData>
                                                        <tableStyles.tableData>
                                                            <buttonsStyles.danger onClick={() => {
                                                                if (semiDelete === product.id) DeleteProduct(product.id)
                                                                else setSemiDelete(product.id)
                                                            }}>{semiDelete === product.id ? "متأكد من الحذف؟" : "حذف"}</buttonsStyles.danger>
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