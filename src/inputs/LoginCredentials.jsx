export function LoginCredentials({ adults, setAdults, currency, setCurrency }){
  return(
    <>
      <div style={{ padding: '10px 0' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Number of Adults:
        </label>
        <input 
          className="placeholder-box" 
          type="number" 
          placeholder="Number of adults" 
          value={adults}
          min="1"
          max="9"
          onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
        />
      </div>
      <div style={{ padding: '10px 0' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Currency:
        </label>
        <select 
          className="placeholder-box" 
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="NPR">NPR - Nepalese Rupee</option>
        </select>
      </div>
    </>
  )
}