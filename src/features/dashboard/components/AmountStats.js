

function AmountStats({}){
    return(
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">Total Earned</div>
                <div className="stat-value">Ksh.25,600</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Transactions</button> 
                </div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Pending payments</div>
                <div className="stat-value">Ksh.5,600</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View delivery yet to be paid</button> 
                </div>
            </div>
        </div>
    )
}

export default AmountStats