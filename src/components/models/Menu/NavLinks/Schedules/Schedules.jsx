import React,{useState} from "react";
import cssStyles from "./Schedules.module.scss";

const Schedules = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [draggedDay, setDraggedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState("12:00");

    const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
    const startDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    let dayArray = Array(startDayOfMonth).fill(null).concat([...Array(daysInMonth).keys()].map(e => e + 1));
    while(dayArray.length % 7 !== 0){
        dayArray.push(null);
    }
    
    const handleEventChange = (day,event) => {
        setEvents(prev => ({
            ...prev,
            [day]: event.target.value
        }))
    }
    const handleTimeChange = (day, event) => {
        //... existing logic ...

        const dateTime = `${selectedDay} ${selectedTime}`;
        setEvents(prev => ({
            ...prev,
            [dateTime]: event.target.value,
        }));
    };
    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            let newDate = new Date(prev);
            direction === "prev" ? newDate.setMonth(prev.getMonth() - 1) : newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };
    const selectDay = (day) => {
        setSelectedDay(day);
    };

    const onDragStart = (e, day) => {
        e.dataTransfer.setData("text/plain", day);
    };

    const onDrop = (e, targetDay) => {
        const sourceDay = e.dataTransfer.getData("text/plain");
        // Logic to swap or move events from sourceDay to targetDay
        // For instance:
        const sourceEvent = events[sourceDay];
        setEvents(prev => ({
            ...prev,
            [targetDay]: sourceEvent,
            [sourceDay]: "" // clear the sourceDay event
        }));
    };

    const onDragOver = (e) => {
        e.preventDefault(); // This is important to allow dropping
    };
    return(
            <div className={cssStyles.calendar}>
            
                

                {days.map(day => (
                    <div key={day} className="cell header">{day}</div>
                ))}
                {dayArray.map((day, index) => (
                    <div
                        key={index}
                        className={cssStyles.cell}
                        draggable={day}
                        onDragStart={day ? (e) => onDragStart(e, day) : null}
                        onDrop={day ? (e) => onDrop(e, day) : null}
                        onDragOver={onDragOver}
                    >
                        {day && <div>{day}</div>}
                        {day &&
                            <input
                                type="text"
                                placeholder="Add event..."
                                value={events[day] || ''}
                                onChange={(e) => handleEventChange(day, e)}
                            />
                        }
                    </div>
                ))}

                {!selectedDay && (
                    <div className={cssStyles.daydetails}>
                        <h2>Details for {selectedDay}</h2>

                        <label>Time:</label>
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        />

                        <label>Event:</label>
                        <textarea
                            value={events[`${selectedDay} ${selectedTime}`] || ''}
                            onChange={(e) => handleTimeChange(selectedDay, e)}
                        ></textarea>
                    </div>
                )}
                <button onClick={() => navigateMonth("prev")}>Prev</button>
                <span>{currentMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => navigateMonth("next")}>Next</button>
            </div>
    )
}

export default Schedules