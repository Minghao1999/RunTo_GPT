import React from "react";
import '../UI/Navbar.css';

const Navbar = ({ historyMessages, onDateSelect, isOpen, toggleSideNav }) => {
    const handleDateClick = (date) => {
        onDateSelect(date, historyMessages[date]);
    };

    return (
        <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn inside" onClick={toggleSideNav}>
                close
            </button>
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
