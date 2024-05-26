import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';

const menu = [
    { label: 'Danh sách nhân viên', icon: 'folder_shared', url: '/home', name: 'home' },
    // { label: 'KPI', icon: 'bar_chart', name: 'kpi' },
    // { label: 'SLA', icon: 'commit', name: 'sla' },
    { label: 'Cẩm nang bán hàng', icon: 'menu_book', url: '/ehandbook', name: 'ehandbook' },
    { label: 'Phê duyệt tập trung', icon: 'spellcheck', url: '/approval', name: 'approval' },
    { label: 'Cơ hội bán', icon: 'auto_fix_normal', url: '/portal-lead/chb', name: 'chb' },
    { label: 'Call Report', icon: 'summarize', url: '/portal-lead/call-report', name: 'call-report' },
    { label: 'Quản lý công việc', icon: 'view_timeline', url: '/portal-lead/work-management', name: 'work-management' },
];

function Sidebar({ open, closeAside, version, renderRightMenu }) {
    const pathname = typeof window !== 'undefined' ? window?.location?.pathname : '/';
    const [pathActive, setPathActive] = useState([]);

    useEffect(() => {
        const path = pathname?.split('/');
        setPathActive(path || []);
    }, [pathname]);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        closeAside?.();

        let path = window.location.origin;
        path += process.env.NEXT_PUBLIC_BASE_PATH + '/login';
        window.open(path, '_self');
    };

    if (open) {
        return (
            <>
                <div
                    className='fixed top-0 left-0 w-100 h-100 z-index-10 pointer'
                    style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
                    onClick={() => closeAside?.()}
                />
                <aside className='fixed top-0 bottom-0 left-0 d-flex z-index-1000'>
                    <div className='w-300px bg-white p-16px d-flex flex-col'>
                        <div className='d-flex items-end justify-between mt-16px mb-24px'>
                            <div style={{ height: 24 }}>
                                <img className='d-block' src={`${process.env.NEXT_PUBLIC_BASE_URL}/img/HDBank-logo.svg`} alt='' width='87px' height='32px' />
                            </div>
                            <i className='material-icons-outlined text-gray-400 pointer' onClick={() => closeAside?.()}>
                                close
                            </i>
                        </div>
                        {menu?.map?.((item, index) => {
                            if (index >= 3 && sessionStorage.getItem('showMenu') !== '1') {
                                return <Fragment key={index} />;
                            }
                            return (
                                <a
                                    href={process.env.NEXT_PUBLIC_BASE_PATH + (item?.url || '')}
                                    className={`d-flex items-center my-4px py-4px px-12px rounded-4px pointer border border-transparent hover-border-red text-decoration-none text-gray-500 ${
                                        pathActive?.includes(item?.name) && 'bg-red-100 text-red fw-600'
                                    }`}
                                    key={index}>
                                    <div className='flex-1 d-flex items-center'>
                                        <i className='material-icons-outlined mr-8px'>{item?.icon}</i>
                                        {item?.label}
                                    </div>
                                    {item?.url === '/ehandbook' && (
                                        <div
                                            className={`w-16px h-16px rounded-4px d-flex items-center justify-center bg-gray-100 ${
                                                pathActive?.includes(item?.name) && 'bg-red text-white'
                                            }`}>
                                            <i className='material-icons fs-16px'>chevron_right</i>
                                        </div>
                                    )}
                                </a>
                            );
                        })}
                        <div className='mt-auto'></div>
                        <div className='d-flex items-center py-8px px-12px pointer rounded-4px'>
                            <i className='material-icons-outlined text-gray-400 mr-8px'>sms</i>Góp ý
                        </div>
                        <div className='d-flex items-center py-8px px-12px pointer rounded-4px'>
                            <i className='material-icons-outlined text-gray-400 mr-8px'>help_outline</i>Trợ giúp
                        </div>
                        <a
                            href={`${process.env.NEXT_PUBLIC_BASE_PATH}/login`}
                            className='d-flex items-center py-8px px-12px text-gray-500 pointer'
                            style={{ textDecoration: 'none' }}
                            onClick={handleLogout}>
                            <i className='material-icons-outlined text-gray-400 mr-8px'>logout</i>Đăng xuất
                        </a>

                        <div className='border-t-gray-100 border-t tc pt-16px text-gray-300'>
                            HDBank @{new Date().getFullYear()} {version || 'v1.0.0'}
                        </div>
                    </div>
                    {renderRightMenu?.()}
                </aside>
                <style global={'true'} jsx={'true'}>{`
                    :root {
                        --gray-100: #eaeef2;
                        --gray-200: #d3d8de;
                        --gray-300: #a8b0bb;
                        --gray-400: #454f5b;
                        --gray-500: #212b36;
                        --red-100: #fde8e8;
                        --white: white;
                        --red: #be1128;
                        --border: var(--gray-200);
                    }
                    .fixed {
                        position: fixed;
                    }
                    .top-0 {
                        top: 0;
                    }
                    .bottom-0 {
                        bottom: 0;
                    }
                    .left-0 {
                        left: 0;
                    }
                    .w-100 {
                        width: 100%;
                    }
                    .h-100 {
                        height: 100%;
                    }
                    .z-index-10 {
                        z-index: 10;
                    }
                    .z-index-1000 {
                        z-index: 1000;
                    }
                    .d-flex {
                        display: flex;
                    }
                    .flex-col {
                        flex-direction: column;
                    }
                    .items-end {
                        align-items: flex-end;
                    }
                    .justify-between {
                        justify-content: space-between;
                    }
                    .mt-16px {
                        margin-top: 16px;
                    }
                    .mb-24px {
                        margin-bottom: 24px;
                    }
                    .p-16px {
                        padding: 16px;
                    }
                    .bg-white {
                        background-color: var(--white);
                    }
                    .w-300px {
                        width: 300px;
                    }
                    .d-block {
                        display: block;
                    }
                    .text-gray-400 {
                        color: var(--gray-400);
                    }
                    .pointer {
                        cursor: pointer;
                    }
                    .items-center {
                        align-items: center;
                    }
                    .justify-center {
                        justify-content: center;
                    }
                    .mt-4px,
                    .my-4px,
                    .m-4px {
                        margin-top: 4px;
                    }
                    .mb-4px,
                    .my-4px,
                    .m-4px {
                        margin-bottom: 4px;
                    }
                    .pt-4px,
                    .py-4px,
                    .p-4px {
                        padding-top: 4px;
                    }
                    .pb-4px,
                    .py-4px,
                    .p-4px {
                        padding-bottom: 4px;
                    }
                    .pl-12px,
                    .px-12px,
                    .p-12px {
                        padding-left: 12px;
                    }
                    .pr-12px,
                    .px-12px,
                    .p-12px {
                        padding-right: 12px;
                    }
                    .rounded-4px {
                        border-radius: 4px;
                    }
                    .border {
                        border: 1px solid var(--border);
                    }
                    .border-transparent {
                        border-color: transparent;
                    }
                    .hover-border-red:hover {
                        border-color: var(--red);
                    }
                    .text-decoration-none {
                        text-decoration: none;
                    }
                    .text-gray-500 {
                        color: var(--gray-500);
                    }
                    .bg-red-100 {
                        background-color: var(--red-100);
                    }
                    .text-red {
                        color: var(--red);
                    }
                    .fw-600 {
                        font-weight: 600;
                    }
                    .flex-1 {
                        flex: 1;
                    }
                    .mr-8px {
                        margin-right: 8px;
                    }
                    .w-16px {
                        width: 16px;
                    }
                    .h-16px {
                        height: 16px;
                    }
                    .bg-gray-100 {
                        background-color: var(--gray-100);
                    }
                    .bg-red {
                        background-color: var(--red);
                    }
                    .text-white {
                        color: var(--white);
                    }
                    .fs-16px {
                        font-size: 16px;
                    }
                    .mt-auto {
                        margin-top: auto;
                    }
                    .pt-8px,
                    .py-8px,
                    .p-8px {
                        padding-top: 8px;
                    }
                    .pb-8px,
                    .py-8px,
                    .p-8px {
                        padding-bottom: 8px;
                    }
                    .border-t-gray-100 {
                        border-top-color: var(--gray-100);
                    }
                    .border-t {
                        border-top: 1px solid var(--border);
                    }
                    .tc {
                        text-align: center;
                    }
                    .pt-16px {
                        padding-top: 16px;
                    }
                    .text-gray-300 {
                        color: var(--gray-300);
                    }
                `}</style>
            </>
        );
    }
    return <></>;
}

export default Sidebar;
