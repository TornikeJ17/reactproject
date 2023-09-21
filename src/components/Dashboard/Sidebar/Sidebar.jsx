import React from "react";
import cssStyles from "./Sidebar.module.scss";
import Divider from "../../models/Widgets/Divider/Divider";
import Menu from "../../models/Menu/Menu";

const Sidebar = () => {
    return (
        <div className={cssStyles.Sidebar}>
            <div className={cssStyles.SidebarIcon}>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                    >
                        <rect width="44" height="44" rx="10" fill="#4318FF" />
                        <path
                            d="M22.0004 7.69995C16.2804 7.69995 11.143 11.0896 8.86562 16.3329C8.7597 16.5977 8.86562 16.9155 9.13044 17.0214C9.39525 17.1274 9.71303 17.0214 9.81896 16.7566C10.9841 14.1085 12.9438 11.937 15.3271 10.56C14.5856 11.3014 13.9501 12.2018 13.4734 13.1551C13.2615 13.5788 13.3145 14.1085 13.6323 14.4262C14.109 14.9559 15.0093 14.6911 15.2741 14.4262C15.486 14.2144 15.433 13.9496 15.2741 13.6848C15.0093 13.2611 14.4267 13.6848 14.4267 13.6848C14.4267 13.6848 15.3801 10.8777 19.0345 9.07699C19.6701 8.9181 20.2527 8.86514 20.8882 8.81217C20.3586 9.3418 19.776 9.81847 19.0875 10.2422C19.0875 10.2422 16.6512 11.7251 16.2804 12.0429C16.0686 12.2548 16.0686 12.5196 16.2275 12.7844C16.4923 13.1551 16.863 12.9433 16.969 12.8374C17.3397 12.5725 19.6701 11.1425 19.6701 11.1425C21.0471 10.56 22.4771 8.81217 22.4771 8.81217C24.8604 8.9181 27.0849 9.60662 28.9915 10.8248L27.6675 12.1488C26.873 12.9433 26.1845 13.4729 25.496 13.8437C23.7482 14.85 22.3712 16.3329 21.4708 18.1337C21.259 18.5574 21.3119 19.087 21.6297 19.4048C22.1593 19.8814 23.0067 19.6696 23.2716 19.4048L24.1719 18.5044C24.3838 18.2925 24.3838 17.9748 24.1719 17.7629C23.9601 17.5511 23.6423 17.5511 23.4304 17.7629L22.4241 18.6633C22.4241 18.6633 23.2715 16.227 26.0256 14.744C26.8201 14.3203 27.5615 13.6848 28.409 12.8374L29.8919 11.3544C30.1567 11.5662 30.4215 11.7781 30.6864 11.99L29.0445 13.6318C28.409 14.2144 27.8264 14.744 27.1378 15.1677L25.6019 16.0681C25.3371 16.227 25.2312 16.5448 25.3901 16.8096C25.6019 17.1803 26.0256 17.0744 26.1315 17.0214L27.6675 16.1211C28.4619 15.6444 29.1504 15.0618 29.786 14.4262L31.4808 12.7314C31.8515 13.1022 32.1693 13.4729 32.4871 13.8437L27.8264 18.5044C26.6612 19.6696 25.7608 20.9937 25.1782 22.4237C24.5427 23.9066 23.6953 25.3366 22.583 26.6607C22.3712 26.8725 22.4241 27.1903 22.636 27.4022C22.9008 27.667 23.2715 27.4551 23.3775 27.3492C24.5427 25.9722 25.443 24.4362 26.1315 22.8474C26.6612 21.5233 27.4556 20.3581 28.5678 19.2459L33.1227 14.6911C33.7582 15.6444 34.2349 16.6507 34.6056 17.71L32.2223 20.1462C31.216 20.9407 30.3156 22.8474 30.3156 22.8474C29.6271 24.0125 28.6208 25.0188 27.4556 25.7074C26.1845 26.5018 24.9664 27.4022 23.9601 28.4085L22.4771 29.8914C22.2653 30.1033 21.9475 30.1033 21.7356 29.8914C21.6297 29.7855 21.4708 29.4677 21.7356 29.15C21.9475 28.9381 21.9475 28.6203 21.7356 28.4085C21.5238 28.1966 21.153 28.1966 20.9941 28.4085C20.0938 29.4677 20.6764 30.3151 20.9941 30.6329C21.8415 31.4803 22.9008 30.9507 23.2186 30.6329L24.7015 29.15C25.6549 28.1966 26.7671 27.2962 27.9853 26.5548C29.3093 25.7603 30.3686 24.6481 31.163 23.377C31.163 23.377 32.0104 21.6292 32.9638 20.8877L34.9234 18.8751C35.1353 19.8814 35.2412 20.9407 35.2412 22C35.2412 28.3025 30.7923 33.5988 24.9134 34.9229C25.1782 34.7111 25.443 34.5522 25.7078 34.3933C25.9727 34.2344 26.0256 33.9166 25.8667 33.6518C25.7078 33.387 25.3901 33.334 25.1253 33.4929C24.119 34.0225 22.9008 35.2407 22.9008 35.2407C22.583 35.2407 21.6297 35.2937 21.4708 35.2407L22.2123 34.4992C22.9008 33.8107 23.4834 33.387 24.119 33.0162L25.6549 32.1159C26.5023 31.6392 27.1908 31.0566 27.7734 30.4211C27.7734 30.4211 28.7267 29.4677 28.7797 29.5207C28.7797 29.5207 27.7734 31.2685 27.1378 31.957C26.926 32.1688 26.926 32.4866 27.1378 32.6985C27.3497 32.9103 27.6675 32.9103 27.8793 32.6985C28.6208 31.904 29.2564 31.0566 29.733 30.0503C29.9449 29.6266 29.839 29.097 29.5741 28.7792C28.9915 28.3025 28.1971 28.5144 27.9323 28.7792L27.0319 29.6796C26.5023 30.2622 25.8667 30.7388 25.1253 31.1625L23.5893 32.0629C22.8478 32.4866 22.2123 33.0162 21.4708 33.7577L20.0938 35.0818C17.7104 34.764 15.539 33.7577 13.7382 32.3277L15.2741 30.7918C16.0686 29.9974 16.7571 29.4677 17.4456 29.097C19.1934 28.0907 20.5704 26.6077 21.4708 24.807C21.6827 24.3833 21.6827 23.8537 21.259 23.4829C21.0471 23.2711 20.1467 23.0062 19.6701 23.4829L18.7697 24.3833C18.2401 24.9659 17.6045 25.4425 16.863 25.8662L15.3271 26.7666C14.4797 27.2433 13.7912 27.8259 13.2086 28.4614L11.5667 30.1033C11.3019 29.7325 11.0371 29.4148 10.8253 29.044L15.3801 24.4892C16.5982 23.2181 17.4456 21.894 18.0282 20.517C18.8227 18.5574 20.0408 16.7566 21.6297 15.1677L22.2123 14.5851C22.5301 14.2674 22.9538 13.1022 22.2123 12.3607C21.5767 11.7251 20.6234 11.7251 19.9878 12.3607L18.5049 13.8437C17.5515 14.797 16.4393 15.6974 15.2212 16.4388C13.8441 17.2862 12.7849 18.3455 12.0434 19.6166C12.0434 19.6166 11.0901 21.6292 10.2956 22.1059L8.97155 23.43C8.81266 23.0062 8.7597 22.5296 8.7597 22C8.7597 21.6822 8.54785 21.4703 8.23007 21.4703C7.91229 21.4703 7.70044 21.6822 7.70044 22C7.70044 29.8914 14.109 36.2999 22.0004 36.2999C29.8919 36.2999 36.3004 29.8914 36.3004 22C36.3004 14.1085 29.8919 7.69995 22.0004 7.69995ZM9.07748 24.807L10.9312 22.9533C12.0434 22.0529 12.8908 20.2522 12.8908 20.2522C13.5793 19.087 14.5327 18.1337 15.7508 17.3922C17.0219 16.5977 18.2401 15.6974 19.2464 14.6911L20.7293 13.2081C20.9412 12.9962 21.206 12.9962 21.4708 13.2081C21.7886 13.4729 21.5767 13.8437 21.4708 13.9496L20.8882 14.5322C19.1934 16.227 17.9223 18.1337 17.0749 20.1992C16.5453 21.4703 15.7508 22.6885 14.6386 23.8537L10.2956 28.1966C9.71303 27.0844 9.28933 25.9722 9.07748 24.807ZM12.2553 30.9507L13.9501 29.2559C14.4797 28.6733 15.1153 28.1966 15.8567 27.7729L17.3927 26.8725C18.2401 26.3959 18.9286 25.8133 19.5112 25.1777C19.5112 25.1777 20.4645 24.2774 20.5175 24.2774C20.5175 24.2774 18.4519 27.3492 16.916 28.1966C16.1215 28.6203 15.3801 29.2559 14.5327 30.1033L12.9438 31.6922C12.7319 31.4274 12.4671 31.2155 12.2553 30.9507Z"
                            fill="white"
                        />
                        <path
                            d="M7.8612 18.6612C7.81016 18.8258 7.75911 19.0232 7.70807 19.2207C7.65703 19.3853 7.8612 19.5827 8.11642 19.6156C8.16747 19.6156 8.62686 19.6485 8.72895 19.3523C8.77999 19.1878 8.83104 19.0232 8.88208 18.8587C8.93313 18.6942 8.77999 18.4967 8.52477 18.4638C8.21851 18.3651 7.91225 18.4638 7.8612 18.6612Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div className={cssStyles.SidebarBlock}>
                    <div className={cssStyles.SidebarTitle}>VENUS</div>
                    <div className={cssStyles.SidebarBelowTitle}>DASHBOARD</div>
                </div>
            </div>
            <Divider width={"100%"} height={"1px"} color={"#F4F7FE"} />
            <Menu />
            <div className={cssStyles.SidebarEnd}>s</div>
        </div>
    );
};

export default Sidebar;
