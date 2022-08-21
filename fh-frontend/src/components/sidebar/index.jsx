import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import * as styles from './styles';

export default function Sidebar({ user, ...props }) {
    var navigate = useNavigate();
    var location = useLocation();
    
    return (
        <styles.sidebar>
            <styles.brand>
                <styles.brandIcon />
                <styles.brandName>FromHost</styles.brandName>
            </styles.brand>
            <styles.splitter />
            <styles.sections>
                <styles.section>
                    <styles.choices>
                        <styles.choice isActive={location?.pathname === "/dashboard"} onClick={() => navigate("/dashboard")}>الإحصائيات</styles.choice>
                    </styles.choices>
                </styles.section>
                {user?.administrator === 1 && <>
                    <styles.section>
                        <styles.sectionName>الإدارة</styles.sectionName>
                        <styles.choices>
                            <styles.choice isActive={location?.pathname === "/dashboard/admin/activations"} onClick={() => navigate("/dashboard/admin/activations")}>التفعيلات</styles.choice>
                            <styles.choice isActive={location?.pathname === "/dashboard/admin/products"} onClick={() => navigate("/dashboard/admin/products")}>المنتاجات</styles.choice>
                            <styles.choice isActive={location?.pathname === "/dashboard/admin/clients"} onClick={() => navigate("/dashboard/admin/clients")}>قائمة العملاء</styles.choice>
                        </styles.choices>
                    </styles.section>
                </>}
                <styles.section>
                    <styles.sectionName>العملاء</styles.sectionName>
                    <styles.choices>
                        <styles.choice isActive={location?.pathname === "/dashboard/my-products"} onClick={() => navigate("/dashboard/my-products")}>منتجاتي</styles.choice>
                    </styles.choices>
                </styles.section>
            </styles.sections>
        </styles.sidebar>
    )
};