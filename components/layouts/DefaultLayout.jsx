import React from 'react';
import Head from './modules/Head';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import DrawerMenu from '~/components/shared/drawers/DrawerMenu';

const DefaultLayout = ({ children, pathName }) => {
    return (
        <div id="martfury">
            <Head />
            <HeaderMobile />
            {children}
            <DrawerMenu pathName={pathName} />
            <div id="loader-wrapper">
                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
            </div>
        </div>
    );
};

export default DefaultLayout;
