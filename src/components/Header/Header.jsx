import {useState} from "react";
import { Link } from "react-router-dom";
import ProLayout, {ProSettings} from '@ant-design/pro-layout';
import {CodepenOutlined} from "@ant-design/icons";
import {Button} from "antd";
import { useUserContext } from "../../context/userContext";

export const DefaultHeader = ({ children }) => {
    const { onLogout } = useUserContext();

    const [settings] = useState({
        navTheme: 'light',
        layout: 'mix',
        contentWidth: 'Fixed',
        fixedHeader: true,
        fixSiderbar: true,
        menu: {
            locale: true,
        },
        title: 'Fitnesslife-Admin',
        iconfontUrl: '',
        colorPrimary: '#1890ff',
        footerRender: false,
        splitMenus: false,
    });

    const route = {
        path: '/',
        routes: [
            {
                path: '/',
                name: 'Packs',
                icon: <CodepenOutlined />,
            },
            {
                path: '/contacts',
                name: 'Contacts',
                icon: <CodepenOutlined />,
            },
            {
                path: '/avis',
                name: 'Avis',
                icon: <CodepenOutlined />,
            }
        ]
    }

    return <ProLayout
        logo={false}
        route={route}
        fixSiderbar
        menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
        rightContentRender={() => <Button type={"primary"} danger onClick={onLogout}>Logout</Button>}
        {...settings}
    >
        {children}
    </ProLayout>

}
