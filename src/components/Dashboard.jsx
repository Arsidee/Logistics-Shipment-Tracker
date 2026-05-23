import { useState } from 'react';
import { shipments as initialShipments } from '../data/shipments';
import StatusBadge from './StatusBadge';
import ShipmentDetail from './ShipmentDetail';
import AddShipmentModal from './AddShipmentModal';
import '../styles/Dashboard.css';

const ACTIVE_FILTERS = ['All', 'In Transit', 'Delayed', 'Pending'];

export default function Dashboard() {
  const [shipments, setShipments] = useState(initialShipments);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const active    = shipments.filter(s => s.status !== 'Delivered');
  const delivered = shipments.filter(s => s.status === 'Delivered');

  const filtered = activeFilter === 'All'
    ? active
    : active.filter(s => s.status === activeFilter);

  const counts = {
    All:        active.length,
    'In Transit': active.filter(s => s.status === 'In Transit').length,
    Delayed:    active.filter(s => s.status === 'Delayed').length,
    Pending:    active.filter(s => s.status === 'Pending').length,
  };

  function handleAdd(newShipment) {
    setShipments(prev => [newShipment, ...prev]);
  }

  function handleDelete(id) {
    setShipments(prev => prev.filter(s => s.id !== id));
    if (selectedShipment?.id === id) setSelectedShipment(null);
  }

  const nextId = Math.max(...shipments.map(s => parseInt(s.id.split('-')[1]))) + 1;

  return (
    <main className="dashboard">
      {/* Summary cards */}
      <div className="summary-cards">
        {ACTIVE_FILTERS.map(f => (
          <div
            key={f}
            className={`summary-card ${f === 'All' ? 'all' : f.toLowerCase().replace(' ', '-')}`}
            onClick={() => setActiveFilter(f)}
            style={{ cursor: 'pointer' }}
          >
            <div className="summary-count">{counts[f]}</div>
            <div className="summary-label">{f === 'All' ? 'Active Shipments' : f}</div>
          </div>
        ))}
        <div className="summary-card delivered">
          <div className="summary-count">{delivered.length}</div>
          <div className="summary-label">Delivered</div>
        </div>
      </div>

      {/* Active shipments */}
      <div className="section-header">
        <div className="section-header-left">
          <h2 className="section-title">Active Shipments</h2>
          <div className="filter-bar">
            {ACTIVE_FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-add-shipment" onClick={() => setShowAddModal(true)}>
          + Add Shipment
        </button>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="shipment-row" onClick={() => setSelectedShipment(s)}>
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
                  <td>
                    <button
                      className="delete-btn"
                      onClick={e => { e.stopPropagation(); handleDelete(s.id); }}
                      title="Delete shipment"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delivered section */}
      {delivered.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginTop: '2rem' }}>Delivered Packages</h2>
          <div className="shipments-table-wrapper">
            <div className="table-header">
              <span className="table-title">Completed Shipments</span>
              <span className="shipment-count">{delivered.length} record{delivered.length !== 1 ? 's' : ''}</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Route</th>
                  <th>Carrier</th>
                  <th>Delivered</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {delivered.map(s => (
                  <tr key={s.id} className="shipment-row" onClick={() => setSelectedShipment(s)}>
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
                    <td>
                      <button
                        className="delete-btn"
                        onClick={e => { e.stopPropagation(); handleDelete(s.id); }}
                        title="Delete shipment"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ShipmentDetail
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onDelete={handleDelete}
      />

      {showAddModal && (
        <AddShipmentModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
          nextId={nextId}
        />
      )}
    </main>
  );
}
