import React from 'react';
import _ from 'lodash';
import version from '@/cores/configs/version';

const menu = [
    { name: 'Danh sách nhân viên', icon: 'folder_shared', url: '/home' },
    { name: 'KPI', icon: 'bar_chart' },
    { name: 'SLA', icon: 'commit' },
    { name: 'Cẩm nang bán hàng', icon: 'menu_book', url: '/ehandbook' },
    { name: 'Phê duyệt tập trung', icon: 'spellcheck', url: '/approval' },
];

function Sidebar({ open, closeAside }) {
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
                <aside className='fixed top-0 left-0 w-300px h-100 bg-white p-16px d-flex flex-col z-index-1000'>
                    <div className='d-flex items-end justify-between mt-16px mb-24px'>
                        <div style={{ height: 23 }}>
                            <img className='d-block' src={`${process.env.NEXT_PUBLIC_BASE_URL}/img/HDBank-logo.svg`} alt='' width='87px' height='32px' />
                        </div>
                        <i className='material-icons-outlined text-gray-400 pointer' onClick={() => closeAside?.()}>
                            close
                        </i>
                    </div>
                    {menu?.map?.((item, index) => {
                        return (
                            <a
                                href={process.env.NEXT_PUBLIC_BASE_PATH + (item?.url || '')}
                                className={`d-flex items-center my-4px py-4px px-12px rounded-4px pointer border border-transparent hover-border-red text-decoration-none text-gray-500 ${
                                    item?.url === '/approval' && 'bg-red-100 text-red fw-600'
                                }`}
                                key={index}>
                                <div className='flex-1 d-flex items-center'>
                                    <i className='material-icons-outlined mr-8px'>{item?.icon}</i>
                                    {item?.name}
                                </div>
                                {item?.url === '/ehandbook' && (
                                    <div className='w-16px h-16px rounded-4px d-flex items-center justify-center bg-gray-100'>
                                        <i className='material-icons fs-16px'>chevron_right</i>
                                    </div>
                                )}
                            </a>
                        );
                    })}
                    <div className='mt-auto'></div>
                    <a
                        href={`${process.env.NEXT_PUBLIC_BASE_PATH}/login`}
                        className='d-flex items-center py-8px px-12px text-gray-500 pointer'
                        style={{ textDecoration: 'none' }}
                        onClick={handleLogout}>
                        <i className='material-icons-outlined text-gray-400 mr-8px'>logout</i>Đăng xuất
                    </a>

                    <div className='border-t-gray-100 border-t tc pt-16px text-gray-300'>
                        HDBank @{new Date().getFullYear()} {version}
                    </div>
                </aside>
            </>
        );
    }
    return <></>;
}

export default Sidebar;
