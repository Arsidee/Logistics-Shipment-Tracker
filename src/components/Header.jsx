import '../styles/Header.css';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-icon">🚚</span>
        <div>
          <div className="header-title">ShipTrack</div>
          <div className="header-subtitle">Logistics Shipment Tracker</div>
        </div>
      </div>
      <div className="header-meta">{today}</div>
    </header>
  );
}
