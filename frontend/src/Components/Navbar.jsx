import React from "react";
import '../UI/Navbar.css';

const Navbar = ({historyMessages, onDateSelect, isOpen, toggleSideNav, goToHero }) => {

    const handleDateClick = (date) => {
        onDateSelect(date, historyMessages[date]);
        toggleSideNav(historyMessages[date]);
    };

    return (
        <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
            <div className="button-container">
                <button className="hero-btn inside" onClick={goToHero}>
                    Back to Home
                </button>
            </div>

            {isOpen && (
                <>
                    <h3 className="history-text">History</h3>
                    <ul>
                        {Object.keys(historyMessages).map((date) => (
                            <li key={date} onClick={() => handleDateClick(date)}>
                                {date}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Navbar;
