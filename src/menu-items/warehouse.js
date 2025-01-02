import {
    IconKey,
    IconUserBolt,
    IconBuildingWarehouse,
    IconBrandProducthunt,
    IconArrowAutofitRight,
    IconArrowAutofitLeft,
    IconBuildingLighthouse, IconArrowsExchange, IconLockAccess
} from '@tabler/icons-react';
const icons = {
    IconKey,
    IconUserBolt,
    IconBuildingWarehouse,
    IconBrandProducthunt,
    IconArrowAutofitRight,
    IconArrowAutofitLeft,
    IconBuildingLighthouse,
    IconArrowsExchange,
    IconLockAccess
};

const warehouse = {
    id: 'warehouse',
    title: 'Quản lý Kho',
    caption: 'Quản lý kho hàng',
    type: 'group',
    children: [
        {
            id: 'Warehouse',
            title: 'Quản lý Kho hàng',
            type: 'item',
            url: '/warehouses',
            icon: icons.IconBuildingWarehouse
        },
        {
            id: 'Products',
            title: 'Danh sách biển bảng',
            type: 'item',
            url: '/products',
            icon: icons.IconBrandProducthunt
        },
        {
            id: 'Warehouse-dispatch',
            title: 'Xuất kho',
            type: 'item',
            url: '/warehouse-dispatch',
            icon: icons.IconArrowAutofitRight
        },
        {
            id: 'Customer',
            title: 'Dự án',
            type: 'item',
            url: '/customer',
            icon: icons.IconBuildingLighthouse
        },
        {
            id: 'Suppliers',
            title: 'Nhà cung cấp',
            type: 'item',
            url: '/suppliers',
            icon: icons.IconBuildingWarehouse
        },
        {
            id: 'Transfer',
            title: 'Chuyển kho',
            type: 'item',
            url: '/transfer',
            icon: icons.IconArrowsExchange
        },
        {
            id: 'Orders',
            title: 'Nhập kho',
            type: 'item',
            url: '/orders',
            icon: icons.IconArrowAutofitLeft
        }
    ]
}

export default warehouse;