import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';

function Profile() {
    return (
        <main className={`page-container page-container-profile ${styles.main_profile}`}>
            <div className={`page-container-profile-wrapper ${styles.wrap_profile}`}>
            <nav className={`page-container-profile-sidebar ml-5 mr-15 ${styles.navBar}`}>
                <ul className={styles.list_menu}>
                    <li className={styles.li_profile}>
                        <NavLink to="" end>{({ isActive }) => (
                            <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Профиль</span>
                        )}</NavLink>
                    </li>
                    <li className={styles.li_profile}>
                        <NavLink to={"orders"}>{({ isActive }) => (
                            <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>История заказов</span>
                        )}</NavLink>
                    </li>
                    <li>
                        <NavLink to={"logout"}>{({ isActive }) => (
                            <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Выход</span>
                        )}</NavLink>
                    </li>
                </ul>
                <p className="text text_type_main-default text_color_dark mt-20">В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            
            <Outlet />
            </div>
        </main>
    );
}

export default Profile;