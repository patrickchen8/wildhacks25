import logo from '../assets/logo.svg';
import { useNavigate, useLocation } from "react-router-dom";

const DashboardIcon = ({ className }) => (
    <svg 
        width="36" 
        height="36" 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M13.5 4.5L6 4.5C5.17157 4.5 4.5 5.17157 4.5 6L4.5 16.5C4.5 17.3284 5.17157 18 6 18L13.5 18C14.3284 18 15 17.3284 15 16.5L15 6C15 5.17157 14.3284 4.5 13.5 4.5Z" stroke="currentColor" strokeOpacity="1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 4.5L22.5 4.5C21.6716 4.5 21 5.17157 21 6L21 10.5C21 11.3284 21.6716 12 22.5 12L30 12C30.8284 12 31.5 11.3284 31.5 10.5L31.5 6C31.5 5.17157 30.8284 4.5 30 4.5Z" stroke="currentColor" strokeOpacity="1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 18L22.5 18C21.6716 18 21 18.6716 21 19.5L21 30C21 30.8284 21.6716 31.5 22.5 31.5L30 31.5C30.8284 31.5 31.5 30.8284 31.5 30L31.5 19.5C31.5 18.6716 30.8284 18 30 18Z" stroke="currentColor" strokeOpacity="1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5 24.3L6 24.3C5.17157 24.3 4.5 24.9716 4.5 25.8L4.5 30.3C4.5 31.1285 5.17157 31.8 6 31.8L13.5 31.8C14.3284 31.8 15 31.1285 15 30.3L15 25.8C15 24.9716 14.3284 24.3 13.5 24.3Z" stroke="currentColor" strokeOpacity="1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AssistantIcon = ({ className }) => (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M26.1857 16.5769C26.1857 17.7863 25.7669 18.8262 24.9293 19.6969C24.0917 20.5675 23.076 21.0465 21.8821 21.1338C21.6706 22.5218 21.0359 23.6769 19.978 24.599C18.9198 25.5211 17.6794 25.9822 16.2566 25.9822C15.7597 25.9822 15.2687 25.9176 14.7836 25.7884C14.2986 25.6594 13.8432 25.4659 13.4175 25.2077C12.9728 25.5143 12.492 25.7443 11.9749 25.8978C11.4575 26.0512 10.9144 26.1279 10.3456 26.1279C8.89303 26.1279 7.63691 25.6498 6.57724 24.6936C5.51758 23.7377 4.90131 22.554 4.72844 21.1425C4.68958 21.1524 4.65072 21.1573 4.61185 21.1573L4.48088 21.1573C3.26172 21.1106 2.23095 20.6442 1.38857 19.7582C0.546191 18.8719 0.125 17.8115 0.125 16.5769C0.125 15.8819 0.260894 15.2626 0.532687 14.7191C0.804228 14.1755 1.18857 13.6591 1.68573 13.1701C1.18857 12.6868 0.804228 12.1743 0.532687 11.6324C0.260894 11.0909 0.124999 10.4678 0.124999 9.7632C0.124999 8.54227 0.544676 7.49157 1.38403 6.61108C2.22363 5.73084 3.24822 5.26738 4.45779 5.2207L4.58876 5.2207C4.62763 5.2207 4.66649 5.22562 4.70535 5.23546C4.87797 3.824 5.49575 2.63399 6.55869 1.66543C7.62138 0.696617 8.8837 0.212211 10.3456 0.212211C10.9144 0.212211 11.4575 0.291326 11.9749 0.449558C12.492 0.607788 12.9728 0.840339 13.4175 1.14721C13.8427 0.889045 14.2979 0.692956 14.7829 0.558954C15.2682 0.424949 15.7594 0.357948 16.2566 0.357948C17.7046 0.357948 18.9538 0.822925 20.0041 1.75288C21.0542 2.68257 21.6802 3.84634 21.8821 5.24416C23.076 5.33148 24.0917 5.80415 24.9293 6.66218C25.7669 7.52021 26.1857 8.55388 26.1857 9.7632C26.1857 10.462 26.0537 11.0837 25.7897 11.6283C25.5258 12.1729 25.1404 12.6868 24.6337 13.1701C25.1404 13.669 25.5258 14.1892 25.7897 14.7308C26.0537 15.2724 26.1857 15.8877 26.1857 16.5769ZM4.6675 12.0344L21.6436 12.0344C22.2795 12.0344 22.8171 11.8143 23.2562 11.3739C23.6953 10.9335 23.9148 10.3946 23.9148 9.75714C23.9148 9.1497 23.6886 8.62908 23.2361 8.19528C22.7839 7.76121 22.2568 7.52677 21.6549 7.49194C21.5212 8.12865 21.279 8.7164 20.9285 9.25519C20.5782 9.79373 20.1293 10.2591 19.5817 10.6513C19.3159 10.8453 19.0329 10.9185 18.7326 10.8708C18.4323 10.8231 18.1884 10.6655 18.0009 10.398C17.8066 10.132 17.7334 9.8471 17.7813 9.54326C17.829 9.23917 17.9866 8.99223 18.2541 8.80246C18.7096 8.48928 19.0584 8.09067 19.3004 7.60664C19.5424 7.12261 19.6634 6.59909 19.6634 6.03607C19.6634 5.08669 19.333 4.28153 18.672 3.6206C18.0108 2.95966 17.2057 2.6292 16.2566 2.6292C16.0655 2.6292 15.8746 2.64762 15.6838 2.68447C15.493 2.72131 15.3054 2.77961 15.1209 2.85935C15.4122 3.28837 15.6354 3.76154 15.7906 4.27888C15.9458 4.79622 16.0234 5.33337 16.0234 5.89033C16.0234 6.21209 15.9146 6.48187 15.6971 6.69966C15.4793 6.91719 15.2094 7.02596 14.8874 7.02596C14.5656 7.02596 14.296 6.91719 14.0784 6.69966C13.8611 6.48187 13.7525 6.21209 13.7525 5.89033C13.7525 4.94121 13.4219 4.13605 12.7607 3.47486C12.0998 2.81393 11.2948 2.48346 10.3456 2.48346C9.41138 2.48346 8.61872 2.80913 7.96763 3.46048C7.31653 4.11182 6.97345 4.90234 6.93837 5.83204C7.40246 6.09046 7.80725 6.43077 8.15273 6.85297C8.49821 7.27517 8.7719 7.74633 8.97379 8.26644C9.08634 8.56347 9.077 8.85343 8.94578 9.13633C8.81455 9.41923 8.59878 9.60774 8.29847 9.70187C8.00144 9.79903 7.70971 9.78742 7.42328 9.66705C7.1371 9.54667 6.94544 9.33317 6.84828 9.02655C6.69308 8.57028 6.41737 8.20045 6.02117 7.91705C5.62521 7.63365 5.17146 7.49195 4.65993 7.49195C4.02802 7.49195 3.49276 7.71163 3.05415 8.15099C2.6153 8.59009 2.39587 9.12775 2.39587 9.76395C2.39587 10.4002 2.61543 10.9377 3.05453 11.3765C3.49364 11.8151 4.0313 12.0344 4.6675 12.0344ZM21.6436 14.3057L4.6675 14.3057C4.0313 14.3057 3.49364 14.5254 3.05453 14.9647C2.61543 15.4038 2.39587 15.9415 2.39587 16.5777C2.39587 17.2139 2.61543 17.7514 3.05453 18.1903C3.49364 18.6289 4.0313 18.8482 4.6675 18.8482C5.15859 18.8482 5.60603 18.7104 6.00981 18.4348C6.41359 18.159 6.69308 17.7931 6.84828 17.3371C6.94544 17.04 7.13471 16.8226 7.41609 16.6848C7.69747 16.547 7.98781 16.5258 8.28712 16.6212C8.58616 16.7356 8.80105 16.9358 8.93177 17.222C9.06275 17.5082 9.07196 17.8047 8.95941 18.1116C8.75752 18.6317 8.48623 19.1028 8.14554 19.525C7.80485 19.9472 7.40246 20.2875 6.93837 20.546C6.97345 21.4504 7.32146 22.2283 7.98239 22.8797C8.64332 23.531 9.43258 23.8567 10.3502 23.8567C11.2963 23.8567 12.0998 23.5262 12.7607 22.8653C13.4219 22.2041 13.7525 21.3989 13.7525 20.4498C13.7525 20.128 13.8613 19.8583 14.0788 19.6405C14.2966 19.4229 14.5665 19.3142 14.8885 19.3142C15.2103 19.3142 15.4799 19.4229 15.6974 19.6405C15.9147 19.8583 16.0234 20.128 16.0234 20.4498C16.0234 21.0068 15.9458 21.5439 15.7906 22.0613C15.6354 22.5786 15.4122 23.0518 15.1209 23.4808C15.3054 23.5605 15.493 23.6188 15.6838 23.6557C15.8746 23.6925 16.0655 23.7109 16.2566 23.7109C17.2057 23.7109 18.0108 23.3805 18.672 22.7195C19.333 22.0586 19.6634 21.2534 19.6634 20.3041C19.6634 19.7383 19.5417 19.2149 19.2981 18.7339C19.0544 18.2529 18.7063 17.8541 18.2541 17.5377C17.9866 17.3479 17.829 17.101 17.7813 16.7969C17.7334 16.493 17.804 16.2081 17.9933 15.9421C18.1826 15.6761 18.4281 15.5189 18.7299 15.4705C19.032 15.422 19.3159 15.4948 19.5817 15.6889C20.1293 16.0906 20.5821 16.5648 20.9403 17.1114C21.2984 17.6578 21.5444 18.2493 21.6784 18.886C22.2803 18.8512 22.8034 18.6105 23.2478 18.1638C23.6925 17.7174 23.9148 17.1904 23.9148 16.583C23.9148 15.9455 23.6953 15.4066 23.2562 14.9663C22.8171 14.5259 22.2795 14.3057 21.6436 14.3057Z" fill="currentColor"/>
    </svg>

);

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="w-full h-[70px] bg-gray-100 shadow-md flex items-center px-5 justify-between md:gap-52 lg:gap-52 2xl:gap-80">
            <a href="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-9" />
            </a>
                    <div className="flex flex-1 justify-center gap-x-100">

                        <button 
                            onClick={() => navigate("/")} 
                            className={`group flex items-center text-md transition ${
                                location.pathname === "/" ? "text-dark-green" : "text-gray-400 hover:text-green"
                            }`}
                        >
                            <DashboardIcon className={`w-7 h-7 ${location.pathname === "/" ? "text-dark-green" : "group-hover:text-green text-gray-400"}`} />
                            <span className="ml-3">DASHBOARD</span>
                        </button>

                        <button 
                            onClick={() => navigate("/assistant")} 
                            className={`group flex items-center text-md transition ${
                                location.pathname === "/assistant" ? "text-dark-green" : "text-gray-400 hover:text-green"
                            }`}
                        >
                            <AssistantIcon className={`w-7 h-7 ${location.pathname === "/assistant" ? "text-dark-green" : "group-hover:text-green text-gray-400"}`} />
                            <span className="ml-3">ASSISTANT</span>
                        </button>
                    </div>
                <div className="w-12"></div>
        </div>
    );
};

export default Navbar;