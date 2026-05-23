import { useState } from 'react';
import { shipments } from '../data/shipments';
import StatusBadge from './StatusBadge';
import ShipmentDetail from './ShipmentDetail';
import '../styles/Dashboard.css';

const FILTERS = ['All', 'In Transit', 'Delivered', 'Delayed', 'Pending'];

const filterCardClass = {
  All: 'all',
  'In Transit': 'transit',
  Delivered: 'delivered',
  Delayed: 'delayed',
  Pending: 'pending',
};

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedShipment, setSelectedShipment] = useState(null);

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'All'
      ? shipments.length
      : shipments.filter(s => s.status === f).length;
    return acc;
  }, {});

  const filtered = activeFilter === 'All'
    ? shipments
    : shipments.filter(s => s.status === activeFilter);

  return (
    <main className="dashboard">
      <div className="summary-cards">
        {FILTERS.map(f => (
          <div
            key={f}
            className={`summary-card ${filterCardClass[f]}`}
            onClick={() => setActiveFilter(f)}
            style={{ cursor: 'pointer' }}
          >
            <div className="summary-count">{counts[f]}</div>
            <div className="summary-label">{f === 'All' ? 'Total Shipments' : f}</div>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="shipments-table-wrapper">
        <div className="table-header">
          <span className="table-title">Shipments</span>
          <span className="shipment-count">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <div>No shipments match this filter.</div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Route</th>
                <th>Carrier</th>
                <th>Est. Delivery</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr
                  key={s.id}
                  className="shipment-row"
                  onClick={() => setSelectedShipment(s)}
                >
                  <td><span className="shipment-id">{s.id}</span></td>
                  <td>
                    <div className="route">
                      <span>{s.origin}</span>
                      <span className="route-arrow">→</span>
                      <span>{s.destination}</span>
                    </div>
                  </td>
                  <td>{s.carrier}</td>
                  <td>{s.estimatedDelivery}</td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ShipmentDetail
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
      />
    </main>
  );
}
