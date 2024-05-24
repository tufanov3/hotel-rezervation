import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './rezervation-form-field.css';
import { useState } from 'react';

export const RezervationFormField = ({ label, id, name, options }) => {
    const[selectedDate, setSelectedDate] = useState(null)
    return (
        <div className="form-field">
            <div className='label-wrap'>
                <label className='label-field' id='label' htmlFor={id}>{label}</label>
            </div>
            {options ? (
                <select className='fields' id={id} name={name}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <DatePicker
                    wrapperClassName='date-picker'
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy" 
                    placeholderText={new Date().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })}
                    minDate={new Date()} 
                    isClearable
                    showYearDropdown
                    scrollableMonthYearDropdown
                />
            )}
        </div>
    )
}
