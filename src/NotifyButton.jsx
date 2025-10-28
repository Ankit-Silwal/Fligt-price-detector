import './NotifyButton.css'

export function NotifyButton({ onSearch, loading }){
  return(
    <div className="button-container">
        <button 
          className="notify-btn" 
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </div>
  )
}