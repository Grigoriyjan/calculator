import React,{ useState } from 'react';
import './header.css'
const Header = ({theme, toggleTheme}) =>{
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(theme === "dark" ? 4 : theme === "light" ? 23 : 50);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (event) => {
        if (!isDragging) return;

        const switcher = event.currentTarget.getBoundingClientRect();
        let newX = event.clientX - switcher.left;
        newX = Math.max(0, Math.min(newX, switcher.width - 17));
        setPosition(newX);
        if (newX < switcher.width / 3) {
            setPosition(4)
            toggleTheme("dark");
        } else if (newX < (2 * switcher.width) / 3) {
            setPosition(25)
            toggleTheme("light");
        } else {
            setPosition(50)
            toggleTheme("purple");
        }
    };
    return (
        <header className={`header text__theme-${theme}`}>
            <h2 className="header__title">calc</h2>
            <div className="header__theme-switch">
                <p className="header__text">THEME</p>
                <div className="header__switch-nums">
                    <div className="header__num">1</div>
                    <div className="header__num">2</div>
                    <div className="header__num">3</div>
                </div>
                <div 
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    className={`header__btn primary__background-theme-${theme}`}>
                    <div 
                        style={{
                            left: position
                        }}
                        onMouseDown={handleMouseDown} 
                        className={`header__circle btn__background-theme-${theme}`}>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;