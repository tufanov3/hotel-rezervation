import React from 'react';
import { RezervationFormField } from './rezervation-form-field/rezervation-form-field';
import './rezervation-form.css';

export const ReservationForm = () => {
  const adultsOptions = [
    { value: '0', label: '0 взрослых' },
    { value: '1', label: '1 взрослый' },
    { value: '2', label: '2 взрослых' },
    { value: '3', label: '3 взрослых' },
  ];

  const kidsOptions = [
    { value: '0', label: '0 детей' },
    { value: '1', label: '1 ребенок' },
    { value: '2', label: '2 ребенка' },
    { value: '3', label: '3 ребенка' },
  ];

  return (
    <div className='rezervation'>
      <form className="reservation-form">
        <RezervationFormField className='date' label="Дата заезда" id="checkin-date" name="checkin-date" />
        <RezervationFormField className='date' label="Дата выезда" id="checkout-date" name="checkout-date" />
        <RezervationFormField label="Взрослые" id="adults" name="adults" options={adultsOptions} />
        <RezervationFormField label="Дети" id="kids" name="kids" options={kidsOptions} />
        <div className='btn-wrap_booking'>
        <button className='btn-booking' type="submit">Поиск</button>
        </div>
      </form>
    </div>
  );
};
