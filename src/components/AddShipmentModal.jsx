import { useState } from 'react';
import '../styles/AddShipmentModal.css';

const empty = {
  origin: '',
  destination: '',
  carrier: '',
  weight: '',
  estimatedDelivery: '',
};

export default function AddShipmentModal({ onAdd, onClose, nextId }) {
  const [form, setForm] = useState(empty);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const today = new Date();
    const timestamp = `${today.toISOString().slice(0, 10)} ${today.toTimeString().slice(0, 5)}`;

    onAdd({
      id: `SHP-${nextId}`,
      origin: form.origin,
      destination: form.destination,
      carrier: form.carrier,
      weight: form.weight,
      estimatedDelivery: form.estimatedDelivery,
      status: 'Pending',
      trackingEvents: [
        { date: timestamp, location: form.origin, event: 'Shipment scheduled for pickup' },
      ],
    });

    onClose();
  }

  const isValid = form.origin && form.destination && form.carrier && form.weight && form.estimatedDelivery;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add New Shipment</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-field">
                <label>Origin</label>
                <input name="origin" placeholder="City, ST" value={form.origin} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label>Destination</label>
                <input name="destination" placeholder="City, ST" value={form.destination} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Carrier</label>
                <input name="carrier" placeholder="e.g. Union Pacific" value={form.carrier} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label>Weight</label>
                <input name="weight" placeholder="e.g. 500 lbs" value={form.weight} onChange={handleChange} />
              </div>
            </div>

            <div className="form-field">
              <label>Estimated Delivery</label>
              <input name="estimatedDelivery" type="date" value={form.estimatedDelivery} onChange={handleChange} />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add" disabled={!isValid}>Add Shipment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
